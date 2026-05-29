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

// CORS CONFIGURATION
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://gsa-hackthon.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/ml", mlRoutes);

// HEALTH CHECK
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