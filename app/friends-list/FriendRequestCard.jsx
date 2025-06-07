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
        <h3 className="text-lg font-semibold text-center mb-4 ">
          {"friend?.username"}
        </h3>
        <div className="flex lg:flex-col lg:justify-between">
          <Button
            className="bg-green-300 hover:bg-green-400 text-black cursor-pointer"
            size="lg"
            onClick={() => {}}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Confirm
          </Button>
          <Button
            className="lg:mt-2 lg:ml-0 ml-2 cursor-pointer"
            size="lg"
            onClick={() => {}}
          >
            <UserMinus className="mr-2 h-4 w-4" /> Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FriendRequestCard;
