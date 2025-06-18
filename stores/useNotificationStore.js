import { create } from "zustand";

const useNotificationStore = create((set) => ({
  isNotificationBoxOpen: false,
  unreadNotificationCount: 0,

  toggleNotificationBox: () =>
    set((state) => {
      const willOpen = !state.isNotificationBoxOpen;
      return {
        isNotificationBoxOpen: willOpen,
        unreadNotificationCount: willOpen ? 0 : state.unreadNotificationCount,
      };
    }),

  incrementNotification: () =>
    set((state) => ({
      unreadNotificationCount: state.isNotificationBoxOpen
        ? state.unreadNotificationCount
        : state.unreadNotificationCount + 1,
    })),

  clearNotifications: () => set({ unreadNotificationCount: 0 }),
}));

export default useNotificationStore;
