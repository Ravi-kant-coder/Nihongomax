import { create } from "zustand";

const useChatStore = create((set) => ({
  activeChat: null, // or store userId / chatId
  openChat: (chatId) => set({ activeChat: chatId }),
  closeChat: () => set({ activeChat: null }),
}));
export default useChatStore;
