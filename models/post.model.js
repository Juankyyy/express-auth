import { PostController } from "../controllers/post.controller.js";
import { validatePost } from "../validations/post.js";

export class PostModel {
  static async getAll(req, res) {
    try {
      const posts = await PostController.getAll();

      if (posts.length === 0)
        return res.status(404).json({ message: "No posts found" });

      return res.status(200).json(posts);
    } catch (err) {
      console.error("Error al buscar posts:", err);
    }
  }
}
