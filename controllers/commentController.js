import { Comment } from "../schemas/commentSchema.js";
import { Post } from "../schemas/post.js";

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

  static async create(input) {
    const newComment = new Comment(input);
    await newComment.save();

    await Post.findByIdAndUpdate(input.postId, {
      $push: { comments: newComment._id },
    });

    return newComment;
  }
}
