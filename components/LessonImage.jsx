"use client";

import { useState } from "react";

export default function LessonImage({ src, alt = "", className = "" }) {
  const [status, setStatus] = useState("loading");
  const [attempt, setAttempt] = useState(0);

  if (!src) return null;

  return (
    <div className={`relative mx-auto overflow-hidden ${className}`}>
      {status !== "loaded" && (
        <div
          className="absolute inset-0 flex min-h-24 items-center justify-center bg-gray-100"
          role="status"
          aria-live="polite"
        >
          {status === "loading" ? (
            <div className="flex flex-col items-center gap-2 text-gray-500">
              <span className="h-7 w-7 animate-spin rounded-full border-4 border-gray-300 border-t-teal-600" />
              <span className="text-xs">Loading image...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2 p-4 text-gray-600">
              <span className="text-sm">Image could not be loaded.</span>
              <button
                type="button"
                onClick={() => {
                  setStatus("loading");
                  setAttempt((value) => value + 1);
                }}
                className="rounded-md bg-teal-700 px-3 py-1.5 text-sm text-white hover:bg-teal-800"
              >
                Retry
              </button>
            </div>
          )}
        </div>
      )}

      <img
        key={attempt}
        src={src}
        alt={alt}
        className={`block h-auto w-full dark:brightness-[0.8] ${
          status === "loaded" ? "opacity-100" : "opacity-0"
        }`}
        onLoad={() => setStatus("loaded")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
