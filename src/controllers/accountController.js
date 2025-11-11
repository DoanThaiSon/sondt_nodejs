// src/controllers/authController.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Account from "../models/Account.js";

/**
 * Đăng ký tài khoản mới
 * POST /api/auth/register
 */
export const registerAccount = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password)
      return res.status(400).json({ message: "Thiếu username hoặc password" });

    const existingAccount = await Account.findOne({ username });
    if (existingAccount)
      return res.status(400).json({ message: "Username đã tồn tại" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAccount = new Account({ username, password: hashedPassword });
    await newAccount.save();

    res.status(201).json({ message: "Đăng ký thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};

/**
 * Đăng nhập tài khoản
 * POST /api/auth/login
 */
export const loginAccount = async (req, res) => {
  try {
    const { username, password } = req.body;

    const account = await Account.findOne({ username });
    if (!account)
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch)
      return res.status(400).json({ message: "Sai tài khoản hoặc mật khẩu" });

    const token = jwt.sign(
      { id: account._id, username: account.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: { username: account.username },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server", error: error.message });
  }
};
