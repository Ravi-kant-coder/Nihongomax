import { ChevronDown, ChevronUp, Send } from "lucide-react";
import { useState, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import userStore from "@/store/userStore";
import { Input } from "@/components/ui/input";
import { formateDate } from "@/lib/utils";
import { useRouter } from "next/navigation";
import CommentEdit from "./CommentEdit";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./Spinner";
import { usePostStore } from "@/store/usePostStore";

const CommentsShown = ({ post, onComment, commentInputRef }) => {
  const [showAllComments, setShowAllComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const { user } = userStore();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const { fetchPost } = usePostStore();

  const visibleComments = showAllComments
    ? post?.comments
    : post?.comments?.slice(0, 2);

  const handleCommentSubmit = async () => {
    if (commentText.trim()) {
      onComment({ text: commentText });
      setCommentText("");
    }
    fetchPost();
  };

  return (
    <>
      {visibleComments.length > 0 && (
        <h3 className="font-semibold ml-4 flex">
          Comments&nbsp;
          <p className="font-normal text-gray-500">
            (Total {post?.comments?.length})
          </p>
        </h3>
      )}
      <div className="max-h-100 overflow-y-auto">
        <AnimatePresence>
          {visibleComments?.map((comment) => (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              key={comment._id}
              className={`flex items-start space-x-2 m-4 rounded-md p-2 bg-gray-200
               dark:bg-[rgb(45,45,45)] text-sm`}
            >
              <Avatar
                className={`w-8 h-8 ${
                  comment?.user?._id !== user?._id && "cursor-pointer"
                }`}
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
                  {comment?.user?.username?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col w-full">
                <div className="">
                  <p>
                    {user?._id === comment?.user?._id ? (
                      <span className="font-semibold dark:font-normal text-xs">
                        You
                      </span>
                    ) : (
                      <span
                        onClick={() => {
                          startTransition(() => {
                            if (comment?.user?._id) {
                              router.push(
                                `/user-profile/${comment?.user?._id}`
                              );
                            }
                          });
                        }}
                        className="font-semibold dark:font-normal text-xs capitalize 
                        hover:underline cursor-pointer"
                      >
                        {comment?.user?.username}
                        {console.log(comment?.user?.username)}
                      </span>
                    )}
                  </p>
                  <div className="text-gray-600 dark:text-gray-400 text-xs normal-case">
                    {formateDate(comment?.createdAt)}
                  </div>
                  {user?._id !== comment?.user?._id ? (
                    <p className="text-md font-semibold">{comment?.text}</p>
                  ) : (
                    <CommentEdit
                      post={post}
                      comment={comment}
                      postId={post._id}
                      commentId={comment?._id}
                      initialComment={comment?.text}
                    />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

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
                Show Less Comments <ChevronUp className="ml-1 h-4 w-4" />
              </motion.button>
            ) : (
              <motion.button
                initial={{ y: -500, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="bg-black/20 rounded shadow-md items-center justify-center
                 cursor-pointer flex text-sm w-full ml-4 p-2 relative hover:bg-gray-400
                 dark:hover:bg-gray-800"
              >
                Show More Comments <ChevronDown className="ml-1 h-4 w-4" />
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
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
        dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default CommentsShown;
