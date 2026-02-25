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
import DeleteConfModal from "./components/DeleteConfModel";
import useT from "./hooks/useT";

const StoryCard = ({ story }) => {
  const { user } = userStore();
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const { deleteUserStory, fetchStories } = useStoryStore();
  const [showPreview, setShowPreview] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const t = useT();

  const handleClosePreview = () => {
    resetStoryState();
  };

  const resetStoryState = () => {
    setShowPreview(false);
    setSelectedFile(null);
    setFilePreview(null);
    setFileType(null);
  };

  const handleStoryCardClick = () => {
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
        className="w-full h-full object-cover cursor-pointer hover:scale-102"
      />
    );
  } else if (current?.type === "video") {
    mediaContent = <AutoLoopVideo src={current.url} controls={false} />;
  }

  return (
    <>
      <Card
        className="shadow-md shadow-gray-400 cursor-pointer  md:w-30 h-50 w-20  overflow-hidden dark:shadow-[rgb(20,20,20)]
        dark:bg-[rgb(45,45,45)] rounded-lg object-cover snap-start shrink-0 relative group bg-accent"
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
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(true);
                }}
                className="group absolute top-0 right-0"
              >
                <Trash2
                  className=" hover:text-red-700 text-white bg-black/70
                     hover:bg-white/70 dark:text-gray-300 rounded py-1
                     hover:dark:text-red-500 shrink-0"
                />
              </button>
            )}
            <p
              className="text-white text-xs capitalize bg-black/70 rounded p-1 max-w-18
                truncate absolute bottom-1 left-1 md:max-w-25 hover:underline cursor-pointer"
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
        <div className="fixed inset-0 flex items-center justify-center bg-white/60 dark:bg-black/60 backdrop-blur-sm z-9999 transition-opacity duration-300 opacity-100">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default StoryCard;
