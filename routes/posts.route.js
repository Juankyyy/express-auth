import { Router } from "express";
import { PostModel } from "../models/post.model.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const PostsRouter = Router();

PostsRouter.get("/", PostModel.getAll);

PostsRouter.get("/:id", PostModel.getById);

PostsRouter.post("/", verifyToken, PostModel.create);