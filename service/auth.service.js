import axiosInstance from "./url.service";

export const registerUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await axiosInstance.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const sendResetLink = async (email) => {
  const res = await axiosInstance.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (token, password) => {
  const res = await axiosInstance.post(`/auth/reset-password/${token}`, {
    password,
  });
  return res.data;
};

export const logout = async () => {
  try {
    const response = await axiosInstance.get("/auth/logout");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const checkUserAuth = async () => {
  try {
    const response = await axiosInstance.get("/auth/me");

    return {
      isAuthenticated: true,
      user: response?.data?.data,
    };
  } catch (error) {
    return { isAuthenticated: false };
  }
};
