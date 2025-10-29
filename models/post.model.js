import { PostController } from "../controllers/post.controller.js";
import {
  validateCreatePost,
  validatePartialPost,
} from "../validations/post.js";

export class PostModel {
  static async getAll(req, res) {
    try {
      const posts = await PostController.getAll();

      return res.status(200).json(posts);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al buscar post por id", error: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const post = await PostController.getById({ id });

      return res.status(200).json(post);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al buscar post por id", error: err.message });
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
      res
        .status(400)
        .json({ message: "Error al crear post", error: err.message });
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
      res
        .status(400)
        .json({ message: "Error al actualizar post", error: err.message });
    }
  }

  static async toggleLike(req, res) {
    const { id } = req.params;
    const userId = req.user._id;

    try {
      const { post, action } = await PostController.toggleLike({ id, userId });

      res.status(200).json({ message: action, post });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al cambiar like", error: err.message });
    }
  }

  static async toggleRepost(req, res) {
    const { id } = req.params;
    const userId = req.user._id;

    try {
      const { post, action } = await PostController.toggleRepost({
        id,
        userId,
      });

      res.status(200).json({ message: action, post });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al cambiar repost", error: err.message });
    }
  }
}
