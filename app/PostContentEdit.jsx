"use client";
import { useState } from "react";
import { SquarePen } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { wrapEmojis } from "@/lib/utils";
import EmojiPickerButton from "./components/EmojiPickerButton";
import { Textarea } from "@/components/ui/textarea";

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
        <div className="text-gray-800 font-[450] p-4 dark:text-gray-300">
          {wrapEmojis(content)}
          <div>
            <span className="text-xs text-gray-500">Only you can</span>
            <button
              className=" items-center text-xs inline-flex cursor-pointer underline rounded 
              p-1 hover:bg-gray-300 dark:hover:bg-black"
              onClick={() => setIsEditing(true)}
            >
              Edit/Add
            </button>
            <span className="text-xs text-gray-500">this</span>
          </div>
        </div>
      ) : (
        <>
          <div className="relative">
            <Textarea
              className="w-full p-2 border rounded mb-2 ring-offset focus:outline-none pr-12
             focus:ring focus:ring-gray-600"
              rows="3"
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
            />
            <div className="absolute bottom-0 right-2">
              <EmojiPickerButton
                onSelect={(emoji) => setTempContent((prev) => prev + emoji)}
              />
            </div>
          </div>
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
