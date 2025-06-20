import FriendSuggestion from "@/app/friends/FriendsSuggestion";
import useNotificationStore from "@/stores/useNotificationStore";
import { X } from "lucide-react";

const NotificationBox = () => {
  const { isNotificationBoxOpen, closeNotificationBox } =
    useNotificationStore();

  if (!isNotificationBoxOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-80 h-96 bg-white dark:bg-neutral-800 rounded shadow-md p-4">
      <FriendSuggestion />
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
