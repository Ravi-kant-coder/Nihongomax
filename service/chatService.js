import axiosInstance from "./url.service";

// ✅ Fetch messages with a peer
export const fetchMessages = async (peerId) => {
  try {
    const result = await axiosInstance.get(`/messages/${peerId}`);
    return result?.data; // backend ka response return karenge
  } catch (error) {
    console.error("❌ fetchMessages error:", error);
    throw error;
  }
};

// ✅ Send message
export const sendMessage = async (peerId, text) => {
  try {
    const result = await axiosInstance.post("/messages", {
      receiver: peerId,
      text,
    });
    return result?.data;
  } catch (error) {
    console.error("❌ sendMessage error:", error);
    throw error;
  }
};
