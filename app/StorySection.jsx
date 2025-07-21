"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { usePostStore } from "@/store/usePostStore";
import StoryCard from "./StoryCard";

const StorySection = () => {
  const { story, fetchStoryPost } = usePostStore();
  const [showLeft, setShowLeft] = useState(false);
  const storyRef = useRef(null);

  useEffect(() => {
    fetchStoryPost();
  }, [fetchStoryPost]);

  useEffect(() => {
    const storyEl = storyRef.current;

    const handleScroll = () => {
      if (storyEl) {
        setShowLeft(storyEl.scrollLeft > 10);
      }
    };

    if (storyEl) {
      storyEl.addEventListener("scroll", handleScroll);
    }

    handleScroll();

    return () => {
      if (storyEl) {
        storyEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, [story]);

  const scrollLeft = () => {
    storyRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    storyRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {showLeft && (
        <motion.button
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={scrollLeft}
          className="hidden lg:flex absolute left-1 top-1/2 -translate-y-1/2 z-10
               h-20 w-8 bg-black/80 text-white rounded shadow-md hover:scale-110  
               items-center justify-center cursor-pointer hover:bg-black 
               -translate-x-1/2"
        >
          ◀
        </motion.button>
      )}

      {/* -----------------Story container------------------ */}
      <div
        ref={storyRef}
        className="flex overflow-x-auto md:overflow-x-hidden scrollbar-hide snap-x snap-mandatory 
          space-x-2 pt-2"
        id="story-scroll"
      >
        <StoryCard isAddStory={true} />
        {story?.map((story) => (
          <StoryCard key={story._id} story={story} />
        ))}
      </div>

      <button
        onClick={scrollRight}
        className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 z-10
             h-20 w-8 bg-black/80 text-white rounded shadow-md hover:bg-black 
             hover:scale-110 hover:shadow-lg transition-all items-center 
             justify-center cursor-pointer translate-x-1/2"
      >
        ▶
      </button>
    </div>
  );
};
export default StorySection;
