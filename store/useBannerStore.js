import { create } from "zustand";

const useBannerStore = create((set) => ({
  banner: null,

  showBanner: (message, type = "success", duration = 3000) => {
    set({ banner: { message, type } });

    setTimeout(() => {
      set({ banner: null });
    }, duration);
  },
}));

export default useBannerStore;
