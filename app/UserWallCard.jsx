"use client";
import { useState, useRef, useTransition, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userStore from "@/store/userStore";
import CommentEdit from "./CommentEdit";
import WallCardButtons from "./WallCardButtons";
import { formateDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import CommentsShown from "./CommentsShown";

const UserWallCard = ({ post, onLike, onShare, onComment }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const commentInputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const { user } = userStore();
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const generateSharedLink = () => {
    return `http://localhost:3000/${post?._id}`;
  };

  const handleShare = (platform) => {
    const url = generateSharedLink();
    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com`;
        break;
      case "copy":
        navigator.clipboard.writeText(url);
        setIsShareDialogOpen(false);
        return;
      default:
        return;
    }
    window.open(shareUrl, "_blank");
    setIsShareDialogOpen(false);
  };

  return (
    <div
      className="bg-white dark:bg-[rgb(55,55,55)] dark:shadow-black 
    shadow-gray-400 rounded-lg dark:text-gray-300 shadow-lg dark:border-gray-500 
    overflow-hidden mb-10"
    >
      <div
        className="flex items-center justify-between lg:p-2 bg-accent dark:bg-[rgb(55,55,55)]
       rounded-t-lg"
      >
        <div className="flex items-center">
          <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
            <Avatar className="h-10 w-10 mr-3">
              <AvatarImage
                src={post?.user?.profilePicture}
                alt={post?.user?.username}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-400 dark:bg-gray-500">
                {post?.user?.username
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="md:w-60 w-40 font-semibold flex">
            By {user?._id === post?.user?._id ? "You" : post?.user.username}
          </div>
        </div>
        <div className="flex">
          <div className="flex items-center text-gray-800 mr-4">
            <span className="text-sm text-gray-800 dark:text-white">
              {formateDate(post?.createdAt)}
            </span>
          </div>
          {user?._id === post?.user?._id && (
            <button
              onClick={() => setShowDeleteModal(true)}
              className="dark:bg-black/20 cursor-pointer pt-0.5 px-3 group
               rounded border border-gray-400 bg-gray-100 
              flex flex-col items-center justify-center hover:border-red-600"
            >
              <Trash2
                className="h-5 w-6 group-hover:text-red-700 text-gray-600 dark:text-gray-300
               group-hover:dark:text-red-500"
              />
              <span
                className="text-[10px] group-hover:text-red-700
               group-hover:dark:text-red-500"
              >
                Delete
              </span>
            </button>
          )}
        </div>
      </div>
      {user?._id !== post?.user?._id && (
        <p className="mb-4 p-2 dark:text-gray-300">{post?.content}</p>
      )}
      {user?._id === post?.user?._id && (
        <div className="p-2">
          <CommentEdit initialComment={post?.content} />
        </div>
      )}

      {post?.mediaUrl && post.mediaType === "image" && (
        <img
          src={post?.mediaUrl}
          alt="post_image"
          className="w-full h-auto mb-4"
        />
      )}
      {post?.mediaUrl && post.mediaType === "video" && (
        <video controls className="w-full h-[500px] rounded mb-4">
          <source src={post?.mediaUrl} type="video/mp4" />
          Your browser does not support video tag
        </video>
      )}
      {/* ---------------Delete Confirmation Modal------------ */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="text-center text-red-600 dark:text-white">
              Delete this post {user?.username.split(" ")[0]}?
            </h2>
            <p className="text-sm dark:text-gray-300 text-center my-2">
              This cannot be recovered.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                    dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
              cursor-pointer text-white text-sm"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* ---------------Spinner------------ */}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
                 dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity
                  duration-300 opacity-100"
        >
          <Spinner />
        </div>
      )}
      <WallCardButtons
        onLike={onLike}
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
        setShowComments={setShowComments}
        showComments={showComments}
        commentInputRef={commentInputRef}
        handleShare={handleShare}
        post={post}
      />
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

export default UserWallCard;
