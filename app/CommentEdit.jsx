"use client";
import { useState, useEffect } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { motion, AnimatePresence } from "framer-motion";
import { wrapEmojis } from "@/lib/utils";
import { Textarea } from "@/components/ui/textarea";
import EmojiPickerButton from "./components/EmojiPickerButton";
import { useEmojiInsert } from "./hooks/useEmojiInsert";
import useT from "./hooks/useT";

const CommentEdit = ({ postId, commentId, initialComment }) => {
  const { deleteComment, fetchPost } = usePostStore();
  const [isEditing, setIsEditing] = useState(false);
  const [tempComment, setTempComment] = useState(initialComment || "");
  const updateComment = usePostStore((state) => state.updateComment);
  const { inputRef, insertEmoji } = useEmojiInsert();
  const t = useT();

  useEffect(() => {
    setTempComment(initialComment || "");
  }, [initialComment]);

  const trimmed = (tempComment || "").trim();
  const handleSave = async () => {
    if (!trimmed) {
      await deleteComment(postId, commentId);
      setIsEditing(false);
      return;
    }
    try {
      await updateComment(postId, commentId, trimmed);
      setTempComment(trimmed);
      setIsEditing(false);
    } catch (error) {
      console.error("Comment edit failed", error);
    }
  };

  const handleCancel = () => {
    setTempComment(initialComment);
    setIsEditing(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {!isEditing ? (
          <div>
            <p className="text-gray-800 dark:text-gray-300 text-md font-semibold ">
              {wrapEmojis(tempComment)}
            </p>
            <div className="flex items-center mt-2">
              <span className="text-xs text-gray-500 whitespace-nowrap">
                {t("onlyYouCan")}
              </span>

              <button
                className="flex items-center text-xs cursor-pointer hover:underline ml-1 whitespace-nowrap"
                onClick={() => setIsEditing(true)}
              >
                {t("edit")}
                <SquarePen className="h-3 w-3 ml-1" />
              </button>

              <span className="text-xs ml-1 text-gray-500 whitespace-nowrap">
                {t("thisComment")}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className="relative">
              <Textarea
                className="w-full p-2 border rounded ring-offset focus:outline-none focus:ring focus:ring-gray-600 pr-10"
                rows="2"
                value={tempComment}
                ref={inputRef}
                onChange={(e) => setTempComment(e.target.value)}
              />
              <div className="absolute bottom-0 right-2">
                <EmojiPickerButton
                  onSelect={(emoji) =>
                    insertEmoji({
                      emoji,
                      value: tempComment,
                      setValue: setTempComment,
                    })
                  }
                  emojiSize={"h-8 w-8"}
                />
              </div>
            </div>
            {isEditing && !trimmed && (
              <p className="text-xs text-gray-700 mt-1 italic dark:text-gray-400">
                {t("emptyCommentSave")}
              </p>
            )}
            <div className="flex gap-2">
              <button
                className="px-2 bg-white dark:text-green-400 flex items-center text-xs
               font-[Poppins] cursor-pointer border-green-600 border rounded p-0.5
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-green-800"
                onClick={handleSave}
              >
                <span>{t("save")}</span>
                <SquarePen className="h-3 w-3 ml-2" />
              </button>
              <button
                className="px-2 bg-white flex items-center text-xs dark:text-red-400
               font-[Poppins] cursor-pointer border-red-400 border rounded p-0.5
                hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-red-600"
                onClick={handleCancel}
              >
                <span>{t("cancel")}</span>
                <SquarePen className="h-3 w-3 ml-2" />
              </button>
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentEdit;
