import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import Spinner from "../Spinner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

const FriendSuggestion = ({ friend, onAction }) => {
  if (!friend) return null;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleDpClick = () => {
    console.log("Profile picture clicked");
    startTransition(() => {
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
          className="text-lg hover:underline cursor-pointer font-semibold text-center
         md:mb-4 truncate capitalize"
          onClick={handleDpClick}
        >
          {friend?.username}
        </h3>
        <div className="flex md:flex-col md:justify-between">
          <button
            className="bg-black dark:bg-gray-700 hover:dark:text-white text-white
             lg:p-2 p-1 rounded flex justify-evenly items-center hover:bg-gray-800
              dark:text-black cursor-pointer"
            onClick={() => onAction("confirm", friend?._id)}
          >
            <UserPlus className="mr-2 lg:mr-0 h-4 w-4" /> Send Request
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

export default FriendSuggestion;
