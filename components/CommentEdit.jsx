"use client";

import { useState, useEffect, useRef } from "react";
import { SquarePen } from "lucide-react";
import { motion } from "framer-motion";

export default function CommentEdit({ initialComment }) {
  const [isEditing, setIsEditing] = useState(false);
  const [comment, setComment] = useState(initialComment);
  const [tempComment, setTempComment] = useState(comment);
  const textareaRef = useRef(null);

  useEffect(() => {
    setComment(initialComment);
    setTempComment(initialComment);
  }, [initialComment]);

  const handleSave = () => {
    setComment(tempComment.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setTempComment(comment);
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <>
          <p className="text-gray-800 dark:text-gray-300 mb-2">{comment}</p>
          <motion.button
            whileHover={{ x: 8 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="px-2 bg-white flex items-center text-sm font-[Poppins] cursor-pointer border-gray-400 border-1 rounded p-1 hover:bg-gray-300  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none"
            onClick={() => setIsEditing(true)}
          >
            <span>Edit Comment</span>
            <SquarePen className="h-4 w-4 ml-2" />
          </motion.button>
        </>
      ) : (
        <>
          <textarea
            className="w-full p-2 border rounded mb-2 ring-offset-2 focus:outline-none focus:ring-1 focus:ring-gray-600"
            rows="3"
            value={tempComment}
            onChange={(e) => setTempComment(e.target.value)}
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-2 bg-white text-green-800 flex items-center text-sm font-[Poppins] cursor-pointer border-green-400 border-1 rounded p-1 hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none"
              onClick={handleSave}
            >
              <span>SAVE</span>
              <SquarePen className="h-4 w-4 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-2 bg-white flex items-center text-red-600 text-sm font-[Poppins] cursor-pointer border-red-400 border-1 rounded p-1 hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none"
              onClick={handleCancel}
            >
              <span>CANCEL</span>
              <SquarePen className="h-4 w-4 ml-2" />
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}
