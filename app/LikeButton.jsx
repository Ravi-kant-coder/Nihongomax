import { Heart } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LikeButton = ({ onLike }) => {
  const [liked, setLiked] = useState(false);
  const [showEffect, setShowEffect] = useState(false);

  // On mount, get fresh count from DB
  useEffect(() => {
    fetchCount();
  }, []);

  const handleClick = () => {
    if (liked) return;
    setLiked(true);
    setShowEffect(true);
    setTimeout(() => setShowEffect(false), 1000); // auto-hide after 1s
  };

  return (
    <>
      <div className="relative">
        <span className="mr-4 text-sm font-normal">{likedCount} Likes</span>
        <motion.button
          onClick={onLike}
          whileTap={{ scale: 0.8 }} // tap feedback
          className=" lg:w-[10vw] focus:outline-none mb-2 bg-black cursor-pointer
           hover:bg-gray-800 hover:text-white font-medium lg:py-1 lg:px-4 px-2 rounded"
        >
          <div className="flex items-center justify-around">
            <span
              className={`transition-transform duration-300" ${
                liked ? " text-red-500 dark:text-red-400" : " text-white"
              }`}
            >
              {liked ? "Liked" : "Like"}
            </span>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1.5 }}
              className="ml-2 lg:ml-0"
              transition={{
                type: "spring",
                stiffness: 500,
                damping: 5,
              }}
            >
              <Heart
                className={`lg:w-4 lg:h-4 w-3 h-3 transition-transform duration-300" ${
                  liked
                    ? "fill-red-700 text-red-700"
                    : "fill-gray-800 text-white"
                }`}
              />
            </motion.div>
          </div>
        </motion.button>

        {/* Pop-up Text */}
        <AnimatePresence>
          {showEffect && (
            <motion.div
              className="absolute -top-6 lg:left-30 right-2 text-sm font-semibold text-red-600"
              initial={{ opacity: 1, y: 10, rotate: 10 }}
              animate={{ opacity: 1, y: -20, rotate: -5 }}
              exit={{ opacity: 0, rotate: -10 }}
              transition={{ duration: 2 }}
            >
              <span className="flex">
                THANKS <Heart className="fill-red-700 text-red-700" />
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default LikeButton;
