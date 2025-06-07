import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserMinus, UserPlus } from "lucide-react";

const FriendRequestCard = ({ friend, onAction }) => {
  return (
    <div className="flex items-center lg:block bg-white dark:bg-black lg:p-4 p-2 shadow rounded-lg">
      <div className="relative lg:mx-auto my-auto overflow-hidden rounded p-1">
        <Avatar className="cursor-pointer h-12 w-12 lg:h-30 lg:w-30 hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-5">
          <AvatarImage
            src={friend?.profilePicture}
            alt={friend?.username}
            className="object-cover"
          />

          <AvatarFallback className="bg-gray-400 dark:bg-gray-500 text-black text-xl">
            {friend?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div>
        <h3 className="text-lg font-semibold lg:text-center lg:mb-4 ">
          {friend?.username}
        </h3>
        <div className="flex lg:flex-col lg:justify-between">
          <button
            className="bg-green-300 lg:p-2 p-1 rounded flex justify-evenly items-center hover:bg-green-400 text-black cursor-pointer"
            onClick={() => {}}
          >
            <UserPlus className="h-4 w-4" /> Confirm
          </button>
          <button
            className="lg:mt-2 lg:ml-0 lg:p-2 p-1 ml-2 cursor-pointer rounded flex justify-evenly items-center hover:bg-gray-900 bg-black text-white"
            onClick={() => {}}
          >
            <UserMinus className="h-4 w-4" /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
