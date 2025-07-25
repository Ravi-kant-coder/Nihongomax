"use client";
import React, { useEffect, useState } from "react";
import WallCard from "./WallCard";
import PostTrigger from "./PostTrigger";
import StorySection from "./StorySection";
import { usePostStore } from "@/store/usePostStore";
import toast from "react-hot-toast";
import ScrollupBtn from "./ScrollupBtn";
import { AnimatePresence, motion } from "framer-motion";

const Wall = () => {
  const [isPostTriggerOpen, setIsPostTriggerOpen] = useState(false);
  const [likePosts, setLikePosts] = useState(new Set());

  const {
    posts,
    fetchPost,
    handleLikePost,
    handleCommentPost,
    handleSharePost,
  } = usePostStore();

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  useEffect(() => {
    const saveLikes = localStorage.getItem("likePosts");
    if (saveLikes) {
      setLikePosts(new Set(JSON.parse(saveLikes)));
    }
  }, []);

  const handleLike = async (postId) => {
    const updatedLikePost = new Set(likePosts);
    if (updatedLikePost.has(postId)) {
      updatedLikePost.delete(postId);
      toast.error("post disliked successfully");
    } else {
      updatedLikePost.add(postId);
      toast.success("post like successfully");
    }
    setLikePosts(updatedLikePost);
    localStorage.setItem(
      "likePosts",
      JSON.stringify(Array.from(updatedLikePost))
    );

    try {
      await handleLikePost(postId);
      await fetchPost();
    } catch (error) {
      console.error(error);
      toast.error("failed to like or unlike the post");
    }
  };

  return (
    <div className="md:px-10 md:p-1 mb-20">
      <PostTrigger
        isPostTriggerOpen={isPostTriggerOpen}
        setIsPostTriggerOpen={setIsPostTriggerOpen}
      />
      <StorySection />
      <AnimatePresence>
        {posts?.map((post) => (
          <motion.div
            key={post._id}
            initial={{ opacity: 0, height: 0, rotate: -5 }}
            animate={{ opacity: 1, height: "auto", rotate: 0 }}
            exit={{ opacity: 0, height: 0, rotate: 5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <WallCard
              post={post}
              onLike={() => handleLike(post?._id)}
              onComment={async (comment) => {
                await handleCommentPost(post?._id, comment.text);
                await fetchPost();
              }}
              onShare={async () => {
                await handleSharePost(post?._id);
                await fetchPost();
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>
      <ScrollupBtn />
    </div>
  );
};

export default Wall;
