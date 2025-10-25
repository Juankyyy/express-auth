import { Post } from "../schemas/post.js";

export class PostController {
  static async getAll() {
    const posts = await Post.find();

    return posts;
  }
}
