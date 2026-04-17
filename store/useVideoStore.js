import { create } from "zustand";
import axiosInstance from "@/service/url.service";

const useVideoStore = create((set) => ({
  videos: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,

  fetchVideos: async (page = 1, tag = "All") => {
    set({ loading: true });

    const res = await axiosInstance.get("/videos", {
      params: {
        page,
        limit: 12,
        tag,
      },
    });

    set({
      videos: res.data.videos,
      totalPages: res.data.totalPages,
      currentPage: res.data.currentPage,
      loading: false,
    });
  },

  syncYouTube: async () => {
    await axiosInstance.post("/youtube/sync");
  },
}));

export default useVideoStore;
