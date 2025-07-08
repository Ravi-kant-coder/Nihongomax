import { create } from "zustand";
import axios from "@/lib/axios"; // Central Axios instance

export const useLikeStore = create((set) => ({
  likedCount: 0,
  incrementCount: async () => {
    set((state) => ({ likedCount: state.likedCount + 1 }));
    try {
      await axios.post("/api/like", { count: 1 });
    } catch (err) {
      console.error("Failed to save count:", err);
    }
  },
  fetchCount: async () => {
    try {
      const res = await axios.get("/api/like");
      set({ likedCount: res.data.totalCount });
    } catch (err) {
      console.error("Failed to fetch count:", err);
    }
  },
}));
