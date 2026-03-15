import axios from "axios";

const API = axios.create({
  baseURL: "https://gsa-hackthon.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// REGISTER
export const registerUser = async (data: {
  name: string;
  email: string;
  password: string;
  role: string;
}) => {
  const res = await API.post("/users/register", data);
  return res.data;
};

// LOGIN
export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  const res = await API.post("/users/login", data);
  return res.data;
};
