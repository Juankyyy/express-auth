import { PostController } from "../controllers/post.controller.js";
import { validateCreatePost } from "../validations/post.js";

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

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const post = await PostController.getById({ id });

      return res.status(200).json(post);
    } catch (err) {
      console.error("Error al buscar post:", err);
    }
  }

  static async create(req, res) {
    try {
      const userId = req.user._id;
      const input = { ...req.body, userId };

      const validation = validateCreatePost(input);

      if (!validation.success) {
        return res
          .status(400)
          .json({ message: JSON.parse(validation.error.message) });
      }

      const post = await PostController.create(validation.data);

      res.status(201).json({ message: "Post creado", post: post });
    } catch (err) {
      console.error("Error al crear post:", err);
    }
  }

  // static async update(req, res) {
  //   try {
  //     const { id } = req.params;
  //     const
  //   } catch (err) {
  //   console.error("Error al actualizar post:", err);
  //   }
  // }
}
