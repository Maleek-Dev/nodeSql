import cors from "cors";
import express from "express";
import userRoutes from "./routes/user.route.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the Node.js MySQL API" });
});

//Routes
app.use("/api/users", userRoutes); // http://localhost:5000/api/users

export default app;
