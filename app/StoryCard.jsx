"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";
import userStore from "@/store/userStore";
import { usePostStore } from "@/store/usePostStore";
import React, { useRef, useState } from "react";
import ShowStoryPreview from "./ShowStoryPreview";

const StoryCard = ({ isAddStory, story }) => {
  const { user } = userStore();
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileType, setFileType] = useState("");
  const [loading, setLoading] = useState(false);
  const { handleCreateStory } = usePostStore();
  const [showPreview, setShowPreview] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);
  const fileInputRef = useRef(null);
  const userPlaceholder = story?.user?.username
    ?.split(" ")
    .map((name) => name[0])
    .join("");

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

  return (
    <div
      className="md:min-w-[100px] md:h-[180px] min-w-[80px] overflow-hidden rounded-md 
    shadow-lg shadow-gray-400 dark:shadow-[rgb(20,20,20)] mb-4 cursor-pointer"
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
                    className="flex justify-center bg-gray-400 items-center 
                  text-4xl dark:text-white dark:bg-black"
                  >
                    {userPlaceholder}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div
                className="w-full dark:bg-[rgb(65,65,65)] bg-accent flex flex-col border
                 items-center justify-center border-gray-300 rounded-b-lg hover:bg-gray-300
                  cursor-pointer p-1"
                onClick={() => fileInputRef.current.click()}
              >
                <button>
                  <div className="cursor-pointer h-6 w-6">
                    <Plus />
                  </div>
                </button>
                <p
                  className="text-xs font-semibold dark:font-normal
                 dark:text-white text-center"
                >
                  Create Story
                </p>
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
                  className="w-full max-w-[100px] h-full object-cover"
                />
              ) : (
                <video
                  src={story?.mediaUrl}
                  alt={story?.user?.username}
                  className="w-full max-w-[100px] h-full object-cover"
                />
              )}
              <div
                className="absolute top-2 left-2 ring-2 ring-gray-500 rounded-full 
              hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100"
              >
                <Avatar>
                  <AvatarImage
                    src={story?.user?.profilePicture}
                    className="object-cover"
                  />
                  <AvatarFallback
                    className="w-full h-full flex justify-center text-xl 
                  bg-gray-400 items-center dark:text-white dark:bg-[rgb(55,55,55)]"
                  >
                    {userPlaceholder}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-0 left-2">
                <p
                  className="text-white rounded max-w-[85px] text-xs inline-block bg-black/70
                   px-2 py-1 truncate"
                >
                  {`${story?.user?.username?.split(" ")[0]}`}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
      {showPreview && (
        <ShowStoryPreview
          file={filePreview}
          fileType={fileType}
          onClose={handleClosePreview}
          onPost={handleCreateStoryPost}
          isNewStory={isNewStory}
          username={isNewStory ? user?.username : story?.user?.username}
          avatar={
            isNewStory ? user?.profilePicture : story?.user?.profilePicture
          }
          isLoading={loading}
        />
      )}
    </div>
  );
};

export default StoryCard;
