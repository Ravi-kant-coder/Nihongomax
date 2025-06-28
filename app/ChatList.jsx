"use client";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Trash2, ShieldBan } from "lucide-react";
import { motion } from "framer-motion";
import useChatStore from "@/stores/useChatStore";

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
    imageUrl: "/Circular.jpg",
    key: "4",
    username: "Circuit",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "5",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Vertical2.jpg",
    key: "6",
    username: "Cir",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "7",
    username: "Sahanubhuti Sharmasmjda",
  },
  {
    imageUrl: "/Horizontal2.jpg",
    key: "8",
    username: "Farheen Khan",
  },

  {
    imageUrl: "/Circular.jpg",
    key: "9",
    username: "Circuit",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "10",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Vertical2.jpg",
    key: "11",
    username: "Cir",
  },
];

const ChatList = () => {
  const { openChat } = useChatStore();
  const [openIndex, setOpenIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBlockModal, setShowBlockModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const dropdownRef = useRef(null);
  const buttonRefs = useRef([]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDotClick = (e, index, username) => {
    e.stopPropagation();
    setSelectedUsername(username);
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setShowBlockModal(false);
    setOpenIndex(null);
  };

  return (
    <div className="space-y-2 ">
      {unreadmsgs.map((msg, index) => (
        <div
          key={msg.key}
          onClick={() => openChat(msg.username)}
          className="cursor-pointer rounded hover:bg-gray-200 flex items-center mx-2 p-1
          relative group dark:hover:dark:bg-[rgb(0,30,30)]"
        >
          <Avatar
            className="cursor-pointer h-12 w-12 mr-2 hover:ring-2
           dark:hover:ring-[rgb(0,40,40)] hover:ring-offset-1"
          >
            <AvatarImage src={msg.imageUrl} className="object-cover" />
            <AvatarFallback
              className="bg-teal-400 text-2xl dark:bg-[rgb(0,40,40)]
             text-black"
            >
              {msg.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="w-1/2">
            <p className="truncate font-semibold">{msg.username}</p>
            <p className="text-xs truncate">
              Hi, how are you? Hi, how are you? Hi, how are you?
            </p>
          </div>

          <div className="absolute right-2">
            <div className="relative">
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={(e) => handleDotClick(e, index, msg.username)}
                className="w-10 h-10 bg-[rgba(38,38,23,0.25)] dark:bg-[rgb(0,20,20)] 
                  hover:bg-[rgba(38,38,23,0.5)] dark:hover:dark:bg-[rgb(0,40,40)] 
                  cursor-pointer rounded-full flex items-center justify-center"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {openIndex === index && (
                <div
                  ref={dropdownRef}
                  className="absolute z-[1000] bg-[rgb(180,180,180)] right-10 flex 
                  justify-around p-1 dark:bg-[rgb(30,30,30)] text-sm rounded-md -translate-y-11"
                >
                  <div
                    onClick={(e) => {
                      setShowBlockModal(true);
                      e.stopPropagation();
                    }}
                    className="flex-col hover:bg-gray-300 rounded-md dark:hover:bg-black p-1 
                  cursor-pointer w-25 flex items-center justify-center font-semibold "
                  >
                    <ShieldBan size={20} className="shrink-0" />
                    <p className="text-xs max-w-25 truncate">
                      Block {msg.username.split(" ")[0]}
                    </p>
                  </div>
                  <div
                    onClick={(e) => {
                      setShowDeleteModal(true);
                      e.stopPropagation();
                    }}
                    className="hover:bg-red-200 font-semibold flex-col rounded-md 
                     dark:hover:bg-black p-1 active:bg-gray-200 active:text-red-700 
                      cursor-pointer flex items-center justify-center w-25"
                  >
                    <Trash2 size={20} className="text-red-700 shrink-0" />
                    <p className="text-xs text-red-700">Delete Chat</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}

      {/* ---------------Delete Confirmation Modal------------ */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="font-semibold text-center text-red-600 dark:text-white">
              Delete chat with {selectedUsername}?
            </h2>
            <p className="text-sm dark:text-gray-300 text-center my-2">
              This cannot be recovered.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                    dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
              cursor-pointer text-white text-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
      {/* ---------------Delete Confirmation Modal------------ */}
      {showBlockModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="font-semibold text-center text-black dark:text-white">
              Block {selectedUsername}?
            </h2>
            <p className="text-sm dark:text-gray-300 text-center my-2">
              You can Unblock them later.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                    dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-black cursor-pointer
               text-white text-sm"
              >
                Yes, Block
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default ChatList;
