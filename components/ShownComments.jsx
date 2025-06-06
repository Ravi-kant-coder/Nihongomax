"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import CommentEdit from "./CommentEdit";
import { Input } from "@/components/ui/input";

const ShownComments = ({
  showComments,
  userDataObj,
  commentText,
  setCommentText,
  commentInputRef,
}) => {
  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      onComment({ text: commentText });
      setCommentText("");
    }
  };
  const initialComment =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem dolores beatae nihil illum pariatur facere repellat temporibus officia eos suscipit!";
  return (
    <div>
      {showComments && (
        <>
          <div className="max-w-full m-2 dark:bg-[rgb(35,35,35)] text-sm bg-gray-300 dark:text-gray-300 text-md rounded-md p-2">
            {/* <VideoComments
              key={post?.comments?._id}
              comments={post?.comments}
            /> */}
            <div className="flex items-center">
              <div className="overflow-hidden rounded">
                <Avatar className="cursor-pointer h-8 w-8 mr-3 dark:text-white ">
                  <AvatarImage
                    src={userDataObj?.mediaURL}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-500">
                    {userDataObj?.user.username[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="cursor-pointer hover:underline">
                <p>{userDataObj?.user.username.split(" ")[0]} replied...</p>
              </div>
            </div>
            <p>
              <CommentEdit initialComment={initialComment} />
            </p>
          </div>

          <div className="max-w-full m-2 dark:bg-[rgb(35,35,35)] text-sm bg-gray-300 dark:text-gray-300 text-md rounded-md p-2">
            {/* <VideoComments
              key={post?.comments?._id}
              comments={post?.comments}
            /> */}
            <div className="flex items-center">
              <div className="overflow-hidden rounded ">
                <Avatar className="cursor-pointer h-8 w-8 mr-3 ">
                  <AvatarImage
                    src={userDataObj?.mediaURL}
                    className="object-cover"
                  />
                  <AvatarFallback className="bg-gray-500">
                    {userDataObj?.user.username[0]}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="cursor-pointer hover:underline">
                <p>{userDataObj?.user.username.split(" ")[0]} replied...</p>
              </div>
            </div>
            <p>
              This is second comment from another person with a long one but
              unless Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Repellendus natus unde repudia? Lorem ipsum dolor sit, amet
              consectetur adipisicing elit. Vel, odit voluptatibus cumque vitae
              aspernatur rem iste neque dolore? Ex nemo qui ullam deserunt vero
              debitis amet quos fugiat autem ea?
            </p>
          </div>
          <div className="flex items-center p-2 mb-2">
            <Avatar className="h-10 w-10 rounded mr-3">
              <AvatarImage />
              <AvatarFallback className="dark:bg-gray-500">
                {userDataObj?.user.username[0]}
              </AvatarFallback>
            </Avatar>
            <Input
              className="flex-1 mr-2 dark:border-gray-100 border-gray-400"
              placeholder={`Reply as ${
                userDataObj?.user.username.split(" ")[0]
              }...`}
              value={commentText}
              ref={commentInputRef}
              onChange={(e) => setCommentText(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCommentSubmit()}
            />
            <Button
              className="cursor-pointer bg-gray-700 hover:bg-black dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700"
              onClick={handleCommentSubmit}
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShownComments;
