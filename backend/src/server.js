import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";



dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json()); 
app.use("/api/auth", authRoutes);
app.use("/api", userRoutes);


// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running Successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
