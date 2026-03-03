import { create } from "zustand";
import {
  createBlogService,
  fetchBlogsService,
  deleteBlogService,
  updateBlogService,
} from "@/service/blog.service";

export const useBlogStore = create((set) => ({
  blogs: [],
  loading: false,
  error: null,

  fetchBlogsZust: async () => {
    set({ loading: true });
    try {
      const blogs = await fetchBlogsService();
      set({ blogs, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteBlogZust: async (blogId) => {
    set({ loading: true });
    try {
      await deleteBlogService(blogId);
      set((state) => ({
        blogs: state.blogs.filter((blog) => blog._id !== blogId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      console.error("Zustand Blog delete error", error);
    }
  },

  createBlogZust: async (blogData) => {
    set({ loading: true, error: null });
    try {
      const newBlog = await createBlogService(blogData);
      set((state) => ({
        blogs: [newBlog, ...state.blogs],
        loading: false,
      }));
      return newBlog;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  updateBlogZust: async (blogId, newContent) => {
    try {
      await updateBlogService(blogId, newContent);
      set((state) => ({
        blogs: state.blogs.map((blog) =>
          blog._id === blogId ? { ...blog, ...newContent } : blog,
        ),
      }));
    } catch (error) {
      console.error("Zustand Update Error:", error);
      set({ error });
    }
  },
}));
