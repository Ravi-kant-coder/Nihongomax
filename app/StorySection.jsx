"use client";
import { useEffect, useRef, useState } from "react";
import StoryCard from "../app/StoryCard";
import { motion } from "framer-motion";

const StorySection = ({ storyPostsData }) => {
  const [showLeft, setShowLeft] = useState(false);
  const storyRef = useRef(null);

  useEffect(() => {
    const storyEl = storyRef.current;

    const handleScroll = () => {
      if (storyEl) {
        setShowLeft(storyEl.scrollLeft > 10); // show if slightly scrolled
      }
    };

    if (storyEl) {
      storyEl.addEventListener("scroll", handleScroll);
    }

    // Run on load
    handleScroll();

    return () => {
      if (storyEl) {
        storyEl.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const scrollLeft = () => {
    storyRef.current?.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    storyRef.current?.scrollBy({ left: 200, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Left Scroll Button - Only visible when needed */}
      {showLeft && (
        <motion.button
          onClick={scrollLeft}
          className="hidden lg:flex absolute left-1 top-1/2 -translate-y-1/2 z-10
               h-20 w-6 bg-black/80 text-white rounded shadow-md hover:scale-110  
               transition-all items-center justify-center cursor-pointer hover:bg-black"
        >
          ◀
        </motion.button>
      )}

      {/* Story container */}
      <div
        ref={storyRef}
        className="
          flex 
          overflow-x-auto 
          lg:overflow-x-hidden 
          scrollbar-hide 
          snap-x 
          snap-mandatory 
          space-x-2
          pt-2"
        id="story-scroll"
      >
        <StoryCard isAddStory={true} />
        {storyPostsData?.map((storyData) => (
          <StoryCard key={storyData._id} storyData={storyData} />
        ))}
      </div>

      {/* Right Scroll Button – always shown, or can also be conditional */}
      <button
        onClick={scrollRight}
        className="hidden lg:flex absolute right-1 top-1/2 -translate-y-1/2 z-10
             h-20 w-6 bg-black/80 text-white rounded shadow-md hover:bg-black 
             hover:scale-110 hover:shadow-lg transition-all items-center 
             justify-center cursor-pointer"
      >
        ▶
      </button>
    </div>
  );
};
export default StorySection;
