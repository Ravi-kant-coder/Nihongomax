"use client";
import { Heart, MessageCircle, CornerUpRight } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";
import { AnimatePresence, motion } from "framer-motion";
import CommentsShown from "./CommentsShown";

const WallCardButtons = ({
  onLike,
  isShareDialogOpen,
  setIsShareDialogOpen,
  onShare,
  commentInputRef,
  handleShare,
  post,
  onComment,
}) => {
  const { user } = userStore();
  const [likeEffect, setLikeEffect] = useState(false);
  const isLiked = post?.likes.includes(user?._id);
  const [showComments, setShowComments] = useState(true);

  useEffect(() => {
    if (likeEffect) {
      const timeout = setTimeout(() => setLikeEffect(false), 1800);
      return () => clearTimeout(timeout);
    }
  }, [likeEffect]);

  return (
    <div className="flex flex-col justify-center p-2 items-center dark:bg-[rgb(55,55,55)]">
      <div
        className="md:mb-5 mb-2 w-[90%] flex justify-between items-center text-sm
       dark:text-gray-400 text-gray-700"
      >
        <span className="text-sm border-gray-400 ">
          {post?.likeCount} {post?.likeCount === 1 ? "like" : "likes"}
        </span>
        <div className="flex md:gap-8 gap-2">
          <span
            className="text-sm border-gray-400 cursor-pointer "
            onClick={() => setShowComments(!showComments)}
          >
            {post?.commentCount}{" "}
            {post?.commentCount === 1 ? "comment" : "comments"}
          </span>
          <span className="text-sm border-gray-400">
            {post?.shareCount} {post?.shareCount === 1 ? "share" : "shares"}
          </span>
        </div>
      </div>
      <div className="flex justify-between w-full md:w-[90%] items-center text-gray-600 pb-6">
        <div className="relative">
          <Button
            variant="ghost"
            className={`hover:bg-red-200 hover:text-red-600 cursor-pointer border
               border-gray-300 dark:border-gray-500 dark:hover:bg-black
              ${
                isLiked
                  ? "text-red-500 border-red-200 dark:border-red-900 hover:bg-white cursor-auto"
                  : ""
              } dark:text-gray-300`}
            onClick={() => {
              if (isLiked) {
                return;
              }
              onLike();
              setLikeEffect(true);
            }}
          >
            <span>{isLiked ? "Liked" : "Like"}</span>
            <Heart
              className=" h-4 w-4 heart-beat"
              fill={isLiked ? "red" : "none"}
              color={isLiked ? "red" : "currentColor"}
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
        <Dialog open={isShareDialogOpen} onOpenChange={setIsShareDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              className="hover:bg-gray-300 cursor-pointer border flex items-center
               dark:hover:bg-background dark:text-gray-300 border-gray-300 
               dark:border-gray-500"
              onClick={onShare}
            >
              <span>Share</span>
              <CornerUpRight className="md:ml-1 h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Share This Post</DialogTitle>
              <DialogDescription className="text-gray-900 dark:text-gray-300">
                {user?.username}
              </DialogDescription>
            </DialogHeader>
            <div className="flex flex-col space-y-4 ">
              <Button
                className="cursor-pointer dark:bg-gray-500 dark:hover:bg-gray-600"
                onClick={() => handleShare("facebook")}
              >
                Share on Facebook
              </Button>
              <Button
                className="cursor-pointer dark:bg-gray-500 dark:hover:bg-gray-600"
                onClick={() => handleShare("twitter")}
              >
                Share on Twitter
              </Button>
              <Button
                className="cursor-pointer dark:bg-gray-500 dark:hover:bg-gray-600"
                onClick={() => handleShare("linkedin")}
              >
                Share on Linkedin
              </Button>
              <Button
                className="cursor-pointer dark:bg-gray-500 dark:hover:bg-gray-600"
                onClick={() => handleShare("copy")}
              >
                Copy Link
              </Button>
            </div>
          </DialogContent>
        </Dialog>
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
