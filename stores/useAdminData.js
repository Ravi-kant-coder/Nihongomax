import { create } from "zustand";
import api from "@/lib/axios";

export const useAdminData = create((set) => ({
  querys: [],

  //get all queries
  fetchQuerys: async () => {
    try {
      const res = await api.get("/api/querys");
      set({ querys: res.data });
    } catch (err) {
      console.error("Get wala Error", err);
    }
  },

  //post a single query
  createQuery: async (formData) => {
    try {
      const res = await api.post("/api/querys", formData);
      set((state) => ({ querys: [...state.querys, res.data] }));
    } catch (err) {
      console.error("Post wala Error", err);
    }
  },

  //delete a query by Id
  deleteQuery: async (id) => {
    try {
      await api.delete(`/api/querys/${id}`);
      set((state) => ({
        querys: state.querys.filter((query) => query._id !== id),
      }));
    } catch (err) {
      console.error("Delete wala Error", err);
    }
  },
}));
