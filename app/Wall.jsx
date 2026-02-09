"use client";
import React, { useEffect } from "react";
import WallCard from "./WallCard";
import PostTrigger from "./PostTrigger";
import StorySection from "./StorySection";
import { usePostStore } from "@/store/usePostStore";
import ScrollupBtn from "./ScrollupBtn";

const Wall = () => {
  const { posts, fetchPost, handleCommentPost } = usePostStore();

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return (
    <div className="mb-20 dark:bg-[rgb(30,30,30)] p-2 md:max-w-1/2 gap-4">
      <PostTrigger />
      <StorySection />
      {posts?.map((post) => (
        <WallCard
          key={post?._id}
          post={post}
          onComment={async (comment) => {
            await handleCommentPost(post?._id, comment?.text);
            await fetchPost();
          }}
        />
      ))}
      <ScrollupBtn />
    </div>
  );
};

export default Wall;
