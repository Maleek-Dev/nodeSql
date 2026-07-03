import UserModel from "../models/user.model.js";
import { generateId } from "../utils/generate-id.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await UserModel.getUserById(user_id);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const { full_name, email, age } = req.body;
    if (!full_name || !email || !age) {
      return res.status(400).json({
        success: false,
        error: "Missing required fields",
        message: "full_name, email, and age are required",
      });
    }
    const user_id = generateId();
    const result = await UserModel.createUser(user_id, full_name, email, age);
    const newUser = await UserModel.getUserById(result.insertId);
    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error.message);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        success: false,
        error: "User already exists",
        message: "A user with this email already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Internal server error",
      message: error.message,
    });
  }
};
