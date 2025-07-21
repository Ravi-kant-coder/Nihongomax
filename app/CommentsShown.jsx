import { ChevronDown, ChevronUp, Send } from "lucide-react";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { formateDate } from "@/lib/utils";
import ReplyEdit from "./ReplyEdit";

const CommentsShown = ({ post, onComment, commentInputRef }) => {
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
  const handleReplyEdit = (commentId, newText) => {
    const updatedComments = post.comments.map((comment) =>
      comment._id === commentId ? { ...comment, text: newText } : comment
    );
    onComment({ comments: updatedComments });
  };

  return (
    <>
      {visibleComments.length > 0 && (
        <h3 className="font-semibold ml-4">Comments</h3>
      )}
      <div className="max-h-100 overflow-y-auto">
        {visibleComments?.map((comment, index) => (
          <div
            key={index}
            className="flex items-start space-x-2 m-4 rounded-md p-2
               dark:bg-[rgb(45,45,45)] text-sm bg-gray-300 "
          >
            <Avatar className="w-8 h-8">
              {comment?.user?.profilePicture ? (
                <AvatarImage
                  src={comment?.user?.profilePicture}
                  alt={comment?.user?.username}
                />
              ) : (
                <AvatarFallback className="dark:bg-gray-800 bg-gray-400 capitalize">
                  {user?.username.charAt(0).toUpperCase()}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="flex flex-col">
              <div className="">
                <p className="font-semibold text-sm">
                  {comment?.user?.username}
                </p>
                <p className="text-sm">{comment?.text}</p>
              </div>
              <div
                className="flex items-center justify-between w-100 mt-2 text-xs 
                text-gray-400"
              >
                <button
                  className="text-gray-600 hover:text-gray-800 hover:underline"
                  onClick={() => handleReplyEdit(comment._id, comment.text)}
                >
                  Edit
                </button>
                <ReplyEdit
                  initialReply={comment?.text}
                  onSave={(newText) => handleReplyEdit(comment._id, newText)}
                  className="ml-2"
                />
                <span className="mr-2 text-gray-600">
                  {formateDate(comment?.createdAt)}
                </span>
              </div>
            </div>
          </div>
        ))}
        {post?.comments?.length > 2 && (
          <div
            className="w-60 my-2 p-2 dark:text-gray-300 cursor-pointer hover:underline"
            onClick={() => setShowAllComments(!showAllComments)}
          >
            {showAllComments ? (
              <p className="flex items-center text-sm w-full">
                Show Less Comments
                <ChevronUp className="ml-1 h-4 w-4" />
              </p>
            ) : (
              <p className="flex items-center text-sm w-full">
                Show More Comments <ChevronDown className="ml-1 h-4 w-4" />
              </p>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center px-4 p-2 mb-6">
        <Avatar className="h-8 w-8 rounded-full mr-3">
          <AvatarImage src={user?.profilePicture} />
          <AvatarFallback className="dark:bg-gray-800 bg-gray-400 capitalize">
            {user?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Input
          className="flex-1 mr-2 dark:border-gray-100 border-gray-400 lg:min-w-120
           md:min-w-100"
          placeholder={`Comment as ${
            user?.username
              ? user.username.charAt(0).toUpperCase() + user.username.slice(1)
              : ""
          }...`}
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
    </>
  );
};

export default CommentsShown;
