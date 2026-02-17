import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

if (!process.env.JWT_SECRET) {
  console.error("Missing JWT_SECRET in .env");
  process.exit(1);
}

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);

app.use(express.json());

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, 
  max: 20, 
  message: { message: "Too many attempts. Try again later." },
});

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Backend is running Successfully!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
