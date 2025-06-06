"use client";
import { useEffect, useRef, useState } from "react";
import StoryCard from "./StoryCard";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function StorySection() {
  useEffect(() => {
    const scrollContainer = document.getElementById("story-scroll");

    const scrollLeft = () => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: -200, behavior: "smooth" });
      }
    };

    const scrollRight = () => {
      if (scrollContainer) {
        scrollContainer.scrollBy({ left: 200, behavior: "smooth" });
      }
    };

    // Assign scroll handlers to buttons (optional: for SSR safety)
    const leftBtn = document.getElementById("scroll-left");
    const rightBtn = document.getElementById("scroll-right");

    if (leftBtn) leftBtn.onclick = scrollLeft;
    if (rightBtn) rightBtn.onclick = scrollRight;

    return () => {
      // Cleanup
      if (leftBtn) leftBtn.onclick = null;
      if (rightBtn) rightBtn.onclick = null;
    };
  }, []);

  return (
    <div className="relative w-full">
      {/* Navigation Buttons – visible only on desktop */}
      <button
        id="scroll-left"
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
        id="scroll-right"
        className="hidden lg:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white dark:bg-gray-800 p-2 rounded-full shadow"
      >
        ▶
      </button>
    </div>
  );
}
