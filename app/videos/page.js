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
    <div className="md:flex">
      <div className="hidden lg:block">
        <LeftSideBar />
      </div>
      <div className="md:fixed md:mt-17 mt-12 z-100 md:bg-gray-300 dark:md:bg-black p-4 rounded md:w-3/4 md:ml-70 flex flex-wrap px-10 md:px-0 justify-center gap-1 md:gap-2 mb-2 md:mb-6">
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => setSelectedTag(tag)}
            className={`md:px-4 p-1 rounded md:border text-sm lg:text-md
              ${
                selectedTag === tag
                  ? "bg-red-600 rounded dark:bg-white px-5 md:px-0 dark:text-black text-white cursor-pointer md:border-1 dark:border-white"
                  : "bg-white rounded-lg md:rounded dark:bg-zinc-800 px-5 md:px-0 cursor-pointer border-gray-400"
              }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <div className="md:grid md:grid-cols-2 lg:grid-cols-3 md:ml-70 gap-6 md:mt-35 mt-4 mx-auto w-3/4">
        {filteredVideos.map((video) => (
          <motion.div
            key={video.id}
            whileHover={{ scale: 1.03 }}
            className="bg-white mb-4 md:mb-0 dark:bg-zinc-800 rounded overflow-hidden shadow-md transition-all"
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
  );
}
