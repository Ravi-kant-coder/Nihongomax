import React, { useRef, useState } from "react";
import WallCard from "@/app/WallCard";
// import PostComments from "@/app/posts/PostComments";
import { formateDate } from "@/lib/utils";
const storyPostsData = [
  {
    _id: 1,
    mediaURL: "/Horizontal1.jpg",
    mediaType: "image",
    user: {
      username: "Sangeeta Verma",
    },
  },
  {
    _id: 2,
    mediaURL: "/Girl.jpg",
    mediaType: "image",
    user: {
      username: "Ruby Bhatia",
    },
  },
  {
    _id: 3,
    mediaURL: "Horizontal2.jpg",
    mediaType: "image",
    user: {
      username: "Pramod Solanki",
    },
  },
  {
    _id: 4,
    mediaURL:
      "https://images.pexels.com/photos/29940495/pexels-photo-29940495/free-photo-of-elegant-fashion-editorial-portrait-in-london-studio.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaType: "image",
    user: {
      username: "Mansi Yadav",
    },
  },
  {
    _id: 5,
    mediaURL:
      "https://images.pexels.com/photos/30375728/pexels-photo-30375728/free-photo-of-elegant-black-and-white-wedding-portrait.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    mediaType: "image",
    user: {
      username: "Anchal Gupta",
    },
  },
  {
    _id: 6,
    mediaURL:
      "https://images.pexels.com/photos/31890680/pexels-photo-31890680/free-photo-of-woman-in-white-dress-surrounded-by-monstera-leaves.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Bhavna Sharma",
    },
  },
  {
    _id: 7,
    mediaURL:
      "https://images.pexels.com/photos/31649556/pexels-photo-31649556/free-photo-of-elegant-model-in-fashionable-black-attire.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Meenakshi Malhotra",
    },
  },
  {
    _id: 8,
    mediaURL:
      "https://images.pexels.com/photos/31649556/pexels-photo-31649556/free-photo-of-elegant-model-in-fashionable-black-attire.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
    mediaType: "image",
    user: {
      username: "Priya Wadhwa",
    },
  },
  {
    _id: 9,
    mediaURL:
      "https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=600",
    mediaType: "image",
    user: {
      username: "Krishna Gupta",
    },
  },
];
const PostsContent = ({ post, isLiked, onShare, onComment, onLike }) => {
  const [showComments, setShowComments] = useState(false);
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const commentInputRef = useRef(null);

  const userPlaceholder = post?.user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");

  const handleCommentClick = () => {
    setShowComments(true);
    setTimeout(() => {
      commentInputRef.current?.focus();
    }, 0);
  };

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
  return (
    <>
      {storyPostsData?.map((userDataObj) => (
        <WallCard key={userDataObj._id} userDataObj={userDataObj} />
      ))}
    </>
  );
};

export default PostsContent;
