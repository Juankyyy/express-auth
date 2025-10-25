import { Post } from "../schemas/post.js";

export class PostController {
  static async getAll() {
    const posts = await Post.find();

    return posts;
  }

  static async getById({ id }) {
    const post = await Post.findById(id);

    if (!post) throw new Error("Post not found");

    return post;
  }
}
