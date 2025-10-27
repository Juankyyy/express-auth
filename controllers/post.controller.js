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

  static async toggleLike({ id, userId }) {
    const post = await Post.findById(id);

    if (!post) throw new Error("Post not found");

    const hasLiked = post.likes.includes(userId);

    const postToggledLike = await Post.findByIdAndUpdate(
      id,
      hasLiked
        ? { $pull: { likes: userId } } // quitar like
        : { $addToSet: { likes: userId } }, // dar like
      { new: true }
    );

    return {
      post: postToggledLike,
      action: hasLiked ? "Le quitaste el like" : "Le diste like",
    };
  }

  static async toggleRepost({ id, userId }) {
    const post = await Post.findById(id);

    if (!post) throw new Error("Post not found");

    const hasReposted = post.repost.includes(userId);

    const postToggledRepost = await Post.findByIdAndUpdate(
      id,
      hasReposted
        ? { $pull: { repost: userId } }
        : { $addToSet: { repost: userId } },
      { new: true }
    );

    return {
      post: postToggledRepost,
      action: hasReposted ? "Repost quitado" : "Reposteado",
    };
  }
}
