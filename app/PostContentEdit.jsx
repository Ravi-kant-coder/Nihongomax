"use client";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";

const PostContentEdit = ({ postId, initialContent }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(initialContent);
  const [tempContent, setTempContent] = useState(initialContent);
  const updatePostContent = usePostStore((state) => state.updatePostContent);

  const handleSave = async () => {
    const trimmed = tempContent.trim();
    if (!trimmed) return;
    try {
      await updatePostContent(postId, trimmed);
      setContent(trimmed);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const handleCancel = () => {
    setTempContent(content);
    setIsEditing(false);
  };

  return (
    <div>
      {!isEditing ? (
        <>
          <p className="text-gray-800 dark:text-gray-300 mb-2">{content}</p>
          <button
            className="px-2 bg-white flex items-center text-xs font-[Poppins]
             cursor-pointer border-gray-400 border rounded p-0.5 hover:bg-gray-300
               dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none"
            onClick={() => setIsEditing(true)}
          >
            <span>Edit/Add</span>
            <SquarePen className="h-3 w-3 ml-2" />
          </button>
        </>
      ) : (
        <>
          <textarea
            className="w-full p-2 border rounded mb-2 ring-offset focus:outline-none
             focus:ring focus:ring-gray-600"
            rows="3"
            value={tempContent}
            onChange={(e) => setTempContent(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              className="px-2 bg-white dark:text-green-400 flex items-center text-xs
               font-[Poppins] cursor-pointer border-green-600 border rounded p-0.5
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-green-800"
              onClick={handleSave}
            >
              <span>SAVE</span>
              <SquarePen className="h-3 w-3 ml-2" />
            </button>
            <button
              className="px-2 bg-white flex items-center text-xs dark:text-red-400
               font-[Poppins] cursor-pointer border-red-400 border rounded p-0.5
                hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-red-600"
              onClick={handleCancel}
            >
              <span>CANCEL</span>
              <SquarePen className="h-3 w-3 ml-2" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default PostContentEdit;
