import { CommentController } from "../controllers/CommentController.js";
import { validateCreateComment } from "../validations/commentValidation.js";

export class CommentModel {
  static async getAll(req, res) {
    try {
      const comments = await CommentController.getAll();

      return res.status(200).json(comments);
    } catch (err) {
      res
        .status(400)
        .json({ message: "Error al buscar comentarios", error: err.message });
    }
  }

  static async getById(req, res) {
    const { id } = req.params;

    try {
      const comments = await CommentController.getById(id);

      return res.status(200).json(comments);
    } catch (err) {
      res.status(400).json({
        message: "Error al buscar comment por id",
        error: err.message,
      });
    }
  }

  static async create(req, res) {
    const userId = req.user._id;
    const input = { ...req.body, userId };

    try {
      const validation = validateCreateComment(input);

      if (!validation.success) {
        return res
          .status(400)
          .json({ message: JSON.parse(validation.error.message) });
      }

      const comment = await CommentController.create(validation.data);
      return res.status(201).json({ message: "Comment created", comment });
    } catch (err) {
      res.status(400).json({
        message: "Error al crear comentario",
        error: err.message,
      });
    }
  }
}
