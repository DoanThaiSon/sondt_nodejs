// src/routes/authRoute.js
import express from "express";
import { registerAccount, loginAccount } from "../controllers/accountController.js";

const router = express.Router();

// Gắn từng API vào route
router.post("/register", registerAccount);
router.post("/login", loginAccount);

export default router;
