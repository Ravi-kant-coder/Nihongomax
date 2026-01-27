import { create } from "zustand";
import {
  createSchoolService,
  fetchSchoolsService,
  deleteSchoolService,
  updateSchoolService,
} from "@/service/school.service";

export const useSchoolStore = create((set) => ({
  schools: [],
  loading: false,
  error: null,

  fetchSchoolsZust: async () => {
    set({ loading: true });
    try {
      const schools = await fetchSchoolsService();
      set({ schools, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteSchoolZust: async (schoolId) => {
    set({ loading: true });
    try {
      await deleteSchoolService(schoolId);
      set((state) => ({
        schools: state.schools.filter((school) => school._id !== schoolId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      console.error("Zustand School delete error", error);
    }
  },

  createSchoolZust: async (schoolData) => {
    set({ loading: true, error: null });
    try {
      const newSchool = await createSchoolService(schoolData);
      set((state) => ({
        schools: [newSchool, ...state.schools],
        loading: false,
      }));
      return newSchool;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  updateSchoolZust: async (schoolId, newContent) => {
    try {
      await updateSchoolService(schoolId, newContent);
      set((state) => ({
        schools: state.schools.map((school) =>
          school._id === schoolId ? { ...school, ...newContent } : school,
        ),
      }));
    } catch (error) {
      console.error("Zustand Update Error:", error);
      set({ error });
    }
  },
}));
