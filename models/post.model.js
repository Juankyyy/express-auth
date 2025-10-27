import { PostController } from "../controllers/post.controller.js";
import {
  validateCreatePost,
  validatePartialPost,
} from "../validations/post.js";

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
    const { id } = req.params;

    try {
      const post = await PostController.getById({ id });

      return res.status(200).json(post);
    } catch (err) {
      console.error("Error al buscar post:", err);
    }
  }

  static async create(req, res) {
    const userId = req.user._id;
    const input = { ...req.body, userId };

    try {
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

  static async update(req, res) {
    const { id } = req.params;
    const input = req.body;
    
    try {
      const validation = validatePartialPost(input);

      if (!validation.success) {
        return res
          .status(400)
          .json({ message: JSON.parse(validation.error.message) });
      }

      const updatedPost = await PostController.update({
        id,
        input: validation.data,
      });

      res.status(200).json({ message: "Post actualizado", post: updatedPost });
    } catch (err) {
      console.error("Error al actualizar post:", err);
    }
  }

  static async toggleLike(req,res) {
    const { id } = req.params;
    const userId = req.user._id;

    try {
      const { post, action } = await PostController.toggleLike({ id, userId });

      res.status(200).json({ message: action, post });
    } catch (err) {
      console.error("Error al cambiar like:", err);
    }
  }
}
