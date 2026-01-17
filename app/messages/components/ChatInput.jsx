"use client";
import { useState } from "react";
import { Send } from "lucide-react";
import socket from "@/lib/socket";
import useMessageStore from "@/store/useMessageStore";
import axios from "axios";
import { Paperclip } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChatInput({ user }) {
  const [text, setText] = useState("");
  const { addMessage } = useMessageStore();

  // TODO: Replace with real logged-in user id from auth
  const currentUserId = "CURRENT_USER_ID";

  const handleSend = async (e) => {
    e.preventDefault();
    console.log("currentUserId:", currentUserId);
    console.log("user:", user);
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
    <form onSubmit={handleSend} className="flex items-center gap-2 p-2 ">
      <div className="relative flex-1">
        <Paperclip
          className="absolute top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer right-2
                 hover:text-gray-700 dark:hover:text-gray-300"
          // onClick={handleAttach}
        />

        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Message..."
          className="w-full pl-4 py-2 bg-white dark:bg-[rgb(40,40,40)]"
        />
      </div>
      <Button
        className="cursor-pointer bg-gray-700 hover:bg-black
               dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
      >
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
