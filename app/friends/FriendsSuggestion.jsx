import { AnimatePresence } from "framer-motion";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FriendSuggestion = ({ friend, onAction }) => {
  // const userPlaceholder = friend?.username?.split(" ")[0];
  return (
    <div className="flex items-center lg:block bg-white dark:bg-black lg:p-4 p-2 shadow rounded-lg">
      <div className="relative lg:mx-auto my-auto overflow-hidden rounded p-1">
        <Avatar className="cursor-pointer h-12 w-12 lg:h-30 lg:w-30 hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-5">
          <AvatarImage
            src={friend?.profilePicture}
            alt={friend?.username}
            className="object-cover"
          />

          <AvatarFallback className="bg-gray-400 dark:bg-gray-500 text-xl">
            {friend?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 className="text-lg hover:underline cursor-pointer font-semibold text-center lg:mb-4 truncate">
          {friend?.username}
        </h3>
        <div className="flex lg:flex-col lg:justify-between">
          <button
            className="bg-black text-white lg:p-2 p-1 rounded flex justify-evenly items-center hover:bg-gray-800 dark:text-black cursor-pointer"
            onClick={() => {}}
          >
            <UserPlus className="mr-2 lg:mr-0 h-4 w-4" /> Send Request
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendSuggestion;
