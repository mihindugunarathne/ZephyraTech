import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { demoUser } from "../data/demoUser.js";


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    // check user
    if (email !== demoUser.email) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // compare password
    const isMatch = await bcrypt.compare(password, demoUser.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // create JWT token
    const token = jwt.sign(
      { id: demoUser.id, email: demoUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // send response
    res.json({
      token,
      user: {
        id: demoUser.id,
        email: demoUser.email,
        name: demoUser.name,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
