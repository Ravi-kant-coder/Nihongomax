import { useState, useRef } from "react";
import useNotificationStore from "@/store/useNotificationStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MsgNotific from "./MsgNotific";

const NotificationBox = () => {
  const [friendRequestsList, setFriendRequestsList] = useState([
    { _id: 1, profilePicture: "/graphic.jpeg", username: "Gayatri Singhania" },
    { _id: 2, profilePicture: "/drops.jpg", username: "Shola" },
    {
      _id: 3,
      profilePicture: "/child.jpeg",
      username: "Madhurima VinshikaDulari",
    },
    { _id: 4, profilePicture: "/graphic.jpeg", username: "Gayatri Singhania" },
    { _id: 5, profilePicture: "/drops.jpg", username: "Shola" },
    {
      _id: 6,
      profilePicture: "/child.jpeg",
      username: "Madhurima VinshikaDulari",
    },
    { _id: 7, profilePicture: "/graphic.jpeg", username: "Gayatri Singhania" },
    { _id: 8, profilePicture: "/drops.jpg", username: "Shola" },
    {
      _id: 9,
      profilePicture: "/child.jpeg",
      username: "Madhurima VinshikaDulari",
    },
  ]);
  const { isNotificationBoxOpen, closeNotificationBox, toggleNotificationBox } =
    useNotificationStore();
  const [acceptedIndices, setAcceptedIndices] = useState([]);

  if (!isNotificationBoxOpen) return null;

  const handleAccept = (index) => {
    // Toggle acceptance of the notification
    if (!acceptedIndices.includes(index)) {
      // Add index to acceptedIndices if not already present
      setAcceptedIndices([...acceptedIndices, index]);
    }
  };

  const handleDeleteNoti = (index) => {
    setFriendRequestsList((prev) => prev.filter((_, i) => i !== index));
    // Optionally remove from acceptedIndices if present:
    setAcceptedIndices((prev) => prev.filter((i) => i !== index));
  };

  return (
    <div>
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-20 bottom-5 left-1/2 -translate-x-1/2 w-[90vw] md:left-1/2 md:w-[30%]
        dark:bg-black bg-white overflow-y-auto border border-[rgb(130,130,130)]
         z-50 rounded-md"
      >
        <div
          className="flex bg-[rgb(80,80,80)] justify-between text-white
         items-center w-full top-0 z-900 sticky"
        >
          <p className="text-2xl font-bold ml-5">Notifications</p>{" "}
          <button
            onClick={closeNotificationBox}
            className="my-2 text-white p-1 cursor-pointer bg-black/50
            dark:bg-[rgb(100,100,100)] hover:bg-black border-2 border-white/80
            rounded-lg mr-1 hover:dark:bg-black"
          >
            <X className="w-7 h-7" />
          </button>
        </div>
        <p
          className="mb-2 text-lg text-white bg-black dark:bg-[rgb(100,100,100)]
           dark:font-bold text-center dark:text-black"
        >
          Friends Request
        </p>
        <AnimatePresence>
          {friendRequestsList.map((friend, index) => (
            <motion.div
              key={friend._id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: 50, transition: { duration: 0.3 } }}
              className="inset-y-0 mx-1 flex justify-between items-center
              p-1 rounded  dark:hover:bg-[rgb(20,20,20)]"
            >
              <div className="flex justify-start items-center w-[60%]">
                <div className="relative overflow-hidden p-1">
                  <Avatar
                    className="cursor-pointer h-10 w-10 hover:ring-3
                   hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mr-2"
                  >
                    <AvatarImage
                      src={friend?.profilePicture}
                      alt={friend?.username}
                      className="object-cover"
                    />
                    <AvatarFallback className="bg-gray-400 dark:bg-gray-500 text-xl">
                      {friend?.username?.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <h3 className="font-semibold text-center truncate">
                  {friend?.username}
                </h3>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={() => handleAccept(index)}
                  className={`${
                    acceptedIndices.includes(index)
                      ? "bg-green-900"
                      : "bg-black"
                  } rounded p-1 text-gray-100 flex justify-evenly items-center cursor-pointer mr-2`}
                  disabled={acceptedIndices.includes(index)}
                >
                  {acceptedIndices.includes(index) ? "Accepted" : "Accept"}
                </button>
                <button
                  onClick={() => handleDeleteNoti(index)}
                  className="w-8 h-8 bg-[rgba(38,38,23,0.25)] dark:bg-[rgb(20,20,20)]
                 hover:bg-[rgba(38,38,23,0.5)] dark:hover:bg-black cursor-pointer
                  rounded-full flex items-center justify-center"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <p className="my-2 text-lg text-white bg-black dark:bg-[rgb(100,100,100)] dark:font-bold text-center dark:text-black">
          New Messages
        </p>
        <MsgNotific />
        <p className="text-sm text-white bg-black/50 text-center dark:text-gray-300 my-2">
          No New Notification animation like in Friends page
        </p>
      </motion.div>
    </div>
  );
};

export default NotificationBox;
