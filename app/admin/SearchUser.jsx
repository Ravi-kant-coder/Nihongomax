import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useTransition, useState } from "react";
import userStore from "@/store/userStore";
import Spinner from "../Spinner";

const SearchUser = ({ user, handleSearchUserClick }) => {
  const [isPending, startTransition] = useTransition();

  return (
    <>
      <div
        className="p-2 hover:bg-white rounded-md cursor-pointer dark:hover:bg-[rgb(20,20,20)]"
        onClick={() => handleSearchUserClick(user?._id)}
      >
        <div className="flex items-center">
          <Avatar className="cursor-pointer h-10 w-10 mr-3 hover:ring-2 ring-gray-500">
            <AvatarImage src={user?.profilePicture} className="object-cover" />
            <AvatarFallback className="bg-gray-400 dark:bg-black capitalize">
              {user?.username.split(" ")[0][0]}
            </AvatarFallback>
          </Avatar>
          <div className="w-[90%]">
            <p className="w-[90%] truncate text-lg capitalize">
              {user?.username}
            </p>
            <p className="tuncate text-sm text-gray-500">
              {user?.followerCount} Friends
            </p>
          </div>
        </div>
      </div>
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/30
          dark:bg-black/60 backdrop-blur-xs z-[9999]"
        >
          <Spinner />
        </div>
      )}
    </>
  );
};

export default SearchUser;
