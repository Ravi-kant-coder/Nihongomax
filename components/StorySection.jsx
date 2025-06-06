"use client";
import { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StorySection = ({ storyPostsData }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const updateMaxScroll = () => {
        setMaxScroll(container.scrollWidth - container.offsetWidth);
        setScrollPosition(container.scrollLeft);
      };
      updateMaxScroll();
      window.addEventListener("resize", updateMaxScroll);
      return () => window.removeEventListener("resize", updateMaxScroll);
    }
  }, [storyPostsData]);

  const scroll = (direction) => {
    const container = containerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -255 : 255;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const handleScroll = () => {
    const container = containerRef.current;
    if (container) {
      setScrollPosition(container.scrollLeft);
    }
  };
  return (
    <div className="relative overflow-x-auto snap-x snap-mandatory">
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-hidden space-x-2 py-2"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <motion.div
          className="flex space-x-2"
          drag="x"
          dragConstraints={{
            right: 0,
            left:
              -((storyPostsData.length + 1) * 200) +
              containerRef.current?.offsetWidth,
          }}
        >
          <StoryCard isAddStory={true} />
          {storyPostsData?.map((storyData) => (
            <StoryCard key={storyData._id} storyData={storyData} />
          ))}
        </motion.div>

        {/* Left scroll button */}
        {scrollPosition > 0 && (
          <Button
            variant="outline"
            size="icon"
            className="absolute hidden lg:flex cursor-pointer left-2 top-1/2 transform -translate-y-1/2 bg-gray-400 dark:bg-[rgb(15,15,15)] hover:dark:bg-[rgb(35,35,35)] rounded-full shadow-lg transition-opacity duration-300 ease-in-out dark:border-1 dark:border-white"
            onClick={() => scroll("left")}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}

        {/* Right scroll button */}
        {scrollPosition < maxScroll && (
          <Button
            variant="outline"
            size="icon"
            className="absolute hidden lg:flex cursor-pointer right-2 top-1/2 transform -translate-y-1/2 bg-gray-400 rounded-full shadow-lg dark:bg-[rgb(15,15,15)] hover:dark:bg-[rgb(35,35,35)] transition-opacity duration-300 ease-in-out dark:border-1 dark:border-white"
            onClick={() => scroll("right")}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default StorySection;
