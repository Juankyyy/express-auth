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

    await newUser.save();

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

  static async update({ id, input }) {
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");

    const updatedUser = await User.updateOne(
      { _id: user._id },
      { $set: input }
    );

    return updatedUser;
  }

  static async updateAndFind({ id, input }) {
    const user = await User.findByIdAndUpdate(
      id,
      { $set: input }, // Para que sea PATCH
      { new: true }
      // {overwrite: true} Para que sea PUT
    );
    if (!user) throw new Error("User not found");

    return user;
  }
}
