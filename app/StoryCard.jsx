"use client";
import { useState, useRef, useTransition } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Trash2 } from "lucide-react";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import ShowStoryPreview from "./ShowStoryPreview";
import AutoLoopVideo from "./AutoLoopVideo";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Spinner from "./Spinner";

const StoryCard = ({ isAddStory, story }) => {
  const { user } = userStore();
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleCreateStory, deleteUserStory, fetchStoryPost } = usePostStore();
  const [showPreview, setShowPreview] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);
  const fileInputRef = useRef(null);
  const userPlaceholder = user?.username?.split(" ")[0][0]?.toUpperCase();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleCancel = () => {
    setShowDeleteModal(false);
  };

  const handleFileChnage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file),
        setFileType(file.type.startsWith("video") ? "video" : "image");
      setFilePreview(URL.createObjectURL(file));
      setIsNewStory(true);
      setShowPreview(true);
    }
    e.target.value = "";
  };

  const handleCreateStoryPost = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (selectedFile) {
        formData.append("media", selectedFile);
      }
      await handleCreateStory(formData);
      resetStoryState();
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
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

  const handleStoryClick = () => {
    setFilePreview(story?.mediaUrl);
    setFileType(story?.mediaType);
    setIsNewStory(false);
    setShowPreview(true);
  };

  const handleStoryDelete = async () => {
    setShowDeleteModal(false);
    startTransition(async () => {
      if (story?._id) {
        try {
          await deleteUserStory(story._id);
          await fetchStoryPost();
        } catch (err) {
          console.error("Delete failed", err);
        }
      }
    });
  };

  const handleStoryUsernameClick = () => {
    startTransition(() => {
      if (story?.user?._id) {
        router.push(`/user-profile/${story?.user?._id}`);
      }
    });
  };

  return (
    <div
      className="md:min-w-[100px] md:h-[180px] min-w-[80px] overflow-hidden rounded-md 
      shadow-lg shadow-gray-400 dark:shadow-[rgb(20,20,20)] mb-4"
    >
      <Card
        className="w-full h-full opacity-90 duration-200 hover:opacity-100 hover:scale-102
          object-cover snap-start shrink-0 relative group dark:bg-[rgb(35,35,35)] bg-accent"
        onClick={isAddStory ? undefined : handleStoryClick}
      >
        <CardContent className="p-0 h-full">
          {isAddStory ? (
            <div className="w-full h-full flex flex-col dark:bg-[rgb(65,65,65)]">
              <div className="relative mx-auto my-auto overflow-hidden ">
                <Avatar className="w-20 h-20">
                  <AvatarImage
                    className="object-cover"
                    src={user?.profilePicture}
                    alt={user?.username}
                  />
                  <AvatarFallback
                    className="flex justify-center bg-gray-400 items-center text-4xl
                      dark:text-white dark:bg-black "
                  >
                    {userPlaceholder}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className="w-full dark:bg-[rgb(65,65,65)] bg-accent flex flex-col border p-1
                  items-center justify-center border-gray-300 rounded-b-lg hover:bg-gray-300
                  cursor-pointer dark:border-[rgb(45,45,45)] dark:hover:bg-[rgb(45,45,45)]"
                onClick={() => fileInputRef.current.click()}
              >
                <button>
                  <div
                    className="h-6 w-6 cursor-pointer dark:hover:bg-[rgb(15,15,15)]
                  hover:bg-[rgb(150,150,150)] rounded-full"
                  >
                    <Plus />
                  </div>
                </button>
                <h3
                  className="text-xs font-semibold dark:font-normal dark:text-white 
                text-center"
                >
                  Create Story
                  <p className="truncate md:max-w-[85px] max-w-[65px] capitalize">
                    {user?.username?.split(" ")[0]}
                  </p>
                </h3>
              </div>
              <input
                type="file"
                accept="image/*, video/*"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChnage}
              />
            </div>
          ) : (
            <>
              {story?.mediaType === "image" ? (
                <img
                  src={story?.mediaUrl}
                  alt={story?.user?.username}
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <AutoLoopVideo src={story?.mediaUrl} />
              )}
              <div
                className="absolute top-2 left-2 hover:ring-2 ring-1 ring-black rounded-full
               "
              >
                <Avatar onClick={handleStoryUsernameClick}>
                  <AvatarImage
                    src={story?.user?.profilePicture}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className="w-full h-full flex justify-center text-xl 
                    bg-gray-400 items-center dark:text-white dark:bg-[rgb(55,55,55)]"
                  >
                    {story?.user?.username.split(" ")[0][0]?.toUpperCase()}
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
                truncate absolute bottom-1 left-1 max-w-[90px] hover:underline cursor-default"
                onClick={handleStoryUsernameClick}
              >
                By{" "}
                {user?._id === story?.user?._id ? "you" : story?.user.username}
              </p>
            </>
          )}
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
      {showPreview && (
        <ShowStoryPreview
          handleStoryUsernameClick={handleStoryUsernameClick}
          handleStoryDelete={handleStoryDelete}
          story={story}
          file={filePreview}
          fileType={fileType}
          onClose={handleClosePreview}
          onPost={handleCreateStoryPost}
          isNewStory={isNewStory}
          previewUsername={isNewStory ? user?.username : story?.user?.username}
          previewAvatar={
            isNewStory ? user?.profilePicture : story?.user?.profilePicture
          }
          isLoading={loading}
        />
      )}
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

export default StoryCard;
