import { create } from "zustand";

const useStudyStore = create((set) => ({
  isStudyBoxOpen: false,

  toggleStudyBox: () =>
    set((state) => ({ isStudyBoxOpen: !state.isStudyBoxOpen })),
  openStudyBox: () => set({ isStudyBoxOpen: true }),
  closeStudyBox: () => set({ isStudyBoxOpen: false }),
}));

export default useStudyStore;
