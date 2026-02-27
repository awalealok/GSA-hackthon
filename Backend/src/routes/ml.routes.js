import express from "express";
import { predictFromML } from "../Services/ml.service.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/predict", authMiddleware, async (req, res) => {
  try {
    const inputData = req.body;

    const predictionResult = await predictFromML(inputData);

    res.status(200).json({
      success: true,
      data: predictionResult
    });

  } catch (error) {
    console.error("Prediction Route Error:", error.message);

    res.status(500).json({
      success: false,
      message: "ML prediction failed"
    });
  }
});

export default router;