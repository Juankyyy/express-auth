import "dotenv/config";
import express from "express";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { corsMiddleware } from "./middlewares/cors.js";
import { connectDB } from "./db.js";
import { UsersRouter } from "./routes/users.js";

const app = express();
app.use(express.json());
app.use(helmet());
app.use(corsMiddleware());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hola, Auth!");
});

app.use("/users", UsersRouter);

connectDB();

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
