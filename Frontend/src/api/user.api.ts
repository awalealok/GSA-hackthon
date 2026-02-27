import API_BASE_URL from "./api";

export const getUsers = async () => {
  const response = await fetch(`${API_BASE_URL}/api/users`);
  const data = await response.json();
  return data;
};
