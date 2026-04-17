import { create } from "zustand";
import {
  createJobService,
  fetchJobsService,
  deleteJobService,
  updateJobService,
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
      const response = await deleteJobService(jobId);

      set((state) => ({
        jobs: state.jobs.filter((p) => p._id !== jobId),
        loading: false,
        error: null,
      }));

      return { success: true, data: response };
    } catch (error) {
      console.error("Zustand job delete error", error);

      set({
        error: error?.response?.data?.message || error.message,
        loading: false,
      });

      throw error;
    }
  },

  createJobZust: async (jobData) => {
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

  updateJobZust: async (jobId, newContent) => {
    try {
      await updateJobService(jobId, newContent);
      set((state) => ({
        jobs: state.jobs.map((job) =>
          job._id === jobId ? { ...job, ...newContent } : job,
        ),
      }));
    } catch (error) {
      console.error("Zustand Update Error:", error);
      set({ error });
    }
  },
}));
