import axiosInstance from "./url.service";

export const createBlogService = async (blogData, onProgress) => {
  try {
    const result = await axiosInstance.post("/blogs", blogData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateBlogService = async (blogId, content) => {
  try {
    const result = await axiosInstance.patch(`/blogs/${blogId}/content`, {
      content,
    });
    return result?.data?.data;
  } catch (error) {
    console.error("blog.service update Error:", error.message);
    throw error;
  }
};

export const deleteBlogService = async (blogId) => {
  try {
    const result = await axiosInstance.delete(`/blogs/${blogId}`);
    return result?.data?.message;
  } catch (error) {
    console.error("Delete Blog Error in service:", error.message);
    throw error;
  }
};

export const fetchBlogsService = async () => {
  try {
    const result = await axiosInstance.get("/blogs/blogs");
    return result?.data?.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
