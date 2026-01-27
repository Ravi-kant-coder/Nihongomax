import { useState } from "react";
import MediaPreview from "./MediaPreview";
import AutoLoopVideo from "../AutoLoopVideo";

const MediaShowcase = ({ media, parent }) => {
  const [showMediaPreview, setShowMediaPreview] = useState(false);

  return (
    <>
      <div
        className="relative overflow-hidden rounded-lg bg-black/5 w-full sm:w-[220px] md:w-[240px] lg:w-[260px] ease-in-out
      aspect-[4/3] flex items-center justify-center cursor-pointer hover:scale-105 transition-transform duration-300"
        onClick={() => setShowMediaPreview(true)}
      >
        {media?.url ? (
          media.type === "video" ? (
            <AutoLoopVideo
              src={media.url}
              className="w-full h-full object-cover absolute inset-0"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              src={media.url}
              className="max-w-full max-h-full object-contain"
              loading="lazy"
              alt=""
            />
          )
        ) : (
          <div
            className="flex items-center justify-center w-full h-full bg-gray-400 dark:bg-gray-600 text-4xl font-semibold
           text-white"
          >
            {parent?.schoolName?.charAt(0)?.toUpperCase()}
          </div>
        )}
      </div>
      {showMediaPreview && (
        <MediaPreview
          onClose={() => setShowMediaPreview(false)}
          url={media.url}
          type={media.type}
        />
      )}
    </>
  );
};

export default MediaShowcase;
