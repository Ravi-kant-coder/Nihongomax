"use client";
import { useEffect, useState, useRef } from "react";
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
  //Logic for delete chat later delete it
  const [openIndex, setOpenIndex] = useState(null);
  const [openUp, setOpenUp] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRefs = useRef([]); // holds refs for each button

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCancelDeleteChat = () => {
    setShowDeleteModal(false);
    setOpenIndex(null);
  };
  // Here add the logic to delete the chat

  // When a 3-dot button is clicked
  const handleDotClick = (index) => {
    const btnRef = buttonRefs.current[index];
    if (!btnRef) return;

    setOpenIndex((prev) => (prev === index ? null : index));
  };
  return (
    <>
      {isMsgBoxOpen && (
        <motion.div
          initial={{ y: 500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className={`fixed bottom-20 mx-5 w-[90vw] md:left-1/8 md:w-1/4 dark:border-white/20
           overflow-y-auto max-h-[80vh] md:h-3/4 border border-white/60 backdrop-blur-xl
           bg-[rgba(62,116,74,0.25)] dark:bg-[rgba(30,30,30,0.3)] 
           inset-y-0 z-100 mt-18 rounded shadow-lg overflow-y-auto""${
             isMsgBoxOpen ? "visible" : "invisible"
           }`}
        >
          <div className="flex justify-between items-center w-full top-0 z-900 sticky">
            <div className="p-2 w-2/3 ">
              <SearchInNav />{" "}
            </div>
            <button
              onClick={closeMsgBox}
              className="bg-[rgba(38,38,23,0.7)] hover:bg-black text-white md:px-10
               dark:hover:bg-black cursor-pointer border-2 border-white/80 
               dark:border-[rgb(200,200,200)] rounded-lg top-1 z-50"
            >
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="z-100 rounded ">
            <div className="flex w-full overflow-x-hidden md:overflow-x-auto items-center justify-around border-b py-2 mb-2 scroll-thin-x">
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
            <MsgChat unreadmsgs={unreadmsgs} />
          </div>
        </motion.div>
      )}{" "}
    </>
  );
};

export default MsgBox;
