import { create } from "zustand";
import {
  createJobService,
  fetchJobsService,
  deleteJobService,
  // updateJobService,
} from "@/service/job.service";

export const useJobStore = create((set) => ({
  jobs: [],
  loading: false,
  error: null,

  fetchJobsZust: async () => {
    set({ loading: true });
    try {
      const jobs = await fetchJobsService();
      set({ jobs, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteJobZust: async (jobId) => {
    set({ loading: true });
    try {
      await deleteJobService(jobId);
      set((state) => ({
        jobs: state.jobs.filter((p) => p._id !== jobId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      console.error("Zustand job delete error", error);
    }
  },

  createJobZust: async (jobData) => {
    console.log("Zustand data object:", jobData);

    set({ loading: true });
    try {
      const newJob = await createJobService(jobData);
      set((state) => ({
        jobs: [newJob, ...state.jobs],
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  updateJobZust: async (postId, newContent) => {
    try {
      await updateJobService(jobId, newContent);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, content: newContent } : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === postId ? { ...post, content: newContent } : post
        ),
      }));
    } catch (error) {
      console.error("Zustand Update Error:", error);
      set({ error });
    }
  },
}));
