"use client";
import { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

const StorySectionChat = ({ storyPostsData }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [maxScroll, setMaxScroll] = useState(0);
  const containerRef = useRef();

  const scrollLeft = () => {
    const container = document.getElementById("story-scroll");
    container.scrollBy({ left: -200, behavior: "smooth" });
  };

  const scrollRight = () => {
    const container = document.getElementById("story-scroll");
    container.scrollBy({ left: 200, behavior: "smooth" });
  };

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
    <div className="relative w-full">
      {/* Navigation Buttons – visible only on desktop */}
      <button
        onClick={() => scrollLeft()}
        className="hidden lg:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
      >
        ◀
      </button>

      <div
        id="story-scroll"
        className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory space-x-4 px-4 py-2"
      >
        {Array.from({ length: 10 }).map((_, idx) => (
          <div
            key={idx}
            className="min-w-[120px] h-[180px] bg-blue-500 text-white flex items-center justify-center rounded-lg snap-start shrink-0"
          >
            Story {idx + 1}
          </div>
        ))}
      </div>

      <button
        onClick={() => scrollRight()}
        className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
};

export default StorySectionChat;
