"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReplyEdit from "./ReplyEdit";
import { Input } from "@/components/ui/input";
import userStore from "@/store/userStore";
import { comment } from "postcss";
import { formateDate } from "@/lib/utils";

const ShownComments = ({ showComments, commentInputRef, post, onComment }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user } = userStore();

  const visibleComments = showAllComments
    ? post?.comments
    : post?.comments?.slice(0, 2);

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      onComment({ text: commentText });
      setCommentText("");
    }
  };

  return (
    <>
      {showComments && (
        <div>
          <h3 className="font-semibold dark:text-white m-2">Comments</h3>
          <div
            className="max-w-full m-2 dark:bg-[rgb(45,45,45)] text-sm bg-gray-200
             rounded-md p-2"
          >
            <div className="flex items-center">
              <div className="overflow-hidden rounded">
                <Avatar className="cursor-pointer h-8 w-8 mr-3 dark:text-white ">
                  <AvatarImage
                    src={user?.profilePicture}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-500">
                    {user.username[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="cursor-pointer hover:underline">
                <p>{user.username.split(" ")[0]} replied...</p>
              </div>
            </div>
            <p>
              <ReplyEdit />
            </p>
          </div>

          <div className="flex items-center p-2 mb-2">
            <Avatar className="h-10 w-10 rounded mr-3">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-500">
                {user.username[0]}
              </AvatarFallback>
            </Avatar>
            <Input
              className="flex-1 mr-2 dark:border-gray-100 border-gray-400"
              placeholder={`Reply as ${user.username.split(" ")[0]}...`}
              value={commentText}
              ref={commentInputRef}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
            />
            <Button
              className="cursor-pointer bg-gray-700 hover:bg-black dark:bg-gray-600
               dark:text-white dark:hover:bg-gray-700"
              onClick={handleCommentSubmit}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default ShownComments;
