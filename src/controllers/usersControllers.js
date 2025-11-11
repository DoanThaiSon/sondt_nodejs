import User from "../models/User.js";


export const createUser = async (req, res) => {
  try {
    const { name,email,phone } = req.body;

    const user = new User({ name ,email,phone});

    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Lỗi khi gọi createUser", error);
    res.status(500).json({ message: "Lỗi hệ thống" });
  }
};