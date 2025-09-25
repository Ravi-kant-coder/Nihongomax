"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import useMessageStore from "@/store/useMessageStore";
import ChatInput from "./ChatInput";
import MessageItem from "./MessageItem";
import { fetchMessages } from "@/service/chatService";
import socket from "@/lib/socket";

export default function ChatWindow({ user }) {
  const { messages, setMessages, addMessage } = useMessageStore();
  const bottomRef = useRef(null);

  // fetch old messages
  useEffect(() => {
    if (!user?._id) return;
    fetchMessages(user?._id).then(setMessages);
  }, [user, setMessages]);

  // socket events
  useEffect(() => {
    if (!user?._id) return;

    socket.emit("join", "CURRENT_USER_ID"); // TODO: replace with logged-in user id

    socket.on("receiveMessage", (msg) => {
      if (msg.sender._id === user._id || msg.receiver._id === user._id) {
        addMessage(msg);
      }
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [user, addMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-300 dark:bg-[rgb(20,20,20)]">
      <div className="flex items-center gap-3 p-2 bg-gray-100 dark:bg-[rgb(10,10,10)]">
        <Avatar className={"w-10 h-10"}>
          <AvatarImage src={user?.profilePicture} className="object-cover" />
          <AvatarFallback className="bg-gray-400 dark:bg-gray-700 capitalize">
            {user?.username?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="capitalize">{user?.username}</h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">online</p>
        </div>
      </div>

      {/* -------------------Messages------------------- */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageItem key={msg._id || msg.tempId} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput peerId={user} />
    </div>
  );
}
