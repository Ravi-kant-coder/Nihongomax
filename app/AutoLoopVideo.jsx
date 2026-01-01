"use client";
import { useEffect, useRef, useState } from "react";

const AutoLoopVideo = ({ src }) => {
  const videoRef = useRef(null);
  const [isUserWatching, setIsUserWatching] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const startAutoLoop = () => {
      video.currentTime = 0;
      video.play().catch((err) => {
        if (err.name !== "AbortError") {
          console.warn("Initial play error:", err);
        }
      });

      intervalRef.current = setInterval(() => {
        if (!isUserWatching) {
          video.pause();
          video.currentTime = 0;
          video.play().catch((err) => {
            if (err.name !== "AbortError") {
              console.warn("Looped play error:", err);
            }
          });
        }
      }, 5000);
    };

    startAutoLoop();

    return () => {
      clearInterval(intervalRef.current);
      video.pause();
    };
  }, [src, isUserWatching]);

  const handleUserClick = () => {
    setIsUserWatching(true);
    clearInterval(intervalRef.current);
    videoRef.current?.play().catch((err) => {
      if (err.name !== "AbortError") {
        console.warn("User play error:", err);
      }
    });
  };

  return (
    <video
      ref={videoRef}
      src={src}
      muted
      playsInline
      controls={isUserWatching}
      onClick={handleUserClick}
      className="w-full h-full object-cover cursor-pointer"
    />
  );
};

export default AutoLoopVideo;
