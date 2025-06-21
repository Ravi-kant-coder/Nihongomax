"use client";
// import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchInNav from "./SearchInNav";
import useMsgStore from "@/stores/useMsgStore";
import MsgChat from "./MsgChat";

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
    key: "5",
    username: "Farheen Khan",
  },

  {
    imageUrl: "/Circular.jpg",
    key: "7",
    username: "Circuit",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "8",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Vertical2.jpg",
    key: "9",
    username: "Circuit",
  },
  {
    imageUrl: "/Vertical1.jpg",
    key: "10",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Girl.jpg",
    key: "11",
    username: "Circuit",
  },
];
const MsgBox = () => {
  const { isMsgBoxOpen, closeMsgBox, resetUnread, incrementUnread } =
    useMsgStore();

  useEffect(() => {
    if (isMsgBoxOpen) resetUnread();
  }, [isMsgBoxOpen, resetUnread]);

  if (!isMsgBoxOpen) return null;

  return (
    <>
      {isMsgBoxOpen && (
        <motion.div
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`fixed inset-x-2 bottom-20 mx-5 md:left-40 md:w-1/4
             bg-[rgb(160,160,160)] dark:bg-[rgb(30,30,30)]
             dark:text-white rounded-lg 
             overflow-y-auto max-h-[calc(100vh-6rem)] md:h-3/4 "${
               isMsgBoxOpen ? "visible" : "invisible"
             }`}
        >
          <div className="z-100 rounded ">
            <div className="p-4 w-2/3 ">
              <SearchInNav />{" "}
            </div>
            <button
              onClick={closeMsgBox}
              className="dark:hover:bg-[rgb(20,20,20)] hover:bg-black hover:text-white dark:hover:text-white text-gray-700 dark:text-[rgb(150,150,150)] cursor-pointer border-2 border-gray-700 dark:border-[rgb(150,150,150)] rounded-lg absolute top-2 right-2 z-50"
            >
              <X className="w-7 h-7" />
            </button>
            <div className="flex items-center justify-around border-b py-2 mb-2 overflow-x-auto scroll-thin-x">
              {unreadmsgs.map((dummymsg, index) => (
                <div
                  key={dummymsg?.key}
                  className="relative group flex items-center rounded-md cursor-pointer "
                >
                  <Avatar className="cursor-pointer h-12 w-12 hover:ring-2 hover:ring-black hover:ring-offset-1 mx-2">
                    <AvatarImage
                      src={dummymsg?.imageUrl}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-400 text-2xl dark:bg-gray-500 text-black">
                      {dummymsg?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
          </div>
          <div className="dark:border-gray-200">
            <MsgChat />
          </div>
        </motion.div>
      )}{" "}
    </>
  );
};

export default MsgBox;
