import axiosInstance from "./url.service";

export const createPost = async (postData) => {
  try {
    const result = await axiosInstance.post("/users/posts", postData);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updatePostContent = async (postId, content) => {
  try {
    const result = await axiosInstance.patch(`/users/posts/${postId}/content`, {
      content,
    });
    return result?.data?.data;
  } catch (error) {
    console.error(
      "post.service me content update me Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const updateComment = async (postId, commentId, text) => {
  try {
    const result = await axiosInstance.patch(
      `/users/posts/${postId}/comments/${commentId}/text`,
      { text }
    );
    return result?.data?.data;
  } catch (error) {
    console.error(
      "post.service me Comment update me Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deletePost = async (postId) => {
  try {
    const result = await axiosInstance.delete(`/users/posts/${postId}`);
    return result?.data?.message;
  } catch (error) {
    console.error("Delete Post Error:", error.response?.data || error.message);
    throw error;
  }
};

export const createStory = async (postData) => {
  try {
    const result = await axiosInstance.post("/users/story", postData);
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
    console.error(
      "post.service Nahi kar paya delete",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const deleteComment = async (postId, commentId) => {
  console.log(postId, commentId);
  try {
    const result = await axiosInstance.delete(
      `/users/posts/${postId}/comments/${commentId}`
    );
    return result?.data?.message;
  } catch (error) {
    console.error(
      "post.service nahi kar paya Comment delete",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getAllPosts = async () => {
  try {
    const result = await axiosInstance.get("/users/posts");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllStory = async () => {
  try {
    const result = await axiosInstance.get("/users/story");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const likePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/users/posts/likes/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const sharePost = async (postId) => {
  try {
    const result = await axiosInstance.post(`/users/posts/share/${postId}`);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getAllUserPosts = async (userId) => {
  try {
    const result = await axiosInstance.get(`/users/posts/user/${userId}`);
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const commentsPost = async (postId, comment) => {
  try {
    const result = await axiosInstance.post(
      `/users/posts/comments/${postId}`,
      comment
    );
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
