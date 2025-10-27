import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: "No has iniciado sesión" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Guardamos la información del usuario en req
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Token inválido" });
    }
    if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expirado" });
    }
    return res.status(500).json({ message: "Error al verificar token" });
  }
};

export const verifyLogin = (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (token) {
      return res.status(400).json({ message: "Ya has iniciado sesión" });
    }
    next();
  } catch (err) {
    return res.status(500).json({ message: "Error al verificar login: ", err });
  }
};
