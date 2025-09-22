import { create } from "zustand";

const useMessageStore = create((set) => ({
  messages: [],
  setMessages: (msgs) => set({ messages: msgs }),
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

export default useMessageStore;
