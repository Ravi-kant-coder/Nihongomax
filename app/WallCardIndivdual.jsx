"use client";
import { useState, useRef, useTransition, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentEdit from "./CommentEdit";
import ShownComments from "./ShownComments";
import WallCardButtons from "./WallCardButtons";
import { formateDate } from "@/lib/utils";
import { useParams } from "next/navigation";
import Spinner from "./Spinner";

const WallCard = ({ post, isLiked, onShare, onComment, onLike }) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const commentInputRef = useRef(null);
  const [isPending, startTransition] = useTransition();
  const params = useParams();
  const id = params.id;

  const handleCommentClick = () => {
    setShowComments(true);
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
      className="bg-white dark:bg-[rgb(25,25,25)] dark:shadow-[rgb(20,20,20)] 
    shadow-gray-400 rounded-md dark:text-gray-300 shadow-lg dark:border-gray-500 
    overflow-hidden mb-4"
    >
      <div
        className="flex items-center justify-between lg:p-2 bg-accent 
      dark:bg-[rgb(25,25,25)] rounded-t-lg"
      >
        <div className="flex items-center">
          <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
            <Avatar className="cursor-pointer h-10 w-10  mr-3">
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
          <div className="w-40 cursor-pointer font-semibold hover:underline">
            <p className="truncate">By {post?.user.username}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-800 mr-4">
          <span className="text-sm text-gray-800 dark:text-white">
            {formateDate(post?.createdAt)}
          </span>
        </div>
      </div>
      <div className="p-2">
        <CommentEdit />
      </div>
      <p className="mb-4 p-2">{post?.content}</p>
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
        isLiked={isLiked}
        onLike={onLike}
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
        setShowComments={setShowComments}
        showComments={showComments}
        handleCommentClick={handleCommentClick}
        commentInputRef={commentInputRef}
        handleShare={handleShare}
        post={post}
      />

      <ShownComments
        showComments={showComments}
        setShowComments={setShowComments}
        commentText={commentText}
        setCommentText={setCommentText}
        commentInputRef={commentInputRef}
      />
    </div>
  );
};

export default WallCard;
