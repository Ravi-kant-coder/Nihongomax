"use client";
import { useState, useEffect } from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Heart, MessageCircle, CornerUpRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import CommentsShown from "./CommentsShown";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";

const WallCardButtons = ({ commentInputRef, post, onComment }) => {
  const { user } = userStore();
  const [likeEffect, setLikeEffect] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const { handleLikePost } = usePostStore();

  const likedUsernames = [...(post?.likes || [])].reverse();
  const visibleLikes = likedUsernames.slice(0, 3);
  const remainingLikes =
    likedUsernames.length > 3 ? likedUsernames.length - 3 : 0;

  useEffect(() => {
    if (likeEffect) {
      const timeout = setTimeout(() => setLikeEffect(false), 1800);
      return () => clearTimeout(timeout);
    }
  }, [likeEffect]);

  return (
    <div className="flex flex-col justify-center p-2 items-center dark:bg-[rgb(55,55,55)]">
      <div className="w-full text-sm flex justify-between items-center dark:text-gray-400 text-gray-700 md:px-8 mb-4">
        {likedUsernames.length === 0 ? (
          <p>0 Likes</p>
        ) : (
          likedUsernames.length > 0 && (
            <div className="items-center gap-1 text-sm whitespace-nowrap">
              <div className="flex flex-wrap items-center gap-x-1">
                <Heart
                  className="opacity-70 h-4 w-4"
                  fill={"red"}
                  color={"red"}
                />
                By&nbsp;
                {visibleLikes.map((user, index) => (
                  <span
                    key={user?._id}
                    className="flex items-center gap-[2px] max-w-16 bg-white truncate"
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
          {post?.commentCount}{" "}
          {post?.commentCount === 1 ? "comment" : "comments"}
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
                  ? "text-red-500 border-red-200 dark:border-red-900 hover:bg-white cursor-auto"
                  : ""
              } dark:text-gray-300`}
            onClick={() => {
              if (post?.isLiked) return;
              handleLikePost(post?._id, user);
              setLikeEffect(true);
            }}
          >
            <span>{post?.isLiked ? "Liked" : "Like"}</span>
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
                <span className="flex items-center gap-1 capitalize">
                  THANKS {user?.username.split(" ")[0]}!
                </span>
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
          <span>Comment</span>
          <MessageCircle className="md:ml-1 h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          className=" hover:bg-gray-300 cursor-pointer border flex items-center
           dark:hover:bg-background dark:text-gray-300 border-gray-300 dark:border-gray-500"
        >
          <span>Save</span>
          <CornerUpRight className="md:ml-1 h-4 w-4" />
        </Button>
      </div>
      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CommentsShown
              post={post}
              onComment={onComment}
              commentInputRef={commentInputRef}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WallCardButtons;
