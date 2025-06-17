"use client";
// import { useState } from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import MsgChat from "./MsgChat";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import SearchInNav from "./SearchInNav";
import useMsgStore from "@/app/store/useMsgStore";

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
  // const [showMsgBox, setShowMsgBox] = useState(true);
  const { isMsgBoxOpen, closeMsgBox, resetUnread } = useMsgStore();

  // useEffect(() => {
  //   if (isMsgBoxOpen) resetUnread();
  // }, [isMsgBoxOpen, resetUnread]);

  if (!isMsgBoxOpen) return null;

  return (
    <>
      {isMsgBoxOpen && (
        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          className={`fixed border bg-white dark:bg-black dark:text-white md:bottom-0 rounded-md bottom-18 md:left-40 md:w-1/4 left-2 right-2 md:h-2/3 top-26 overflow-y-auto md:top-auto ${
            isMsgBoxOpen ? "visible" : "invisible"
          }`}
        >
          <div className="fixed h-15 bg-[rgb(200,200,200)] dark:bg-[rgb(20,20,20)]  z-100 md:w-1/4 w-[95vw] rounded ">
            <div className="m-4 w-2/3">
              <SearchInNav />{" "}
            </div>
            <div className="flex items-center justify-around">
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
                    <AvatarFallback className="bg-gray-400 dark:bg-gray-500 text-black">
                      {dummymsg?.username.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
              ))}
            </div>
            <div>
              <button
                onClick={closeMsgBox}
                className="absolute top-0 right-0 text-black hover:text-gray-700 cursor-pointer dark:text-white dark:hover:text-gray-300"
              >
                <X className="w-7 h-7" />
              </button>
            </div>
          </div>
          <div className="space-y-4 md:h-90 h-100 overflow-y-auto top-30 relative dark:border-gray-200">
            <MsgChat />
          </div>
        </motion.div>
      )}{" "}
    </>
  );
};

export default MsgBox;
