import { Router } from "express";
import { UserModel } from "../models/user.js";

export const UsersRouter = Router();

UsersRouter.get("/", UserModel.getAll);

UsersRouter.post("/", UserModel.create);

UsersRouter.post("/login", UserModel.login);
