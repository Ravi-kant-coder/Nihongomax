"use client";
import { motion } from "framer-motion";
import { useState } from "react";
import LeftSideBar from "@/components/LeftSideBar";

const videos = [
  {
    id: "TcrIM3HhSoc",
    description: "Learn how to say hello, good morning, and more in Japanese.",
    tags: ["Beginner", "Greetings"],
  },

  {
    id: "DDxMnt77Eqk",
    description: "Quick revision of essential grammar points for JLPT N5.",
    tags: ["JLPT", "Grammar"],
  },
  {
    id: "2t6u53troq8",
    description: "Quick revision of essential grammar points for JLPT N5.",
    tags: ["JLPT", "Grammar"],
  },
  {
    id: "TbR_zcCfE3w",
    description: "Quick revision of essential grammar points for JLPT N5.",
    tags: ["JLPT", "Grammar"],
  },
  {
    id: "7srgyU9eYXY",
    description: "Quick revision of essential grammar points for JLPT N5.",
    tags: ["JLPT", "Grammar"],
  },
];

const tags = [
  "All",
  "Spoken",
  "Grammar",
  "JLPT",
  "Visa",
  "Jobs",
  "Japan",
  "Motivation",
  "Advanced",
  "Nihongomax",
  "Study ways",
];

export default function YouTubeShowcase() {
  const [selectedTag, setSelectedTag] = useState("All");

  const filteredVideos =
    selectedTag === "All"
      ? videos
      : videos.filter((video) => video.tags.includes(selectedTag));

  return (
    <div className="flex">
      <div className="hidden lg:block fixed mt-20">
        <LeftSideBar />
      </div>
      <div className="lg:w-3/4 mx-10 lg:mx-2 mt-20 lg:ml-70 md:ml-60 min-h-screen mb-12">
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-1 rounded-full border text-sm lg:text-md
              ${
                selectedTag === tag
                  ? "bg-black dark:bg-white dark:text-black text-white cursor-pointer border-1 dark:border-white"
                  : "bg-white dark:bg-zinc-800 cursor-pointer border-gray-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVideos.map((video) => (
            <motion.div
              key={video.id}
              whileHover={{ scale: 1.03 }}
              className="bg-white dark:bg-zinc-800 rounded-2xl overflow-hidden shadow-md transition-all"
            >
              <iframe
                className="w-full aspect-video"
                src={`https://www.youtube.com/embed/${video.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                loading="lazy"
              ></iframe>
              <div className="p-2">
                <p>{video.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
