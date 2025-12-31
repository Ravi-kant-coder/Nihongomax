"use client";
import { useState, useMemo, useEffect } from "react";
import LeftSideBar from "@/app/LeftSideBar";
import ScrollupBtn from "../ScrollupBtn";
import useVideoStore from "@/store/useVideoStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { RefreshCw } from "lucide-react";

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

const VIDEOS_PER_PAGE = 12;

const YouTubeVideos = () => {
  const { videos, fetchVideos, syncYouTube } = useVideoStore();
  const [selectedTag, setSelectedTag] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchVideos();
  }, []);

  //  ---------------Filter videos by tag-------------------
  const filtered = useMemo(() => {
    return selectedTag === "All"
      ? videos
      : videos.filter((v) =>
          v.tags?.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())
        );
  }, [videos, selectedTag]);

  //---------------------Pagination logic---------------------
  const totalPages = Math.ceil(filtered.length / VIDEOS_PER_PAGE);

  const paginated = useMemo(() => {
    const start = (currentPage - 1) * VIDEOS_PER_PAGE;
    return filtered.slice(start, start + VIDEOS_PER_PAGE);
  }, [filtered, currentPage]);

  // -----------Reset page when tag changes---------------------
  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="md:mt-20 mt-24 mb-20">
        <div className="p-2">
          <LeftSideBar />
        </div>

        <div className="flex flex-col md:ml-80 ">
          {/* ---------------------TAG BAR-------------------  */}
          {/* <div
            className="md:fixed md:top-10 md:left-80 md:right-0 md:z-11 md:bg-gray-300 pt-10
             dark:md:bg-[rgb(30,30,30)] rounded-xl flex flex-wrap justify-center gap-2 pb-5"
          >
            {tags.map((tag) => (
              <button
                key={tag}
                onClick={() => handleTagChange(tag)}
                className={`px-3 py-1 rounded text-sm md:text-base border transition 
                  cursor-pointer
                  ${
                    selectedTag === tag
                      ? "bg-red-600 text-white dark:bg-white dark:text-black border-transparent"
                      : "bg-white dark:bg-zinc-800 border-gray-400"
                  }`}
              >
                {tag}
              </button>
            ))}
          </div> */}

          {/*---------------------Update button------------------ */}
          <div className="mb-2">
            <button
              onClick={async () => {
                await syncYouTube();
                fetchVideos();
              }}
              className="px-4 py-2 bg-red-600 text-white rounded cursor-pointer
              dark:hover:bg-red-700 transition hover:bg-red-500 
              ml-4 md:ml-8 flex items-center dark:bg-red-800"
            >
              Refresh Videos
              <RefreshCw className="inline-block ml-2 text-white h-5 w-5 animate-spin" />
            </button>
          </div>

          {/*---------------------VIDEOS GRID------------------ */}
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                       gap-6 md:mt-2 mt-1 px-4 md:px-8"
          >
            {paginated.map((video) => (
              <div
                key={video._id}
                className="bg-white dark:bg-zinc-800 rounded shadow-md overflow-hidden"
              >
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block relative"
                >
                  <Avatar
                    className="bg-white dark:bg-zinc-800 rounded w-full aspect-video 
                    object-cover shadow-md overflow-hidden h-full"
                  >
                    <AvatarImage
                      src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                      className="object-cover"
                      alt={video.title}
                    />
                    <AvatarFallback className="bg-gray-400 dark:bg-black capitalize">
                      Nihongomax Video
                    </AvatarFallback>
                  </Avatar>
                </a>
                <div className="p-3">
                  <p className="text-sm font-medium line-clamp-2">
                    {video.title}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* --------------PAGINATION Buttons---------------- */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-10">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer 
                disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-zinc-800
                border-white dark:border-zinc-700 disabled:hover:bg-transparent
                disabled:dark:hover:bg-transparent"
              >
                Prev
              </button>

              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded
                    ${
                      currentPage === i + 1
                        ? "bg-red-600 text-white cursor-pointer"
                        : "bg-white dark:bg-zinc-800 cursor-pointer"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="px-3 py-1 border rounded disabled:opacity-40 cursor-pointer 
                disabled:cursor-not-allowed hover:bg-gray-200 dark:hover:bg-zinc-800
                border-white dark:border-zinc-700 disabled:hover:bg-transparent
                disabled:dark:hover:bg-transparent"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      <ScrollupBtn />
    </>
  );
};

export default YouTubeVideos;
