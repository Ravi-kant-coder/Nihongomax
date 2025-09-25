import { create } from "zustand";
import * as chatService from "@/service/chatService";

const useMessageStore = create((set, get) => ({
  messages: [],

  setMessages: (msgs) => set({ messages: msgs }),

  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),

  // ✅ Fetch messages from service
  fetchMessages: async (peerId) => {
    try {
      const msgs = await chatService.fetchMessages(peerId);
      set({ messages: msgs });
    } catch (err) {
      console.error("❌ Failed to fetch messages:", err);
    }
  },

  // ✅ Send message via service + socket
  sendMessage: async ({ sender, receiver, text }) => {
    try {
      const newMsg = await chatService.sendMessage(receiver, text);

      // Agar backend se _id milta hai use karo, warna fallback
      const msgWithFallback = {
        _id: newMsg?._id || Date.now(),
        sender: { _id: sender },
        receiver: { _id: receiver },
        text,
        createdAt: new Date(),
      };

      get().addMessage(msgWithFallback);
    } catch (err) {
      console.error("❌ Failed to send message:", err);
    }
  },
}));

export default useMessageStore;
