"use client";
import React, { useEffect, useState } from "react";
import WallCard from "./WallCard";
import PostTrigger from "./PostTrigger";
import StorySection from "./StorySection";
import { usePostStore } from "@/store/usePostStore";
import toast from "react-hot-toast";

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
      {posts?.map((post) => (
        <WallCard
          key={post._id}
          post={post}
          isLiked={likePosts.has(post?._id)}
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
      ))}
    </div>
  );
};

export default Wall;
