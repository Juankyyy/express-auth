import { Router } from "express";
import { PostModel } from "../models/post.model.js";

export const PostsRouter = Router();

PostsRouter.get("/", PostModel.getAll);