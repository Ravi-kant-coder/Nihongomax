"use client";
import { useState, useEffect } from "react";
import { SquarePen } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import { wrapEmojis } from "@/lib/utils";
import EmojiPickerButton from "./components/EmojiPickerButton";
import { Textarea } from "@/components/ui/textarea";
import { useEmojiInsert } from "./hooks/useEmojiInsert";
import useT from "./hooks/useT";

const PostContentEdit = ({
  postId,
  initialContent,
  handlePostDelete,
  post,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempContent, setTempContent] = useState(initialContent);
  const updatePostContent = usePostStore((state) => state.updatePostContent);
  const { inputRef, insertEmoji } = useEmojiInsert();
  const t = useT();
  const trimmed = tempContent.trim();
  const [minutesLeft, setMinutesLeft] = useState(0);

  useEffect(() => {
    const ONE_HOUR = 60 * 60 * 1000;
    const updateTime = () => {
      const timePassed = Date.now() - new Date(post.createdAt).getTime();
      const timeLeft = ONE_HOUR - timePassed;
      setMinutesLeft(Math.max(0, Math.floor(timeLeft / (60 * 1000))));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000); // update every minute
    return () => clearInterval(interval);
  }, [post.createdAt]);

  const handleSave = async () => {
    if (!trimmed && post.uploadedMedia.length === 0) {
      await handlePostDelete(postId);
      return;
    }
    try {
      await updatePostContent(postId, trimmed);
      setTempContent(trimmed);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const handleCancel = () => {
    setTempContent(initialContent);
    setIsEditing(false);
  };

  return (
    <>
      {!isEditing ? (
        // tempContent && (
        <div className="text-gray-800 font-[450] p-4 dark:text-gray-300 py-6 whitespace-pre-wrap">
          {wrapEmojis(tempContent)}
          {minutesLeft > 0 && (
            <div className="text-gray-500 text-xs mt-2">
              <span className=""> {t("onlyYouCan")}</span>
              <button
                className=" items-center inline-flex cursor-pointer underline rounded p-1 hover:bg-gray-300 dark:hover:bg-black"
                onClick={() => setIsEditing(true)}
              >
                {t("edit")}
              </button>
              <span className="">
                {" "}
                {t("thisComment")} {t("for")} {minutesLeft} {t("minutes")}
              </span>
            </div>
          )}
        </div>
      ) : (
        // )
        <>
          <div className="relative">
            <Textarea
              className="w-full p-2 border rounded mb-2 ring-offset focus:outline-none pr-10
             focus:ring focus:ring-gray-600"
              rows="3"
              value={tempContent}
              ref={inputRef}
              onChange={(e) => setTempContent(e.target.value)}
            />
            <div className="absolute bottom-0 right-2">
              <EmojiPickerButton
                onSelect={(emoji) =>
                  insertEmoji({
                    emoji,
                    value: tempContent,
                    setValue: setTempContent,
                  })
                }
                emojiSize={"h-8 w-8"}
              />
            </div>
          </div>
          {!trimmed && post.uploadedMedia.length === 0 && (
            <p className="text-xs text-gray-700 italic my-1 dark:text-gray-400 ">
              {t("emptyCommentSave")}
            </p>
          )}
          <div className="flex gap-2">
            <button
              className="px-2 bg-white dark:text-green-400 flex items-center text-xs font-[Poppins] cursor-pointer border-green-600 border rounded p-0.5
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none text-green-800"
              onClick={handleSave}
            >
              <span>{t("save")}</span>
              <SquarePen className="h-3 w-3 ml-2" />
            </button>
            <button
              className="px-2 bg-white flex items-center text-xs dark:text-red-400 font-[Poppins] cursor-pointer border-red-400 border rounded p-0.5
                hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none text-red-600"
              onClick={handleCancel}
            >
              <span>{t("cancel")}</span>
              <SquarePen className="h-3 w-3 ml-2" />
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default PostContentEdit;
