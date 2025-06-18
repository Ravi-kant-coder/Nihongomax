import FriendSuggestion from "@/app/friends/FriendsSuggestion";
import useNotificationStore from "@/stores/useNotificationStore";

const NotificationBox = () => {
  const { isNotificationBoxOpen } = useNotificationStore();

  if (!isNotificationBoxOpen) return null;

  return (
    <div className="absolute top-12 right-0 w-80 h-96 bg-white dark:bg-neutral-800 rounded shadow-md p-4">
      <FriendSuggestion />
      <p className="text-sm text-gray-500 dark:text-gray-300">
        No new notifications
      </p>
    </div>
  );
};
export default NotificationBox;
