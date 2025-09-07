"use client";
import { useState, useRef, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import userStore from "@/store/userStore";
import WallCardButtons from "./WallCardButtons";
import { formateDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import Spinner from "./Spinner";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { usePostStore } from "@/store/usePostStore";
import AutoLoopVideo from "./AutoLoopVideo";
import PostContentEdit from "./PostContentEdit";

const WallCard = ({ post, onLike, onShare, onComment }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { deleteUserPost, fetchPost } = usePostStore();
  const commentInputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const [readyTodel, setReadyTodel] = useState(false);
  const { user } = userStore();
  const params = useParams();
  const id = params.id;
  const router = useRouter();

  const handleDpClick = () => {
    startTransition(() => {
      if (post?.user?._id) {
        router.push(`/user-profile/${post?.user?._id}`);
      }
    });
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

  const handlePostDelete = async () => {
    setShowDeleteModal(false);
    startTransition(async () => {
      if (post?._id) {
        try {
          await deleteUserPost(post._id);
          await fetchPost();
        } catch (err) {
          console.error("Delete failed", err);
        }
      }
    });
  };

  return (
    <motion.div
      key={post._id}
      initial={{ opacity: 0, height: 0, rotate: -5 }}
      animate={{ opacity: 1, height: "auto", rotate: readyTodel ? -5 : 0 }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={` ${
        readyTodel ? "bg-[rgb(255,200,200)]" : "bg-white"
      } dark:bg-[rgb(55,55,55)] dark:shadow-black rounded-lg
    shadow-gray-400 dark:text-gray-300 shadow-lg dark:border-gray-500 
    overflow-hidden mb-6`}
    >
      {/* --------------------------Post Header (User information)-------------------------- */}
      <div
        className="flex items-center justify-between p-2 dark:bg-[rgb(55,55,55)]
       rounded-t-lg border-b"
      >
        <div className="flex items-center ">
          <div
            className="relative mx-auto my-auto overflow-hidden rounded p-1"
            onClick={handleDpClick}
          >
            <Avatar className="cursor-pointer h-10 w-10 mr-3 hover:ring-2 ring-gray-500">
              <AvatarImage
                src={post?.user?.profilePicture}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-400 dark:bg-black capitalize">
                {post?.user?.username
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <div>
            <div
              className="lg:w-70 md:w-50 truncate w-40 cursor-pointer 
          overflow-hidden hover:underline capitalize font-[450]"
              onClick={handleDpClick}
            >
              By {user?._id === post?.user?._id ? "you" : post?.user.username}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-500">
              {formateDate(post?.createdAt)}
            </div>
          </div>
        </div>
        <div className="flex">
          {user?._id === post?.user?._id && (
            <button
              onClick={() => {
                setShowDeleteModal(true);
                setReadyTodel(true);
              }}
              className="dark:bg-black/20 cursor-pointer pt-0.5 px-2 group
               rounded border border-gray-400 bg-gray-100 
              flex flex-col items-center justify-center hover:border-red-600"
            >
              {" "}
              <span
                className="text-[10px] capitalize truncate max-w-10
              group-hover:dark:text-red-500 group-hover:text-red-700"
              >
                {post?.user?.username.split(" ")[0]}
              </span>
              <Trash2
                className="h-5 w-6 group-hover:text-red-700 text-gray-600
                 dark:text-gray-300 group-hover:dark:text-red-500"
              />
              <span
                className="text-[10px] group-hover:text-red-700
               group-hover:dark:text-red-500"
              >
                Delete?
              </span>
            </button>
          )}
        </div>
      </div>

      {/* --------------------------Actual post content----------------------- */}
      {user?._id !== post?.user?._id ? (
        <p className="font-[450] p-4">{post?.content}</p>
      ) : (
        <div className="p-2">
          <PostContentEdit postId={post._id} initialContent={post.content} />
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
        <AutoLoopVideo src={post?.mediaUrl} />
      )}
      {/* --------------------Delete Confirmation Modal------------------- */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl">
              Delete this post {user?.username.split(" ")[0]}?
            </h2>
            <p className="text-sm dark:text-gray-300 text-center my-2">
              This cannot be recovered.
            </p>

            <div className="flex justify-center gap-4 mt-6">
              <button
                onClick={() => {
                  setShowDeleteModal(false);
                  setReadyTodel(false);
                }}
                className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer
                    dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
              cursor-pointer text-white text-sm"
                onClick={handlePostDelete}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </motion.div>
      )}

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
      <WallCardButtons
        onLike={onLike}
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
        onComment={onComment}
        commentInputRef={commentInputRef}
        handleShare={handleShare}
        handleDpClick={handleDpClick}
        post={post}
      />
    </motion.div>
  );
};

export default WallCard;
