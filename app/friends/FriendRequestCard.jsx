import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserMinus, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import Spinner from "../Spinner";

const FriendRequestCard = ({ friend, onAction }) => {
  if (!friend) return null; // Ensure friend is defined before rendering
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDpClick = () => {
    startTransition(() => {
      // deleteUserFromRequest(friend?._id);
      router.push(`/user-profile/${friend?._id}`);
    });
  };

  return (
    <div
      className="flex items-center lg:block bg-white dark:bg-black lg:p-4 p-2 
      shadow-lg rounded-lg"
    >
      <div className="relative lg:mx-auto my-auto overflow-hidden rounded p-1">
        <Avatar
          className="cursor-pointer h-12 w-12 lg:h-30 lg:w-30 hover:ring-3
         hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-5"
          onClick={handleDpClick}
        >
          <AvatarImage
            src={friend?.profilePicture}
            alt={friend?.username}
            className="object-cover"
          />

          <AvatarFallback
            className="bg-gray-400 dark:bg-gray-500 text-black md:text-4xl
           text-2xl"
          >
            {friend?.username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <div className="pb-1">
        <h3
          className="text-lg hover:underline cursor-pointer font-semibold md:text-center 
         truncate capitalize"
          onClick={handleDpClick}
        >
          {friend?.username}
        </h3>
        <p className="md:mb-4 text-gray-600 text-center">
          {friend?.followerCount}{" "}
          {friend?.followerCount === 1 ? "Friend" : "Friends"}
        </p>
        <div className="flex md:flex-col md:justify-between">
          <button
            className="bg-green-700 lg:p-2 p-1 rounded flex justify-evenly items-center
             hover:text-white hover:bg-green-800 text-black cursor-pointer"
            onClick={() => onAction("confirm", friend?._id)}
          >
            <UserPlus className="mr-2 lg:mr-0 h-4 w-4" /> Accept
          </button>
          <button
            className="lg:mt-2 lg:ml-0 lg:p-2 p-1 ml-2 cursor-pointer rounded dark:bg-gray-700
             flex justify-evenly items-center hover:bg-gray-800 bg-black dark:text-black
              hover:dark:text-white text-white"
            onClick={() => onAction("delete", friend?._id)}
          >
            <UserMinus className="mr-2 lg:mr-0 h-4 w-4" /> Delete
          </button>
        </div>
      </div>
      {isPending && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-white/60
                 dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity duration-300 
                 opacity-100"
        >
          <Spinner />
        </div>
      )}
    </div>
  );
};

export default FriendRequestCard;
