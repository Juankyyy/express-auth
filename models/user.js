import { UserController } from "../controllers/user.js";
import { validateUser } from "../validations/user.js";

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

  static async create(req, res) {
    try {
      const { username, password } = req.body;

      const validation = validateUser({ username, password });

      if (!validation.success) {
        return res.status(400).json({ message: JSON.parse(validation.error.message) });
      }

      const user = await UserController.create({ username, password });

      if (!user) {
        return res.status(409).json({ message: "User already exists" });
      }

      res.status(201).json({ message: "Usuario creado", user: user });
    } catch (err) {
      console.error("Error al crear usuario:", err);
    }
  }

  static async login (req, res) {
    try {
      const { username, password } = req.body;

      const validation = validateUser({ username, password });

      if (!validation.success) {
        return res.status(400).json({ message: JSON.parse(validation.error.message) });
      }

      const user = await UserController.login({ username, password });

      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      res.status(200).json({ message: "Usuario logueado", user: user });

    } catch (err) {
      console.error("Error al loguear usuario:", err);
    }
  }
}
