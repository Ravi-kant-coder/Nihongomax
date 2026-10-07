"use client";
import { useEffect, useRef, useState } from "react";
import { Mic } from "lucide-react";

export default function CustomAudioPlayer({ src, title = "Listen to audio" }) {
  const audioRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    const handleLoadedMetadata = () => {
      setDuration(audio.duration || 0);
    };

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [src]);

  const togglePlay = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  const handleSeek = (event) => {
    const audio = audioRef.current;

    if (!audio || !duration) return;

    const newTime = Number(event.target.value);

    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    if (!Number.isFinite(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
  };

  const progress = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className="mx-auto w-[80%] mb-5 2xl:w-[90%] xl:w-[80%] lg:w-[70%] md:w-[60%] max-w-[700px] rounded-4xl 
    border border-gray-300 bg-gray-200 px-4 2xl:py-3 py-2"
    >
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        controlsList="nodownload"
      />

      {/* Player Title */}
      <div className="flex justify-center items-center gap-2 text-gray-600 2xl:text-2xl xl:text-xl md:text-lg text-sm">
        <span>
          <Mic />
        </span>
        <span className="font-semibold">{title}</span>
      </div>

      {/* Controls */}
      <div className="flex items-center">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause audio" : "Play audio"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white transition 
          hover:scale-105 hover:bg-gray-700"
        >
          {isPlaying ? (
            <span className="font-bold">l l</span>
          ) : (
            <span className="ml-0.5">▶</span>
          )}
        </button>

        {/* Progress Bar*/}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="w-10 text-right text-xs text-black">
            {formatTime(currentTime)}
          </span>

          <input
            type="range"
            min="0"
            max={duration || 0}
            step="0.1"
            value={currentTime}
            onChange={handleSeek}
            style={{
              background: `linear-gradient(
                to right,
                #111827 ${progress}%,
                #d1d5db ${progress}%
              )`,
            }}
            className="h-1.5 w-full cursor-pointer appearance-none rounded-full
            [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:h-3
              [&::-webkit-slider-thumb]:w-3
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-gray-900
              [&::-moz-range-thumb]:h-3
              [&::-moz-range-thumb]:w-3
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:bg-gray-900"
          />

          <span className="w-10 text-xs text-black">
            {formatTime(duration)}
          </span>
        </div>
      </div>
    </div>
  );
}
