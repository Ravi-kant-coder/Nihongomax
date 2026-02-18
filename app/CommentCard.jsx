import { Trash2 } from "lucide-react";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import CommentEdit from "./CommentEdit";
import { motion, AnimatePresence } from "framer-motion";
import { usePostStore } from "@/store/usePostStore";
import { wrapEmojis } from "@/lib/utils";
import useT from "./hooks/useT";
import useFormatRelativeTime from "./hooks/useFormatRelativeTime";

const CommentCard = ({ comment, post, postId, commentId }) => {
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { deleteComment } = usePostStore();
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
    } catch (err) {
      console.error("Error deleting comment", err);
    } finally {
      setShowDeleteModal(false);
    }
  };

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
        className={`flex items-start m-2 p-2 text-sm flex-col rounded-lg
                ${readyTodel ? "bg-[rgb(255,200,200)] dark:bg-[rgb(120,0,0)]" : "bg-gray-200 dark:bg-[rgb(35,35,35)]"}`}
      >
        {/* --------------------------Comment user info-------------------------- */}
        <div className="flex w-full">
          <Avatar
            className="cursor-pointer h-8 w-8 mr-3 hover:ring-1 ring-gray-500"
            onClick={handleDpClick}
          >
            <AvatarImage
              src={comment?.user?.profilePicture || ""}
              className="object-cover"
            />
            <AvatarFallback className="bg-gray-300 dark:bg-black capitalize">
              {comment?.user?.username?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="w-full">
            <div
              className="lg:w-70 md:w-50 truncate cursor-pointer overflow-hidden hover:underline capitalize font-[450]"
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
            {/* --------------------------Comment text-------------------------- */}

            {user?._id !== comment?.user?._id ? (
              <p className="text-md font-semibold w-full break-words whitespace-pre-wrap">
                {wrapEmojis(comment?.text)}
              </p>
            ) : (
              <CommentEdit
                post={post}
                postId={postId}
                comment={comment}
                commentId={commentId}
                initialComment={comment?.text}
              />
            )}
          </div>
          {user?._id === comment?.user?._id && (
            <button
              className="rounded px-1 flex items-center justify-center text-xs cursor-pointer dark:border-gray-500 hover:border-red-600 group
              group border border-gray-400 dark:hover:border-red-600 h-8"
              onClick={() => {
                setShowDeleteModal(true);
                setReadyTodel(true);
              }}
            >
              <p className="whitespace-nowrap group-hover:text-red-700 group-hover:dark:text-red-500 text-gray-600 dark:text-gray-400 text-xs">
                {t("delete")}?
              </p>
              <Trash2 className="h-4 w-4 group-hover:text-red-700 text-gray-600 dark:text-gray-400 group-hover:dark:text-red-500 ml-1" />
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
