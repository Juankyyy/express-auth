import { CommentController } from "../controllers/CommentController.js";

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
}
