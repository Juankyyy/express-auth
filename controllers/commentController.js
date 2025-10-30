import { Comment } from "../schemas/commentSchema.js";

export class CommentController {
  static async getAll() {
    const comments = await Comment.find();

    if (comments.length === 0) throw new Error("Comments not found");

    return comments;
  }

  static async getById(id) {
    const comment = await Comment.findById(id);

    if (comment.length === 0) throw new Error("Comments not found");

    return comment;
  }
}