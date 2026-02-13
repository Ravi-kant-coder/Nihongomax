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
import CommentCard from "./CommentCard";

const CommentsShown = ({ post, commentText, setCommentText }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { inputRef, insertEmoji } = useEmojiInsert();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [readyTodel, setReadyTodel] = useState(false);
  const { deleteComment, handleCommentPost, fetchPost } = usePostStore();
  const t = useT();
  const formatTime = useFormatRelativeTime();
  const loading = usePostStore((s) => s.loadingComments[post._id]);

  const visibleComments = showAllComments
    ? post?.comments
    : post?.comments?.slice(0, 2);

  const handleCommentSubmit = async () => {
    if (!commentText?.trim()) return;
    if (!post?._id) return;
    await handleCommentPost(post._id, commentText);
    setCommentText("");
    fetchPost();
  };

  return (
    <>
      {visibleComments?.length > 0 && (
        <h3 className="font-semibold ml-4 flex">
          <span>{t("comments")}</span>&nbsp;
          <p className="font-normal text-gray-500">
            (<span>{t("total")}</span> {post?.comments?.length})
          </p>
        </h3>
      )}
      <div
        className="max-h-100 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 
      dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-800 p-2"
      >
        <AnimatePresence>
          {visibleComments?.map((comment) => (
            <CommentCard
              key={comment?._id}
              comment={comment}
              post={post}
              postId={post?._id}
              commentId={comment?._id}
            />
          ))}
        </AnimatePresence>

        {/* ------------------------------------Show More/Less Buttons------------------------------------ */}

        {post?.comments?.length > 2 && (
          <div
            className="w-60 my-2 p-2 dark:text-gray-300"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? (
              <motion.button
                initial={{ y: -500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-black/20 rounded shadow-md items-center justify-center
                 cursor-pointer flex text-sm w-full ml-4 p-2  hover:bg-gray-400
                 dark:hover:bg-gray-800"
              >
                {t("showLess")} <ChevronUp className="ml-1 h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                initial={{ y: -500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-black/20 rounded shadow-md items-center justify-center w-full ml-4 p-2 relative
                 cursor-pointer flex text-sm hover:bg-gray-400 dark:hover:bg-gray-800"
              >
                {t("showMore")} <ChevronDown className="ml-1 h-4 w-4" />
                {post?.comments?.length > 0 && (
                  <span
                    className="absolute -top-3 right-6 bg-green-700 text-white text-xs 
                  px-2 py-0.5 rounded-full "
                  >
                    {post?.comments?.length - 2}
                  </span>
                )}
              </motion.button>
            )}
          </div>
        )}
      </div>

      {/* ------------------------------------Comment Input------------------------------------ */}

      <div className="flex items-center px-4 p-2 mb-6">
        <Avatar className="h-8 w-8 rounded-full mr-3">
          <AvatarImage src={user?.profilePicture} className="object-cover" />
          <AvatarFallback className="dark:bg-gray-800 bg-gray-300 capitalize">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex-1 mr-2 relative">
          <Input
            className="border-gray-400 w-full md:w-[400px] lg:w-[560px] pr-10"
            placeholder={`Comment as ${
              user?.username
                ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
                : ""
            }...`}
            value={commentText}
            ref={inputRef}
            onChange={(e) => setCommentText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCommentSubmit();
            }}
          />

          <div className="absolute -bottom-1 right-1">
            <EmojiPickerButton
              onSelect={(emoji) =>
                insertEmoji({
                  emoji,
                  value: commentText,
                  setValue: setCommentText,
                })
              }
              emojiSize={"h-7 w-7"}
            />
          </div>
        </div>

        <Button
          className="cursor-pointer  hover:bg-gray-700 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
          onClick={handleCommentSubmit}
          disabled={loading}
        >
          {loading ? "Sending" : <Send />}
        </Button>
      </div>

      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-9999">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default CommentsShown;
