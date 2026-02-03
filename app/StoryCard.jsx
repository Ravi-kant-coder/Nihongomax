"use client";
import { useState, useRef, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import userStore from "@/store/userStore";
import { useStoryStore } from "@/store/useStoryStore";
import StoryViewer from "./StoryViewer";
import AutoLoopVideo from "./AutoLoopVideo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const StoryCard = ({ story }) => {
  const { user } = userStore();
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const { deleteUserStory, fetchStories } = useStoryStore();
  const [showPreview, setShowPreview] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleClosePreview = () => {
    resetStoryState();
  };

  const resetStoryState = () => {
    setShowPreview(false);
    setSelectedFile(null);
    setFilePreview(null);
    setFileType(null);
    setIsNewStory(false);
  };

  const handleStoryCardClick = () => {
    setIsNewStory(false);
    setShowPreview(true);
  };

  const handleStoryDelete = async () => {
    setShowDeleteModal(false);
    startTransition(async () => {
      if (story?._id) {
        try {
          await deleteUserStory(story?._id);
          await fetchStories();
        } catch (err) {
          console.error("Delete failed", err);
        }
      }
    });
  };

  const handleStoryUsernameClick = (e) => {
    e.stopPropagation();
    startTransition(() => {
      if (story?.user?._id) {
        router.push(`/user-profile/${story?.user?._id}`);
      }
    });
  };
  const hasMedia = story?.uploadedMedia?.length > 0;
  const current = hasMedia ? story?.uploadedMedia[0] : null;

  let mediaContent = null;

  if (!current && story.content) {
    mediaContent = (
      <div className="w-full h-full flex items-center justify-center text-lg px-6 text-center">
        {story.content}
      </div>
    );
  } else if (current?.type === "image") {
    mediaContent = (
      <img
        src={current.url}
        alt={story?.user?.username}
        className="w-full h-full object-cover cursor-pointer"
      />
    );
  } else if (current?.type === "video") {
    mediaContent = <AutoLoopVideo src={current.url} controls={false} />;
  }

  return (
    <>
      <Card
        className="opacity-90 duration-200 hover:opacity-100 hover:scale-102 shadow-md shadow-gray-400 cursor-pointer
        dark:shadow-[rgb(20,20,20)] md:w-[120px] h-[200px] w-[80px] dark:bg-[rgb(45,45,45)] rounded-lg 
        object-cover snap-start shrink-0 relative group bg-accent md:min-w-[120px] md:h-[200px] min-w-[80px] overflow-hidden"
        onClick={handleStoryCardClick}
      >
        <CardContent className="p-0 h-full">
          <>
            {mediaContent}
            <div className="absolute top-2 left-2 hover:ring-3 ring-2 ring-green-700 rounded-full transition-all">
              <Avatar onClick={handleStoryUsernameClick}>
                <AvatarImage
                  src={story?.user?.profilePicture}
                  className="object-cover"
                />
                <AvatarFallback
                  className="w-full h-full flex justify-center text-xl 
                    bg-gray-400 items-center dark:text-white dark:bg-[rgb(55,55,55)]"
                >
                  {story?.user?.username?.split(" ")[0][0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </div>
            {/* --------------------Story Delete Button------------------- */}
            {user?._id === story?.user?._id && (
              <button
                onClick={() => setShowDeleteModal(true)}
                className="group absolute top-0 right-0"
              >
                <Trash2
                  className=" group-hover:text-red-700 text-white bg-black/70
                     group-hover:bg-white/70 dark:text-gray-300 rounded py-1
                     group-hover:dark:text-red-500 shrink-0"
                />
              </button>
            )}
            <p
              className="text-white text-xs capitalize bg-black/70 rounded p-1
                truncate absolute bottom-1 left-1 max-w-[90px] hover:underline cursor-pointer"
              onClick={handleStoryUsernameClick}
            >
              By{" "}
              {user?._id === story?.user?._id ? "you" : story?.user?.username}
            </p>
          </>
        </CardContent>
      </Card>
      {/* --------------------Delete Confirmation Modal------------------- */}
      {showDeleteModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
        >
          <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
            <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl">
              Delete this story {user?.username?.split(" ")[0]}?
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
      <motion.div>
        {showPreview && (
          <StoryViewer
            handleStoryUsernameClick={handleStoryUsernameClick}
            handleStoryDelete={handleStoryDelete}
            story={story}
            onClose={handleClosePreview}
            isLoading={loading}
          />
        )}
      </motion.div>
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
    </>
  );
};

export default StoryCard;
