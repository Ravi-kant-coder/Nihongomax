"use client";
import { useState, useEffect, useRef } from "react";
import { SquarePen } from "lucide-react";
import { motion } from "framer-motion";
import { usePostStore } from "@/store/usePostStore";
// import { useCommentStore } from "@/store/useCommentStore";

const ReplyEdit = ({ initialComment }) => {
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
            className="px-2 bg-white flex items-center text-xs font-[Poppins]
             cursor-pointer border-gray-400 border rounded p-1 hover:bg-gray-300
               dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none"
            onClick={() => setIsEditing(true)}
          >
            <span>Edit Comment</span>
            <SquarePen className="h-4 w-4 ml-2" />
          </motion.button>
        </>
      ) : (
        <>
          <textarea
            className="w-full p-2 border rounded mb-2 ring-offset focus:outline-none
             focus:ring focus:ring-gray-600"
            rows="3"
            value={tempComment}
            onChange={(e) => setTempComment(e.target.value)}
          />
          <div className="flex gap-2">
            <motion.button
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-2 bg-white dark:text-green-400 flex items-center text-xs
               font-[Poppins] cursor-pointer border-green-600 border rounded p-1
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-green-800"
              onClick={handleSave}
            >
              <span>SAVE</span>
              <SquarePen className="h-4 w-4 ml-2" />
            </motion.button>
            <motion.button
              whileHover={{ x: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="px-2 bg-white flex items-center text-xs dark:text-red-400
               font-[Poppins] cursor-pointer border-red-400 border rounded p-1
                hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-red-600"
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
};
export default ReplyEdit;
