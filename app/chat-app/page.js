"use client";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import axios from "axios";
import { create } from "zustand";

const socket = io("http://localhost:8080");

// Zustand store
const useChatStore = create((set) => ({
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
}));

export default function ChatApp() {
  const { messages, addMessage } = useChatStore();
  const [input, setInput] = useState("");
  const messageEndRef = useRef(null);

  useEffect(() => {
    socket.on("message", (msg) => {
      addMessage(msg);
    });

    return () => socket.off("message");
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const newMsg = {
      user: "Ravi",
      text: input,
      time: new Date().toISOString(),
    };
    socket.emit("message", newMsg);
    addMessage(newMsg);
    setInput("");
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="bg-teal-500 text-white py-3 px-4 font-bold text-lg shadow">
        WhatsApp Clone
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={cn(
              "max-w-xs p-2 rounded-lg text-sm",
              msg.user === "Ravi"
                ? "ml-auto bg-teal-100 text-right"
                : "mr-auto bg-white border"
            )}
          >
            <div className="text-gray-800">{msg.text}</div>
            <div className="text-[10px] text-gray-400 mt-1">
              {new Date(msg.time).toLocaleTimeString()}
            </div>
          </div>
        ))}
        <div ref={messageEndRef} />
      </div>
      <div className="flex items-center p-2 border-t bg-white">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          className="flex-1 p-2 border rounded-lg outline-none"
          placeholder="Type a message"
        />
        <button
          onClick={sendMessage}
          className="ml-2 px-4 py-2 bg-teal-500 text-white rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
