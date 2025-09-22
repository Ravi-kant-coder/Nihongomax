"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useRef, useState } from "react";
import useMessageStore from "@/store/useMessageStore";
import ChatInput from "./ChatInput";
import MessageItem from "./MessageItem";
import { fetchMessages } from "@/service/chatService";

export default function ChatWindow({ chatId, peerId }) {
  const { messages, setMessages } = useMessageStore();
  const bottomRef = useRef(null);

  useEffect(() => {
    if (!chatId) return;
    fetchMessages(peerId).then(setMessages);
  }, [chatId, peerId, setMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 h-full bg-gray-200 dark:bg-[rgb(20,20,20)]">
      {/* Header */}
      <div className="flex items-center gap-3 p-2 bg-white dark:bg-[rgb(10,10,10)]">
        <Avatar>
          <AvatarImage src={user?.profilePicture} className="object-cover" />
          <AvatarFallback className="bg-gray-400 dark:bg-gray-700 capitalize">
            {peerId?.username?.[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg capitalize">{peerId?.username}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {messages.map((msg) => (
          <MessageItem key={msg._id || msg.tempId} msg={msg} />
        ))}
        <div ref={bottomRef} />
      </div>

      <ChatInput peerId={peerId} />
    </div>
  );
}
