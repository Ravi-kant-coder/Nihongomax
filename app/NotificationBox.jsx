import FriendSuggestion from "@/app/friends/FriendsSuggestion";
import useNotificationStore from "@/stores/useNotificationStore";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
const friendRequests = [
  { _id: 1, profilePicture: "/Girl.jpg", username: "Gayatri Singhania" },
  {
    _id: 2,
    profilePicture: "/Horizontal1.jpg",
    username: "Shola aur Shabnam",
  },
  {
    _id: 3,
    profilePicture: "/Horizontal2.pg",
    username: "Madhurima",
  },
];
const NotificationBox = () => {
  const { isNotificationBoxOpen, closeNotificationBox } =
    useNotificationStore();

  if (!isNotificationBoxOpen) return null;

  return (
    <div className="fixed inset-y-0 mt-18 rounded right-50 w-72 md:h-140 bg-white shadow-lg overflow-y-auto">
      {friendRequests.map((friend) => (
        <div className="flex items-center lg:block bg-white dark:bg-black lg:p-4 p-2 shadow rounded-lg">
          <div className="relative lg:mx-auto my-auto overflow-hidden rounded p-1">
            <Avatar className="cursor-pointer h-10 w-10 md:h-20 md:w-20 hover:ring-3 hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-5">
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
          <div className="pb-1">
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
      ))}
      <p className="text-sm text-gray-500 dark:text-gray-300">
        No new notifications
      </p>
      <button
        onClick={closeNotificationBox}
        className="dark:hover:bg-[rgb(20,20,20)] hover:bg-gray-400 hover:text-white dark:hover:text-white text-gray-500 dark:text-[rgb(150,150,150)] cursor-pointer border-2 border-gray-400 dark:border-[rgb(150,150,150)] rounded-full absolute top-2 right-2 z-50"
      >
        <X className="w-7 h-7" />
      </button>
    </div>
  );
};
export default NotificationBox;
