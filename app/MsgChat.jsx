"use client";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Trash2, ShieldBan } from "lucide-react";
import { motion } from "framer-motion";

const MsgChat = ({ unreadmsgs }) => {
  const [openIndex, setOpenIndex] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");

  const dropdownRef = useRef(null);
  const buttonRefs = useRef([]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleDotClick = (index, username) => {
    setSelectedUsername(username);
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
    setOpenIndex(null);
  };

  return (
    <div className="overflow-y-auto space-y-2">
      {unreadmsgs.map((msg, index) => (
        <div
          key={msg.key}
          className="border border-white/10 
            bg-[rgba(38,38,23,0.25)] dark:bg-[rgba(30,30,30,0.3)] cursor-pointer 
            rounded flex items-center mx-2 p-1 relative group 
            dark:hover:bg-[rgba(20,20,20,0.7)] hover:bg-[rgba(38,38,23,0.5)]"
        >
          <Avatar className="cursor-pointer h-12 w-12 mx-2 hover:ring-2 hover:ring-black hover:ring-offset-1">
            <AvatarImage src={msg.imageUrl} className="object-cover" />
            <AvatarFallback className="bg-gray-400 text-2xl dark:bg-gray-500 text-black">
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
                onClick={() => handleDotClick(index, msg.username)}
                className="w-10 h-10 bg-[rgba(38,38,23,0.25)] dark:bg-[rgb(20,20,20)] 
                  hover:bg-[rgba(38,38,23,0.5)] dark:hover:bg-black 
                  cursor-pointer rounded-full flex items-center justify-center"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {openIndex === index && (
                <div
                  ref={dropdownRef}
                  className="absolute z-[1000]  right-10 flex justify-around p-1 bg-white 
                    dark:bg-[rgb(30,30,30)] text-sm rounded-md -translate-y-11"
                >
                  <div
                    className="flex-col hover:bg-gray-300 rounded-md dark:hover:bg-black p-1 
                  cursor-pointer w-25 flex items-center justify-center font-semibold "
                  >
                    <ShieldBan size={20} className="shrink-0" />
                    <p className="text-xs max-w-25 truncate">
                      Block {msg.username.split(" ")[0]}
                    </p>
                  </div>
                  <div
                    onClick={() => setShowDeleteModal(true)}
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

      {/* Delete Confirmation Modal */}
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
              <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm">
                Yes, Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default MsgChat;
