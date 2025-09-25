"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import socket from "@/lib/socket";
import useMessageStore from "@/store/useMessageStore";
import axios from "axios";

export default function ChatInput({ user }) {
  const [text, setText] = useState("");
  const { addMessage } = useMessageStore();

  // TODO: Replace with real logged-in user id from auth
  const currentUserId = "CURRENT_USER_ID";

  const handleSend = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const tempId = Date.now(); // temporary id for UI
    const newMsg = {
      _id: tempId,
      sender: { _id: currentUserId },
      receiver: { _id: user._id },
      text,
      createdAt: new Date(),
    };

    // instantly show in UI
    addMessage(newMsg);

    // send via socket
    socket.emit("sendMessage", {
      sender: currentUserId,
      receiver: user._id,
      text,
    });

    // also save to DB (fallback in case socket drops)
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/messages`,
        {
          sender: currentUserId,
          receiver: user._id,
          text,
        },
        { withCredentials: true }
      );
    } catch (err) {
      console.error("❌ Failed to save message:", err);
    }

    setText("");
  };

  return (
    <form
      onSubmit={handleSend}
      className="flex items-center gap-2 p-2 border-t dark:border-gray-800"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
        className="flex-1 px-4 py-2 rounded-xl border dark:border-gray-700
                   bg-gray-100 dark:bg-gray-800 focus:outline-none"
      />
      <button
        type="submit"
        className="p-2 rounded-full bg-green-500 hover:bg-green-600 
                   text-white flex items-center justify-center"
      >
        <Send size={20} />
      </button>
    </form>
  );
}
