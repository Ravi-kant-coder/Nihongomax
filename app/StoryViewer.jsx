import { useEffect, useState, useRef } from "react";
import { ChevronLeft, ChevronRight, Heart, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import userStore from "@/store/userStore";
import { Trash2 } from "lucide-react";
import { useStoryStore } from "@/store/useStoryStore";
import { Button } from "@/components/ui/button";
import { formatDate } from "@/lib/utils";
import DeleteConfModal from "./components/DeleteConfModel";
import useT from "./hooks/useT";

const StoryViewer = ({ story, onClose, handleStoryDelete }) => {
  const [index, setIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [videoDuration, setVideoDuration] = useState(null);
  const videoRef = useRef(null);
  const advancingRef = useRef(false); // critical lock
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { user } = userStore();
  const { handleLikeStory } = useStoryStore();
  const STORY_DURATION = 7000;
  const t = useT();

  /* ---------- Build slides ---------- */
  const slides = [];

  if (story.content) {
    slides.push({ type: "text", content: story.content });
  }

  if (story.uploadedMedia?.length) {
    slides.push(...story.uploadedMedia);
  }

  const current = slides[index];
  const isLast = index === slides.length - 1;

  /* ---------- Reset lock on slide change ---------- */
  useEffect(() => {
    advancingRef.current = false;
    setProgress(0);
    setVideoDuration(null);
  }, [index]);

  /* ---------- Expiry ---------- */
  useEffect(() => {
    const expired =
      Date.now() - new Date(story.createdAt).getTime() > 24 * 60 * 60 * 1000;

    if (!expired) return;

    const t = setTimeout(() => {
      onClose();
    }, 0);

    return () => clearTimeout(t);
  }, [story.createdAt, onClose]);

  /* ---------- Text & Image 5 sec timer ---------- */
  useEffect(() => {
    if (!current || current.type === "video") return;

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100 && !advancingRef.current) {
          advancingRef.current = true;
          clearInterval(interval);

          if (isLast) {
            setTimeout(onClose, 0);
          } else {
            setIndex((i) => i + 1);
          }

          return 100;
        }
        return p + 2;
      });
    }, STORY_DURATION / 50);

    return () => clearInterval(interval);
  }, [index, isLast, onClose]);

  const handleNext = (e) => {
    e.stopPropagation();
    if (advancingRef.current) return;
    advancingRef.current = true;
    isLast ? onClose() : setIndex((i) => i + 1);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (index > 0) setIndex((i) => i - 1);
  };

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <button
          onClick={handlePrev}
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-[300px] cursor-pointer
          z-10 p-6 bg-black/80 text-white rounded-full hover:scale-110 transition-all"
        >
          <ChevronLeft />
        </button>
        <motion.div
          className="relative w-full max-w-md h-full md:h-[90vh] bg-black overflow-hidden"
          initial={{ scale: 0.9, y: -30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.9, y: -30, opacity: 0 }}
        >
          {user?._id === story?.user?._id && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowDeleteModal(true);
              }}
              className="absolute flex group px-4 border border-gray-500 rounded cursor-pointer hover:border-red-700
                justify-center items-center text-gray-300 py-1 top-10 ml-2 z-100"
            >
              <Trash2
                className=" group-hover:text-red-700 text-white/70 mr-2 w-5 h-5 dark:text-gray-300
                group-hover:dark:text-red-500 shrink-0"
              />
              <p className="group-hover:text-red-700 text-white/70 capitalize">
                {story?.user?.username.split(" ")[0]} Delete?
              </p>
            </button>
          )}
          <button
            onClick={onClose}
            className="absolute right-4 top-10 text-white/70 hover:text-white cursor-pointer p-2 rounded bg-black/70
            border border-gray-500 z-100"
          >
            <X size={18} />
          </button>
          <div className="text-xs text-gray-300 top-4 absolute flex justify-center w-full">
            <p>{formatDate(story?.createdAt)}</p>
          </div>
          <div className="absolute top-2 left-2 right-2 flex gap-1 z-20">
            {slides.map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-white/30 rounded">
                <div
                  className="h-full bg-white rounded"
                  style={{
                    width:
                      i < index ? "100%" : i === index ? `${progress}%` : "0%",
                  }}
                />
              </div>
            ))}
          </div>
          <Button
            className={`absolute bottom-20 right-10 z-1000 hover:bg-green-200 hover:text-green-800 cursor-pointer border-2 
              disabled:opacity-100 h-15 w-15 border-green-700 dark:border-gray-500 dark:hover:bg-black rounded-full 
              flex justify-center items-center text-lg
                ${
                  story?.isLiked
                    ? "text-green-500 border-green-300 dark:border-green-900 hover:bg-black/90 cursor-auto"
                    : ""
                } dark:text-gray-300`}
            onClick={(e) => {
              e.stopPropagation();
              if (story?.isLiked) return;
              handleLikeStory(story?._id, user);
            }}
          >
            <Heart
              className="heart-beat"
              fill={story?.isLiked ? "green" : "none"}
              color={story?.isLiked ? "green" : "currentColor"}
            />
            {story?.likeCount > 0 && story?.likeCount}
          </Button>

          <div
            onClick={handlePrev}
            className="absolute left-0 top-0 w-1/3 h-full z-10"
          />
          <div
            onClick={handleNext}
            className="absolute right-0 top-0 w-1/3 h-full z-10"
          />

          <div className="w-full h-full flex items-center justify-center relative">
            {current?.type === "text" && (
              <div className="text-white text-xl font-semibold px-6 text-center">
                {current.content}
              </div>
            )}

            {current?.type === "image" && (
              <img src={current.url} className="w-full h-full object-contain" />
            )}
            {current?.type === "video" && (
              <video
                ref={videoRef}
                src={current.url}
                autoPlay
                muted
                playsInline
                className="w-full h-full object-contain"
                onLoadedMetadata={(e) => setVideoDuration(e.target.duration)}
                onTimeUpdate={(e) => {
                  if (!videoDuration) return;
                  setProgress((e.target.currentTime / videoDuration) * 100);
                }}
                onEnded={() => {
                  if (advancingRef.current) return;
                  advancingRef.current = true;
                  isLast ? onClose() : setIndex((i) => i + 1);
                }}
              />
            )}
            {current?.caption && (
              <div className="absolute bottom-20 left-4 right-4 text-white bg-black/40 px-3 text-center rounded py-1">
                {current.caption}
              </div>
            )}
          </div>
        </motion.div>
        <button
          onClick={handleNext}
          className="hidden lg:flex absolute left-1/2 top-1/2 -translate-y-1/2 translate-x-[230px] cursor-pointer
          z-10 p-6 bg-black/80 text-white rounded-full hover:scale-110 transition-all"
        >
          <ChevronRight />
        </button>
        {/* --------------------Delete Confirmation Modal------------------- */}
        {showDeleteModal && (
          <DeleteConfModal
            user={user}
            item={t("story")}
            handleDelete={() => {
              handleStoryDelete();
            }}
            handleCancel={() => {
              setShowDeleteModal(false);
            }}
          />
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default StoryViewer;
