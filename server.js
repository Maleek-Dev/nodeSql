
import dotenv from "dotenv";
import pool from "./configs/db.js";
import app from "./app.js";
import userModel from "./models/user.model.js";

dotenv.config();

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("Connected to the database");
    connection.release();

    await userModel.createTable();

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1);
  }
};

startServer();