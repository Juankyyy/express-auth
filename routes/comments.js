import { Router } from "express";
import { CommentModel } from "../models/Comment.js";
import { verifyToken } from "../middlewares/auth.middleware.js";

export const CommentsRouter = Router();

CommentsRouter.get("/", CommentModel.getAll);

CommentsRouter.get("/:id", CommentModel.getById);

CommentsRouter.post("/", verifyToken, CommentModel.create);
