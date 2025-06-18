"use client";
// import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import MsgChat from "./MsgChat";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchInNav from "./SearchInNav";
import useMsgStore from "@/stores/useMsgStore";

const unreadmsgs = [
  {
    imageUrl: "/Horizontal1.jpg",
    key: "3",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "4",
    username: "Sahanubhuti Sharmasmjda",
  },
  {
    imageUrl: "/Gil.jpg",
    key: "5",
    username: "Farheen Khan",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "6",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Circular.jpg",
    key: "7",
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
          className={`fixed bg-white dark:bg-[rgb(40,40,40)] dark:text-white md:bottom-0 rounded-md bottom-18 md:left-40 md:w-1/4 left-2 right-2 md:h-3/4  ${
            isMsgBoxOpen ? "visible" : "invisible"
          }`}
        >
          <div className="z-100 rounded ">
            <div className="p-4 w-2/3 ">
              <SearchInNav />{" "}
            </div>
            <div className="flex items-center justify-around border-b pb-2 mb-2">
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
            <button
              onClick={closeMsgBox}
              className="dark:hover:bg-[rgb(20,20,20)] hover:bg-gray-400 hover:text-white dark:hover:text-white text-gray-500 dark:text-[rgb(150,150,150)] cursor-pointer border-2 border-gray-400 dark:border-[rgb(150,150,150)] rounded-full absolute top-2 right-2 z-50"
            >
              <X className="w-7 h-7" />
            </button>
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
