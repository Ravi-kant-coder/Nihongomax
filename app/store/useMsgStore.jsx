import { create } from "zustand";

const useMsgStore = create((set) => ({
  isMsgBoxOpen: false,
  unreadCount: 0,

  toggleMsgBox: () => set((state) => ({ isMsgBoxOpen: !state.isMsgBoxOpen })),
  openMsgBox: () => set({ isMsgBoxOpen: true }),
  closeMsgBox: () => set({ isMsgBoxOpen: false }),

  incrementUnread: () =>
    set((state) => ({ unreadCount: state.unreadCount + 1 })),
  resetUnread: () => set({ unreadCount: 0 }),
}));

export default useMsgStore;
// This store manages the state of the message box, including whether it is open or closed and the count of unread messages.
// It provides methods to toggle, open, and close the message box, as well as to increment and reset the unread message count.
// This allows components to easily access and modify the message box state without prop drilling.
//   document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);
