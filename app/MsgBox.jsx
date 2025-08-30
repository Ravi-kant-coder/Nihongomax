"use client";
import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useMsgStore from "@/store/useMsgStore";
import useChatStore from "@/store/useChatStore";
import ChatList from "./ChatList";
import OneChat from "./OneChat";
const unreadmsgs = [
  {
    imageUrl: "/Horizontal1.jpg",
    key: "1",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "2",
    username: "Sahanubhuti Sharmasmjda",
  },

  {
    imageUrl: "/Horizontal2.jpg",
    key: "3",
    username: "Farheen Khan",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "4",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "5",
    username: "Sahanubhuti Sharmasmjda",
  },

  {
    imageUrl: "/Horizontal2.jpg",
    key: "6",
    username: "Farheen Khan",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "7",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "8",
    username: "Sahanubhuti Sharmasmjda",
  },

  {
    imageUrl: "/Horizontal2.jpg",
    key: "9",
    username: "Farheen Khan",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "10",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "12",
    username: "Sahanubhuti Sharmasmjda",
  },

  {
    imageUrl: "/Horizontal2.jpg",
    key: "13",
    username: "Farheen Khan",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "14",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "22",
    username: "Sahanubhuti Sharmasmjda",
  },

  {
    imageUrl: "/Horizontal2.jpg",
    key: "15",
    username: "Farheen Khan",
  },
];
const MsgBox = () => {
  const { activeChat } = useChatStore();
  const { isMsgBoxOpen, closeMsgBox, resetUnread, incrementUnread } =
    useMsgStore();

  const bottomRef = useRef(null);
  useEffect(() => {
    if (isMsgBoxOpen) {
      setTimeout(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }, [isMsgBoxOpen]);

  if (!isMsgBoxOpen) return null;

  return (
    <>
      {isMsgBoxOpen && (
        <motion.div
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed z-50 top-20 bottom-20 left-1/2 -translate-x-1/2 w-[90vw] md:w-[30%]
          bg-white dark:bg-black border border-gray-400 rounded-md overflow-hidden flex 
          flex-col md:h-[88%]"
        >
          <div className={`${activeChat ? "hidden" : "block"}`}>
            <div
              className="flex bg-white dark:bg-[rgb(0,40,40)] justify-between 
            rounded-tl-lg rounded-tr-lg items-center w-full top-0 z-900 sticky"
            >
              <div className="w-2/3 space-y-5 pb-2">
                <p className="text-2xl font-bold ml-4 my-2">Messages</p>
              </div>
              <button
                onClick={closeMsgBox}
                className="bg-[rgba(23,23,23,0.5)] dark:bg-[rgb(0,30,30)]
               hover:bg-black text-white p-1 mr-4
               dark:hover:bg-black cursor-pointer border-2 border-white/80 
               dark:border-[rgb(200,200,200)] rounded-lg top-1 z-50"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
            <div className="overflow-y-auto">
              <div
                className="flex w-full overflow-x-hidden md:overflow-x-auto items-center
             justify-start border-b py-2 mb-2"
              >
                {unreadmsgs.map((dummymsg, index) => (
                  <div
                    key={dummymsg?.key}
                    className="relative group flex items-center rounded-md cursor-pointer "
                  >
                    <Avatar
                      className="cursor-pointer h-12 w-12 hover:ring-2 hover:ring-gray-400
                      hover:ring-offset-1 mx-2"
                    >
                      <AvatarImage
                        src={dummymsg?.imageUrl}
                        className="object-cover"
                      />
                      <AvatarFallback className="bg-gray-400 text-2xl dark:bg-gray-500">
                        {dummymsg?.username.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto">
            {!activeChat ? (
              <ChatList />
            ) : (
              <OneChat chatId={activeChat} unreadmsgs={unreadmsgs} />
            )}
          </div>
        </motion.div>
      )}
    </>
  );
};

export default MsgBox;
