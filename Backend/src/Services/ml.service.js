import axios from "axios";

const ML_BASE_URL = "http://127.0.0.1:8001";

export const predictFromML = async (data) => {
  try {
    const response = await axios.post(
      `${ML_BASE_URL}/predict`,
      data
    );

    return response.data;
  } catch (error) {
    console.error("ML Service Error:", error.message);
    throw new Error("Failed to get prediction from ML service");
  }
};