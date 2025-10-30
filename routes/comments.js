import { Router } from "express";
import { CommentModel } from "../models/Comment.js";

export const CommentsRouter = Router();

CommentsRouter.get("/", CommentModel.getAll);

CommentsRouter.get("/:id", CommentModel.getById);