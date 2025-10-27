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

  static async create(input) {
    const newPost = new Post(input);

    await newPost.save();
    return newPost;
  }

  static async update({ id, input }) {
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { $set: input },
      { new: true }
    );
    if (!updatedPost) throw new Error("Post not found");

    return updatedPost;
  }
}
