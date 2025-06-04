import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import FbCard from "@/components/ExtraComps/FbCard";
// import PostComments from "@/app/posts/PostComments";
// import { formateDate } from '@/lib/utils';

const PostsContent = ({ post, isLiked, onShare, onComment, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const commentInputRef = useRef(null);

  // const userPlaceholder = post?.user?.username
  //   ?.split(" ")
  //   .map((name) => name[0])
  //   .join("");

  // const handleCommentClick = () => {
  //   setShowComments(true);
  //   setTimeout(() => {
  //     commentInputRef.current?.focus();
  //   }, 0);
  // };

  const generateSharedLink = () => {
    return `http://localhost:3000/${post?.id}`;
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
  const username = "Gurmeet Kaur Puniya";
  return (
    <motion.div
      key={post?._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <FbCard post={post} />
    </motion.div>
  );
};

export default PostsContent;
