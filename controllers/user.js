import { User } from "../schemas/user.js";
import bcrypt from "bcrypt";

export class UserController {
  static async getAll() {
    const users = await User.find();

    return users;
  }

  static async getById({ id }) {
    const user = await User.findById(id);

    if (!user) throw new Error("User not found");

    return user;
  }

  static async create({ username, password }) {
    const user = await User.findOne({ username });

    if (user) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    return newUser;
  }

  static async login({ username, password }) {
    const user = await User.findOne({ username });

    if (!user) throw new Error("User not found");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) throw new Error("Invalid password");

    return {
      _id: user._id,
      username: user.username,
    };
  }
}
