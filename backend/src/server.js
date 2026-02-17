import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// Middlewares
app.use(cors({ origin: "http://localhost:5173" })); 
app.use(express.json()); 

// Test route
app.get("/", (req, res) => {
  res.json({ message: "Backend is running Successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
