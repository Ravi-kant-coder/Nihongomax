"use client";
import { useState } from "react";
import useMessageStore from "@/store/useMessageStore";
import { sendMessage } from "@/service/chatService";
import { ArrowBigLeft, Send } from "lucide-react";

export default function ChatInput({ peerId }) {
  const [text, setText] = useState("");
  const { addMessage } = useMessageStore();

  const handleSend = () => {
    if (!text.trim()) return;
    const newMsg = {
      _id: Date.now(),
      text,
      sender: "me",
    };
    addMessage(newMsg);
    sendMessage(peerId, text);
    setText("");
  };

  return (
    <div className="p-3 bg-gray-200 dark:bg-[rgb(20,20,20)] flex">
      <input
        type="text"
        className="flex-1 rounded-lg px-3 py-2 mr-2 border-none focus:outline-none
         focus:border-none dark:bg-[rgb(30,30,30)] bg-white"
        placeholder="Message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
      />
      <button
        onClick={handleSend}
        className="bg-gray-800 text-white px-3 py-2 rounded-full cursor-pointer
         hover:bg-black disabled:opacity-50"
      >
        <Send className=" h-5 w-5" />
      </button>
    </div>
  );
}
