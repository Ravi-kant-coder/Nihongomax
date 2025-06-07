import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserMinus, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";

const FriendRequestCard = ({ friend, onAction }) => {
  const userPlaceholder = friend?.username?.split(" ")[0];
  return (
    <div className="flex items-center lg:block bg-white dark:bg-black lg:p-4 p-2 shadow rounded-lg">
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
        <h3 className="text-lg font-semibold text-center lg:mb-4 ">
          {"friend?.username"}
        </h3>
        <div className="flex lg:flex-col lg:justify-between">
          <button
            className="bg-green-300 lg:h-10 h-8 w-30 rounded flex justify-evenly items-center hover:bg-green-400 text-black cursor-pointer"
            onClick={() => {}}
          >
            <UserPlus className="h-4 w-4" /> Confirm
          </button>
          <button
            className="lg:mt-2 lg:ml-0 ml-2 h-8 w-30 cursor-pointer lg:h-10 rounded flex justify-evenly items-center hover:bg-gray-900 bg-black text-white"
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
