"use client";
import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, CornerUpRight, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CommentsShown from "./CommentsShown";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import useT from "./hooks/useT";

const WallCardButtons = ({ post }) => {
  const [commentInputs, setCommentInputs] = useState({});
  const { user } = userStore();
  const [likeEffect, setLikeEffect] = useState(false);
  const [saveEffect, setSaveEffect] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const { handleLikePost, handleSavePost, fetchPost } = usePostStore();
  const t = useT();
  const allLikes = post?.likes || [];
  const visibleLikes = [...allLikes].slice(-3).reverse();
  const remainingLikes = allLikes.length > 3 ? allLikes.length - 3 : 0;

  useEffect(() => {
    if (likeEffect) {
      const timeout = setTimeout(() => setLikeEffect(false), 1800);
      return () => clearTimeout(timeout);
    }
  }, [likeEffect]);

  useEffect(() => {
    if (saveEffect) {
      const timeout = setTimeout(() => setSaveEffect(false), 1800);
      return () => clearTimeout(timeout);
    }
  }, [saveEffect]);

  return (
    <div className="flex flex-col justify-center p-2 items-center dark:bg-[rgb(55,55,55)]">
      <div className="w-full text-sm flex justify-between items-center dark:text-gray-400 text-gray-700 md:px-8 mb-4">
        {allLikes.length === 0 ? (
          <p>
            0 <span>{t("likes")}</span>
          </p>
        ) : (
          allLikes.length > 0 && (
            <div className="items-center gap-1 text-sm whitespace-nowrap">
              <div className="flex flex-wrap items-center gap-x-1">
                <Heart
                  className="opacity-70 h-4 w-4"
                  fill={"red"}
                  color={"red"}
                />
                {visibleLikes.map((user, index) => (
                  <span
                    key={user?._id}
                    className="flex items-center gap-[2px] max-w-18"
                  >
                    <Avatar className="w-4 h-4">
                      <AvatarImage src={user?.profilePicture} />
                      <AvatarFallback>
                        {user?.username?.charAt(0)?.toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="capitalize">
                      {user?.username?.split(" ")[0]}
                      {index < visibleLikes.length - 1 && ", "}
                    </span>
                  </span>
                ))}
                {remainingLikes > 0 && (
                  <span className="ml-[2px]">+{remainingLikes} more</span>
                )}
              </div>
            </div>
          )
        )}
        <span
          className="border-gray-400 cursor-pointer "
          onClick={() => setShowComments(!showComments)}
        >
          {post?.comments?.length}{" "}
          {post?.comments?.length === 1 ? (
            <span>{t("comment")}</span>
          ) : (
            <span>{t("comments")}</span>
          )}
        </span>
      </div>
      <div className="flex justify-between w-full md:w-[90%] items-center text-gray-600 pb-6">
        <div className="relative group">
          <Button
            variant="ghost"
            disabled={post?.isLiked}
            className={`hover:bg-red-200 hover:text-red-600 cursor-pointer border disabled:opacity-80
               border-gray-300 dark:border-gray-500 dark:hover:bg-black
              ${
                post?.isLiked
                  ? "text-red-500 border-red-300 dark:border-red-800 hover:bg-white cursor-auto"
                  : "dark:text-gray-300"
              }`}
            onClick={() => {
              if (post?.isLiked) return;
              handleLikePost(post?._id, user);
              setLikeEffect(true);
            }}
          >
            <span>
              {post?.isLiked ? (
                <span>{t("liked")}</span>
              ) : (
                <span>{t("like")}</span>
              )}
            </span>
            <Heart
              className=" h-4 w-4 heart-beat"
              fill={post?.isLiked ? "red" : "none"}
              color={post?.isLiked ? "red" : "currentColor"}
            />
          </Button>
          <AnimatePresence>
            {likeEffect && (
              <motion.div
                className="absolute -top-4 left-2 text-sm dark:bg-[rgb(92,30,30)]
                 text-red-600 dark:text-red-300  bg-pink-100 rounded-lg shadow-2xl p-2"
                initial={{ opacity: 0, y: 0, rotate: 10 }}
                animate={{ opacity: 1, y: -20, rotate: -10 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="capitalize">
                  <p>{t("thanks")}</p> <p>{user?.username.split(" ")[0]}!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        <Button
          variant="ghost"
          onClick={() => setShowComments(!showComments)}
          className=" hover:bg-gray-300 cursor-pointer border flex items-center
           dark:hover:bg-background dark:text-gray-300 border-gray-300 dark:border-gray-500"
        >
          <span>{t("comment")}</span>
          <MessageCircle className="md:ml-1 h-4 w-4" />
        </Button>
        <div className="relative group">
          <Button
            variant="ghost"
            disabled={post?.isSaved}
            className={`" hover:bg-gray-300 cursor-pointer border flex items-center disabled:opacity-50
           dark:hover:bg-background dark:text-gray-300 border-gray-300 dark:border-gray-500"  ${
             post?.isSaved
               ? "text-green-700 border-green-500 dark:border-green-800 hover:bg-white cursor-auto"
               : "dark:text-gray-300"
           }`}
            onClick={() => {
              if (post?.isSaved) return;
              handleSavePost(post?._id, user);
              setSaveEffect(true);
            }}
          >
            <span>
              {post?.isSaved ? (
                <span>{t("saved")}</span>
              ) : (
                <span>{t("save")}</span>
              )}
            </span>
            {post?.isSaved ? (
              <Check className="h-4 w-4 " />
            ) : (
              <CornerUpRight className="md:ml-1 h-4 w-4" />
            )}
          </Button>
          <AnimatePresence>
            {saveEffect && (
              <motion.div
                className="absolute -top-4 left-2 text-sm dark:bg-gray-500 text-green-700 dark:text-gray-300  bg-green-100 rounded-lg shadow-2xl p-2"
                initial={{ opacity: 0, y: 0, rotate: 10 }}
                animate={{ opacity: 1, y: -20, rotate: -10 }}
                exit={{ opacity: 0, y: -60 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              >
                <div className="capitalize">
                  <p>{t("saved")}</p> <p>{user?.username.split(" ")[0]}!</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <AnimatePresence>
        {showComments && (
          <motion.div
            className="w-full mb-2 dark:bg-[rgb(55,55,55)]"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CommentsShown
              post={post}
              commentText={commentInputs[post._id] || ""}
              setCommentText={(text) =>
                setCommentInputs((prev) => ({
                  ...prev,
                  [post._id]: text,
                }))
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WallCardButtons;
