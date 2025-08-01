"use client";
import { useState, useEffect } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import { useAdminData } from "@/store/useAdminData";
import ScrollupBtn from "../ScrollupBtn";

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

const YouTubeShowcase = () => {
  const { querys, fetchQuerys } = useAdminData();

  useEffect(() => {
    fetchQuerys();
  }, [querys]); // dependency added by my own

  const [selectedTag, setSelectedTag] = useState("All");

  const filteredVideos =
    selectedTag === "All"
      ? querys
      : querys.filter((video) => video.mobile.includes(selectedTag));

  return (
    <>
      <div className="md:mt-20 mt-25 mb-20">
        <div className="p-2">
          <LeftSideBar />
        </div>
        <div className="flex flex-col md:ml-80 mb-20">
          <div className="md:fixed md:bg-gray-300 dark:md:bg-black flex flex-wrap justify-center gap-1 mb-2 md:mb-6">
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`md:px-4 p-1 rounded md:border text-sm lg:text-md z-100
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
              <div
                key={video._id}
                className="bg-white mb-4 md:mb-0 dark:bg-zinc-800 rounded overflow-hidden shadow-md transition-all"
              >
                <iframe
                  className="w-full aspect-video"
                  src={`https://www.youtube.com/embed/${video.studentName}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
                <div className="p-2">
                  <p>{video.queryText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ScrollupBtn />
    </>
  );
};
export default YouTubeShowcase;
