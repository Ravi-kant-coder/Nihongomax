"use client";
import { useState, useEffect } from "react";
import ScrollupBtn from "../ScrollupBtn";
import useVideoStore from "@/store/useVideoStore";
import { RefreshCw } from "lucide-react";
import useT from "../hooks/useT";
import Image from "next/image";
import { requireAuth } from "@/lib/requireAuth";

const YouTubeVideos = () => {
  const { videos, fetchVideos, syncYouTube } = useVideoStore();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = useVideoStore((state) => state.totalPages);
  const t = useT();

  useEffect(() => {
    fetchVideos(currentPage);
  }, [currentPage]);

  return (
    <>
      <div className="flex flex-col">
        {/*---------------------Update button------------------ */}
        <div className="mb-2">
          <button
            onClick={() =>
              requireAuth(async () => {
                await syncYouTube();
                fetchVideos();
              })
            }
            className="px-4 py-2 bg-red-700 text-white rounded cursor-pointer dark:hover:bg-red-700 transition hover:bg-red-500 
              ml-4 md:ml-8 flex items-center dark:bg-red-800"
          >
            {t("refresh")}
            <RefreshCw className="inline-block ml-2 text-white h-5 w-5 animate-spin" />
          </button>
        </div>

        {/*---------------------VIDEOS GRID------------------ */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3
                       gap-6 md:mt-2 mt-1 px-4 md:px-8"
        >
          {videos.map((video) => (
            <div
              key={video._id}
              className="bg-white dark:bg-zinc-800 rounded shadow-md overflow-hidden"
            >
              <a
                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="relative w-full aspect-video overflow-hidden">
                  <Image
                    src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt="Nihongomax"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                </div>
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

      <ScrollupBtn />
    </>
  );
};

export default YouTubeVideos;
