import { useState } from "react";
import AutoLoopVideo from "./AutoLoopVideo";
import MediaPreview from "./components/MediaPreview";
import userStore from "@/store/userStore";

const MediaItem = ({ media }) => {
  const [showMediaPreview, setShowMediaPreview] = useState(false);
  const { user } = userStore();

  return (
    <>
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
            onClick={() => setShowMediaPreview(true)}
          />
        ) : (
          <img
            src={media?.url}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
            loading="lazy"
            alt=""
            onClick={() => setShowMediaPreview(true)}
          />
        )
      ) : (
        <div
          className="flex items-center justify-center w-full h-full bg-gray-400 dark:bg-gray-600 text-4xl font-semibold
           text-white"
        >
          Post by {user?.username}
        </div>
      )}
      {showMediaPreview && (
        <MediaPreview
          onClose={() => setShowMediaPreview(false)}
          url={media?.url}
          type={media?.type}
        />
      )}
    </>
  );
};
export default MediaItem;
