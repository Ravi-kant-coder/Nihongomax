import axiosInstance from "./url.service";

export const createStory = async (storyData) => {
  try {
    const result = await axiosInstance.post("/users/story", storyData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllStories = async () => {
  try {
    const result = await axiosInstance.get("/users/story");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteStory = async (storyId) => {
  try {
    const result = await axiosInstance.delete(`/users/story/${storyId}`);
    return result?.data?.message;
  } catch (error) {
    console.error("Delete Story Error:", error.response?.data || error.message);
    throw error;
  }
};

export const likeStory = async (storyId) => {
  try {
    const result = await axiosInstance.post(`/users/stories/likes/${storyId}`);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
