import express from "express";
import { getAllUsers, getUserById, createUser } from "../controllers/user.controller.js"; 
const router = express.Router();

router.get("/", getAllUsers);
router.get("/:user_id", getUserById);
router.post("/", createUser);

export default router;



