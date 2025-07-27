import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { formateDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import CommentEdit from "./CommentEdit";

const CommentsShown = ({ post, onComment, commentInputRef }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

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
               dark:bg-[rgb(45,45,45)] text-sm "
          >
            <Avatar
              className="w-8 h-8"
              onClick={
                comment?.user?._id !== user?._id
                  ? () => {
                      startTransition(() => {
                        if (comment?.user?._id) {
                          router.push(`/user-profile/${comment?.user?._id}`);
                        }
                      });
                    }
                  : undefined
              }
            >
              <AvatarImage
                className={`hover:ring-2 hover:ring-gray-300 dark:hover:ring-gray-600
                  ${
                    comment?.user?._id !== user?._id &&
                    "hover:underline cursor-pointer"
                  }`}
                src={comment?.user?.profilePicture}
              />
              <AvatarFallback className="dark:bg-gray-800 bg-gray-400 capitalize">
                {user?.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col w-full">
              <div className="">
                <p
                  className={`font-semibold dark:font-normal text-xs capitalize 
                  ${
                    comment?.user?._id !== user?._id &&
                    "hover:underline cursor-pointer"
                  }`}
                  onClick={
                    comment?.user?._id !== user?._id
                      ? () => {
                          startTransition(() => {
                            if (comment?.user?._id) {
                              router.push(
                                `/user-profile/${comment?.user?._id}`
                              );
                            }
                          });
                        }
                      : undefined
                  }
                >
                  {user?._id === comment?.user?._id ? (
                    <span>you</span>
                  ) : (
                    comment?.user.username
                  )}{" "}
                </p>
                <div className="text-gray-600 dark:text-gray-400 text-xs normal-case">
                  {formateDate(comment?.createdAt)}
                </div>
                {user?._id !== comment?.user?._id ? (
                  <p className="text-md font-semibold">{comment?.text}</p>
                ) : (
                  <div className="">
                    <CommentEdit
                      commentId={comment._id}
                      postId={post._id}
                      initialComment={comment?.text}
                    />
                  </div>
                )}
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
              <p className="flex items-center text-sm w-full ml-4">
                Show Less Comments
                <ChevronUp className="ml-1 h-4 w-4" />
              </p>
            ) : (
              <p className="flex items-center text-sm w-full ml-4">
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
      {/* ------------------------Spinner-------------------------- */}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
                       dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity
                        duration-300 opacity-100"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default CommentsShown;
