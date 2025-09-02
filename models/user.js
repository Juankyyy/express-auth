import { UserController } from "../controllers/user.js";
import { validateUser } from "../validations/user.js";
import jwt from "jsonwebtoken";

export class UserModel {
  static async getAll(req, res) {
    try {
      const users = await UserController.getAll();

      if (users.length === 0)
        return res.status(404).json({ message: "No users found" });

      return res.status(200).json(users);
    } catch (err) {
      console.error("Error al buscar usuarios:", err);
    }
  }

  static async getById(req, res) {
    const { id } = req.params;
    try {
      const user = await UserController.getById({ id });

      return res.status(200).json(user);
    } catch (err) {
      console.error("Error al buscar usuario:", err);
    }
  }

  static async create(req, res) {
    try {
      const { username, password } = req.body;

      const validation = validateUser({ username, password });

      if (!validation.success) {
        return res
          .status(400)
          .json({ message: JSON.parse(validation.error.message) });
      }

      const user = await UserController.create({ username, password });

      res.status(201).json({ message: "Usuario creado", user: user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  }

  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const validation = validateUser({ username, password });

      if (!validation.success) {
        return res
          .status(400)
          .json({ message: JSON.parse(validation.error.message) });
      }
      const user = await UserController.login({ username, password });
      const token = jwt.sign(user, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });

      res
        .status(200)
        .cookie("jwt", token, {
          httpOnly: true,
          // secure: true,
          sameSite: "strict",
        })
        .json({ message: "Usuario logueado", user: user, token: token });
    } catch (err) {
      res.status(401).json({ message: err.message });
    }
  }

  static async logout(req, res) {
    res
      .status(200)
      .clearCookie("jwt")
      .json({ message: "Usuario cerró sesión" });
  }
}
