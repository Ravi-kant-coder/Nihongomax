import axiosInstance from "./url.service";

export const registerUser = async (userData) => {
  console.log("Service me FormData:", [...userData.entries()]);
  try {
    const response = await axiosInstance.post("/auth/register", userData);
    console.log("Service me wapis aya response:", response.data);
    return response.data;
  } catch (error) {
    console.log(error);
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
    const response = await axiosInstance.get("users/check-auth");
    if (response.data.status === "success") {
      return { isAuthenticated: true, user: response?.data?.data };
    } else if (response.status === "error") {
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.log(error);
    return { isAuthenticated: false };
  }
};
