import { create } from "zustand";
import axiosInstance from "@/service/url.service";

const useVideoStore = create((set) => ({
  videos: [],
  loading: false,

  fetchVideos: async () => {
    set({ loading: true });
    const res = await axiosInstance.get("/videos");
    set({ videos: res.data, loading: false });
  },

  syncYouTube: async () => {
    await axiosInstance.post("/youtube/sync");
  },

  updateTags: async (_id, tags) => {
    await axiosInstance.patch("/videos", { _id, tags });
    set((state) => ({
      videos: state.videos.map((v) => (v._id === _id ? { ...v, tags } : v)),
    }));
  },
}));

export default useVideoStore;
