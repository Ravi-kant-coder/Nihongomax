import { ChevronDown, ChevronUp, Send, Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { formatDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CommentEdit from "./CommentEdit";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./Spinner";
import { usePostStore } from "@/store/usePostStore";
import EmojiPickerButton from "./components/EmojiPickerButton";
import { wrapEmojis } from "@/lib/utils";
import { useEmojiInsert } from "./hooks/useEmojiInsert";
import useT from "./hooks/useT";
import useFormatRelativeTime from "./hooks/useFormatRelativeTime";

const CommentCard = ({ comment, post, postId, commentId }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { fetchPost, deleteComment } = usePostStore();
  const { inputRef, insertEmoji } = useEmojiInsert();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [readyTodel, setReadyTodel] = useState(false);
  const t = useT();
  const formatTime = useFormatRelativeTime();
  const handleDpClick = () => {
    startTransition(() => {
      if (comment?.user?._id) {
        router.push(`/user-profile/${comment?.user?._id}`);
      }
    });
  };
  const handleCommentDelete = async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);
      await fetchPost();
    } catch (err) {
      console.error("Error deleting comment", err);
    } finally {
      setShowDeleteModal(false);
    }
  };
  console.log("COMMENT OBJECT =", comment);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, height: 0, rotate: -5 }}
        animate={{
          opacity: 1,
          height: "auto",
          rotate: readyTodel ? -5 : 0,
        }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className={`flex items-start space-x-2 m-4 rounded-md p-2 text-sm
                ${readyTodel ? "bg-[rgb(255,200,200)] dark:bg-[rgb(120,0,0)]" : "bg-gray-300 dark:bg-[rgb(35,35,35)]"}`}
      >
        {/* --------------------------Comment (User information)-------------------------- */}
        <div onClick={handleDpClick} className="cursor-pointer">
          <Avatar className="cursor-pointer h-8 w-8 mr-3 hover:ring-1 ring-gray-500">
            <AvatarImage
              src={comment?.user?.profilePicture || ""}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-300 dark:bg-black capitalize">
              {comment?.user?.username?.[0] || "U"}
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full">
          <div className="">
            <div
              className="lg:w-70 md:w-50 truncate w-40 cursor-pointer 
             overflow-hidden hover:underline capitalize font-[450]"
              onClick={handleDpClick}
            >
              {user?._id === comment?.user?._id ? (
                <span>{t("you")}</span>
              ) : (
                comment?.user?.username
              )}
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-xs normal-case">
              {formatTime(comment?.createdAt)}
            </div>

            {/* --------------------------Actual Comment----------------------- */}

            {user?._id !== comment?.user?._id ? (
              <p className="text-md font-semibold mt-2">
                {wrapEmojis(comment?.text)}
              </p>
            ) : (
              <CommentEdit
                post={post}
                postId={post?.id}
                comment={comment}
                commentId={comment?._id}
                initialComment={comment?.text}
              />
            )}
          </div>
          {user?._id === comment?.user?._id && (
            <button
              className="flex items-center text-xs cursor-pointer hover:underline ml-3"
              onClick={() => {
                setShowDeleteModal(true);
                setReadyTodel(true);
              }}
            >
              <span className="whitespace-nowrap">{t("delete")}</span>
              <Trash2 className="h-3 w-3 ml-1" />
            </button>
          )}
        </div>
      </motion.div>
      {/* --------------------Delete Confirmation Modal------------------- */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <motion.div
            initial={{ scale: 0, rotate: -50 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 300 }}
            className="bg-white dark:bg-gray-800 p-10 rounded-lg"
          >
            <h2 className="text-xl font-semibold text-center text-red-600 dark:text-white dark:font-normal">
              Sure want to delete this comment {user?.username?.split(" ")[0]}?
            </h2>
            <p className=" dark:text-gray-300 text-center my-3 text-lg">
              This cannot be recovered.
            </p>

            <div className="flex justify-center gap-4 mt-6 ">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setReadyTodel(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer
                dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
              >
                キャンセル
              </button>
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setReadyTodel(false);
                  handleCommentDelete(postId, commentId);
                }}
                className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700
                         cursor-pointer text-white text-sm"
              >
                はい、削除する
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CommentCard;
