import { useState, useRef, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2, X } from "lucide-react";
import React from "react";
import userStore from "@/store/userStore";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";
import { motion } from "framer-motion";

const ShowStoryPreview = ({
  story,
  handleStoryUsernameClick,
  handleStoryDelete,
  file,
  fileType,
  onClose,
  onPost,
  isNewStory,
  previewUsername,
  previewAvatar,
  isLoading,
}) => {
  const { user } = userStore();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const handleCancel = () => {
    setShowDeleteModal(false);
  };
  const router = useRouter();

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center
     justify-center z-50"
    >
      <div
        className="relative w-full max-w-md h-[70vh] flex flex-col bg-white
       dark:bg-gray-800 rounded-lg overflow-hidden"
      >
        <Button
          className="absolute top-4 right-4 z-10 text-white hover:text-white cursor-pointer 
          hover:bg-black bg-black/70"
          variant="ghost"
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        {/* --------------------Story Delete Button------------------- */}
        {user?._id === story?.user?._id && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="absolute top-6 left-35 text-red-700 border border-red-700  
              cursor-pointer hover:bg-white/70 bg-white/20 dark:text-gray-300 rounded p-1
            hover:dark:text-red-500 hover:dark:bg-black/50 flex items-center justify-center"
          >
            <Trash2 className="shrink-0 mr-2" />
            Delete this {user?.username.split(" ")[0]}?
          </button>
        )}
        <div className="absolute top-4 left-4 z-10 flex items-center ">
          <div className="relative mx-auto my-auto overflow-hidden rounded p-1">
            <Avatar
              className="cursor-pointer h-10 w-10"
              onClick={handleStoryUsernameClick}
            >
              <AvatarImage src={previewAvatar} className="object-cover" />
              <AvatarFallback
                className="bg-black text-white capitalize w-10 flex
               items-center justify-center "
              >
                {previewUsername
                  ?.split(" ")
                  .map((name) => name[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>
          <span
            className="text-white dark:text-gray-200 font-semibold truncate 
          overflow-hidden max-w-80 bg-black/70 p-1 rounded cursor-pointer"
            onClick={handleStoryUsernameClick}
          >
            {user?._id === story?.user?._id ? null : story?.user.username}
          </span>
        </div>

        {/* --------------------Story Image/Video------------------- */}
        <div
          className="flex-grow flex items-center justify-center bg-gray-100
         dark:bg-gray-900"
        >
          {fileType === "image" ? (
            <img
              src={file}
              alt="story_preview"
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <video
              src={file}
              controls
              autoPlay
              className="max-w-full max-h-full object-contain"
            />
          )}
        </div>
        {isNewStory && (
          <div className="absolute bottom-4 right-2 transform -translate-x-1/2">
            <Button
              onClick={onPost}
              className="bg-gray-800 cursor-pointer hover:bg-black text-white"
            >
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        )}
        {/* --------------------Delete Confirmation Modal------------------- */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
              <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl">
                Delete this story {user?.username.split(" ")[0]}?
              </h2>
              <p className="text-sm dark:text-gray-300 text-center my-2">
                This cannot be recovered.
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={handleCancel}
                  className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                    dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
              cursor-pointer text-white text-sm"
                  onClick={handleStoryDelete}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
      {/* ------------------------Spinner-------------------------- */}
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
                             dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity
                              duration-300 opacity-100"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default ShowStoryPreview;
