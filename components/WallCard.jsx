"use client";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import CommentEdit from "./CommentEdit";
import ShownComments from "./ShownComments";
import CommentsBtnPanel from "./CommentsBtnPanel";
// import userStore from "@/store/userStore";
// import { formatDate } from "date-fns";
// import { comment } from "postcss";

const initialComment =
  "Hi, My name is Sangeeta Verma rem ipsum dolor sit amet consectetur adipisicing elit. Repellendus natus unde repudia?and This is my question どこに行かれる度に上がってしまう。What will be the translation please answer";

const WallCard = ({
  post,
  isLiked,
  onShare,
  onComment,
  onLike,
  userDataObj,
}) => {
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  // const { user } = userStore();

  const handleCommentClick = () => {
    setShowComments(true);
    setTimeout(() => {
      commentInputRef?.current?.focus();
    }, 1000);
  };
  // const userPlaceholder = user?.username
  //   ?.split(" ")
  //   .map((name) => name[0])
  //   .join("");

  const generateSharedLink = () => {
    return `http://localhost:3000/${userDataObj?._id}`;
  };
  const handleShare = (platform) => {
    const url = generateSharedLink();
    let shareUrl;
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=}`;
        break;
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=}`;
        break;
      case "linkedin":
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=}`;
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
  const commentInputRef = useRef(null);
  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 1000, duration: 5 }}
      className="bg-white dark:shadow-[rgb(20,20,20)] shadow-gray-400 dark:bg-[rgb(25,25,25)] rounded-md dark:text-gray-300 shadow-lg dark:border-gray-500 overflow-hidden mb-4"
    >
      <div className="flex items-center justify-between p-2 bg-accent dark:bg-[rgb(25,25,25)] rounded-t-lg">
        <div className="flex items-center">
          <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
            <Avatar className="cursor-pointer h-10 w-10  mr-3 hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100">
              <AvatarImage
                src={userDataObj?.mediaURL}
                className="object-cover"
              />
              <AvatarFallback className="bg-gray-400 dark:bg-gray-500">
                {userDataObj?.user.username.charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </div>
          <div className=" cursor-pointer font-semibold hover:underline">
            <p>{userDataObj?.user.username}</p>
          </div>
        </div>
        <div className="flex items-center text-gray-800 mr-4">
          <span className="text-sm text-gray-800 dark:text-white">
            {`Date of the post`}
          </span>
        </div>
      </div>
      <div className="dark:bg-[rgb(50,50,50)] p-2 py-4 font-lg text-lg bg-gray-200">
        <CommentEdit initialComment={initialComment} />
      </div>
      <div>
        <img
          src={userDataObj?.mediaURL}
          className="w-full"
          alt={"Image is not Available"}
        />
      </div>
      <CommentsBtnPanel
        isLiked={isLiked}
        onLike={onLike}
        isShareDialogOpen={isShareDialogOpen}
        setIsShareDialogOpen={setIsShareDialogOpen}
        userDataObj={userDataObj}
        setShowComments={setShowComments}
        showComments={showComments}
        handleCommentClick={handleCommentClick}
        commentInputRef={commentInputRef}
      />
      <ShownComments
        showComments={showComments}
        setShowComments={setShowComments}
        userDataObj={userDataObj}
        commentText={commentText}
        setCommentText={setCommentText}
        commentInputRef={commentInputRef}
      />
    </motion.div>
  );
};

export default WallCard;
