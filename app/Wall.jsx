"use client";
import { useEffect } from "react";
import WallCard from "./WallCard";
import PostTrigger from "./PostTrigger";
import PostTriggerPsuedo from "./PostTriggerPsuedo";
import StorySection from "./StorySection";
import { usePostStore } from "@/store/usePostStore";
import ScrollupBtn from "./ScrollupBtn";
import useT from "./hooks/useT";
import userStore from "@/store/userStore";

const Wall = () => {
  const { posts, fetchPost, hasMore } = usePostStore();
  const t = useT();
  const { user } = userStore();

  useEffect(() => {
    fetchPost();
  }, []);

  useEffect(() => {
    const ids = posts.map((p) => p._id);
    const duplicates = ids.filter((id, index) => ids.indexOf(id) !== index);
  }, [posts]);

  return (
    <div className="mb-20 dark:bg-[rgb(30,30,30)] p-2 md:max-w-1/2 gap-4">
      {user ? <PostTrigger /> : <PostTriggerPsuedo />}
      <StorySection />
      {posts?.map((post) => (
        <WallCard key={post?._id} post={post} />
      ))}
      {hasMore && (
        <button
          onClick={fetchPost}
          className="p-4 text-center bg-white dark:bg-[rgb(60,60,60)] rounded-md font-semibold w-full cursor-pointer hover:bg-gray-400
          dark:hover:bg-[rgb(70,70,70)] text-xl "
        >
          {t("showMore")}
        </button>
      )}

      <ScrollupBtn />
    </div>
  );
};

export default Wall;
