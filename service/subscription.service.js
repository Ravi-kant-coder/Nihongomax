import axiosInstance from "./url.service";

export const createRazorpayOrder = async (plan) => {
  try {
    const response = await axiosInstance.post(
      "/api/subscriptions/create-order",
      {
        plan,
      },
    );

    return response.data;
  } catch (error) {
    console.error(
      "Create Razorpay order error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};

export const verifyRazorpayPayment = async (paymentResponse) => {
  try {
    const response = await axiosInstance.post(
      "/api/subscriptions/verify-payment",
      paymentResponse,
    );

    return response.data;
  } catch (error) {
    console.error(
      "Verify Razorpay payment error:",
      error.response?.data || error.message,
    );

    throw error;
  }
};
