"use client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Plus } from "lucide-react";

const createStoryArr = [
  {
    imageUrl: "/Girl.jpg",
    username: "Anjali",
  },
];

const StoryCard = ({ isAddStory, storyData }) => {
  const handleStoryClick = () => {};
  return (
    <div className="min-w-[100px] h-[170px]  overflow-hidden rounded-md shadow-lg shadow-gray-400 dark:shadow-[rgb(20,20,20)] mb-4">
      <Card
        className="w-full h-full opacity-90 duration-200 hover:opacity-100 hover:scale-105 object-cover snap-start shrink-0 relative group dark:bg-[rgb(35,35,35)] bg-accent cursor-pointer "
        onClick={isAddStory ? undefined : handleStoryClick}
      >
        <CardContent className="p-0 h-full">
          {isAddStory ? (
            <div className="w-full h-full flex flex-col dark:bg-[rgb(65,65,65)]">
              <div className="relative mx-auto my-auto overflow-hidden ">
                <Avatar className="w-25 h-25">
                  <AvatarImage
                    src={createStoryArr[0]?.imageUrl}
                    className="object-cover"
                  />
                  <AvatarFallback className="flex justify-center bg-gray-400 items-center text-4xl dark:text-white dark:bg-black">
                    {createStoryArr[0]?.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="w-full h-1/4 dark:bg-[rgb(65,65,65)] bg-accent border-b flex flex-col items-center justify-center">
                <button>
                  <div className="cursor-pointer h-6 w-6">
                    <Plus />
                  </div>
                </button>
                <p className="text-sm font-semibold dark:text-white mb-4">
                  Create Story
                </p>
              </div>
              <input type="file" accept="image/*, video/*" className="hidden" />
            </div>
          ) : (
            <>
              {storyData?.mediaType === "image" ? (
                <img
                  src={storyData?.mediaURL}
                  alt={storyData?.user.username}
                  className="w-full h-full object-cover"
                />
              ) : (
                <video
                  src={storyData?.mediaURL}
                  alt={storyData?.user.username}
                  className="w-full h-full object-cover"
                />
              )}
              <div className="absolute top-2 left-2 ring-2 ring-gray-500 rounded-full hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100">
                <Avatar>
                  <AvatarImage
                    src={storyData?.mediaURL}
                    className="object-cover"
                  />
                  <AvatarFallback className="w-full h-full flex justify-center text-xl bg-gray-400 items-center dark:text-white dark:bg-[rgb(55,55,55)]">
                    {storyData?.user.username.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div className="absolute bottom-0 left-2 ">
                <p className="text-white rounded max-w-[150px] text-xs inline-block font-semibold bg-black/50 px-2 py-1 truncate">
                  {`${storyData?.user.username.split(" ")[0]}`}
                </p>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StoryCard;
