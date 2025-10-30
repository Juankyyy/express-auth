import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import "dotenv/config";

import { corsMiddleware } from "./middlewares/cors.js";
import { connectDB } from "./db.js";

import { UsersRouter } from "./routes/users.js";
import { PostsRouter } from "./routes/posts.routes.js";
import { CommentsRouter } from "./routes/comments.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(corsMiddleware());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hola, Auth!");
});

app.use("/users", UsersRouter);
app.use("/posts", PostsRouter);
app.use("/comments", CommentsRouter);

connectDB();

const PORT = process.env.PORT ?? 1234;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
