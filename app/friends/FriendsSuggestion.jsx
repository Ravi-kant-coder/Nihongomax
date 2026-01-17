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
    startTransition(() => {
      router.push(`/user-profile/${friend?._id}`);
    });
  };

  return (
    <div className="flex flex-col items-center bg-white dark:bg-black shadow-md rounded-xl p-2 w-full max-w-[220px]">
      <div className="relative overflow-hidden rounded-lg w-full aspect-square mb-2">
        <Avatar
          className="cursor-pointer h-full w-full rounded-lg"
          onClick={handleDpClick}
        >
          <AvatarImage
            src={friend?.profilePicture}
            alt={friend?.username}
            className="object-cover"
          />

          <AvatarFallback
            className="absolute flex items-center justify-center bg-gray-300 dark:bg-gray-600 w-full h-full
             text-black dark:text-white md:text-6xl font-semibold rounded-lg"
          >
            {friend?.username?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </div>
      <h3
        className="capitalize truncate font-semibold cursor-pointer hover:underline w-full text-center"
        onClick={handleDpClick}
      >
        {friend?.username}
      </h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 text-center">
        {friend?.followerCount}{" "}
        {friend?.followerCount === 1 ? "Friend" : "Friends"}
      </p>
      <div className="w-full space-y-2">
        <button
          className="w-full bg-gray-600 hover:bg-black cursor-pointer dark:bg-gray-700 dark:hover:bg-gray-600 py-2
            rounded-sm flex items-center justify-center text-white font-medium transition-colors duration-200"
          onClick={() => onAction("confirm", friend?._id)}
        >
          <UserPlus className="h-4 w-4 mr-2" /> Send Request
        </button>
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
