import { Router } from "express";
import { UserModel } from "../models/user.js";
import { verifyLogin } from "../middlewares/auth.middleware.js";

export const UsersRouter = Router();

UsersRouter.get("/", UserModel.getAll);

UsersRouter.post("/", UserModel.create);

UsersRouter.post("/login", verifyLogin, UserModel.login);

UsersRouter.post("/logout", UserModel.logout);

UsersRouter.get("/:id", UserModel.getById);

UsersRouter.patch("/:id", UserModel.update);

UsersRouter.patch("/find/:id", UserModel.updateAndFind);
