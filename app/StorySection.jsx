"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useStoryStore } from "@/store/useStoryStore";
import StoryCard from "./StoryCard";
import StoryTrigger from "./StoryTrigger";

const StorySection = () => {
  const { stories, fetchStories } = useStoryStore();

  const storyRef = useRef(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  useEffect(() => {
    fetchStories();
  }, [fetchStories]);

  useEffect(() => {
    const storyEl = storyRef.current;
    if (!storyEl) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = storyEl;

      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft + clientWidth < scrollWidth);
    };

    handleScroll(); // initial calculation
    storyEl.addEventListener("scroll", handleScroll);

    return () => {
      storyEl.removeEventListener("scroll", handleScroll);
    };
  }, [stories]);

  const scrollLeft = () => {
    storyRef.current?.scrollTo({
      left: 0,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    storyRef.current?.scrollBy({
      left: 240,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* LEFT ARROW */}
      {canScrollLeft && (
        <motion.button
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={scrollLeft}
          className="hidden md:flex absolute left-1 top-1/2 -translate-y-1/2 z-10 h-20 w-8 bg-black/80 text-white rounded 
          shadow-md hover:scale-110 items-center justify-center cursor-pointer hover:bg-black -translate-x-1/2"
        >
          ◀
        </motion.button>
      )}

      {/* STORY SCROLL CONTAINER */}
      <div
        ref={storyRef}
        className="flex overflow-x-hidden scrollbar-hide snap-x snap-mandatory
          space-x-2 pt-2 pb-4"
      >
        <div className="snap-start shrink-0">
          <StoryTrigger />
        </div>

        {stories?.map((story) => (
          <div key={story._id} className="snap-start shrink-0">
            <StoryCard story={story} />
          </div>
        ))}
      </div>

      {/* RIGHT ARROW */}
      {canScrollRight && (
        <motion.button
          initial={{ y: -500, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          onClick={scrollRight}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10h-20 w-8 bg-black/80 text-white rounded h-20
          shadow-md hover:scale-110 items-center justify-center cursor-pointer hover:bg-black translate-x-1/2"
        >
          ▶
        </motion.button>
      )}
    </div>
  );
};

export default StorySection;
