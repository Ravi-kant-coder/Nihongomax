import { AnimatePresence } from "framer-motion";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FriendSuggestion = ({ friend, onAction }) => {
  const userPlaceholder = friend?.username?.split(" ")[0];
  return (
    <div className="bg-white mb-4 dark:bg-black lgt:p-4 p-2 shadow rounded-lg flex items-center lg:block">
      <Avatar className="lg:h-[20vh] lg:w-[10vw] h-[10vh] w-[15vw] rounded lg:mx-auto lg:mb-4 mx-5">
        {friend?.profilePicture ? (
          <AvatarImage src={friend?.profilePicture} alt={friend?.username} />
        ) : (
          <AvatarFallback className="dark:bg-gray-400 text-2xl">
            R
          </AvatarFallback>
        )}
      </Avatar>
      <div>
        <h3 className="text-lg font-semibold text-center lg:mb-4 mb-1 ">
          {"friend?.username"}
        </h3>

        <div className="flex flex-col justify-between">
          <Button
            className="bg-black dark:bg-white cursor-pointer dark:hover:bg-gray-400 hover:bg-gray-800"
            size="lg"
            onClick={() => {}}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Add Friend
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendSuggestion;
