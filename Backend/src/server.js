import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import mlRoutes from "./routes/ml.routes.js";

dotenv.config();
connectDB();

const app = express();

// ✅ GLOBAL MIDDLEWARE FIRST
app.use(cors());
app.use(express.json());

// ✅ ROUTES AFTER MIDDLEWARE
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ml", mlRoutes);

// Health routes
app.get("/", (req, res) => {
  res.json({ message: "Backend is running successfully" });
});

app.get("/test-db", (req, res) => {
  res.json({ message: "MongoDB is working perfectly 🚀" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});