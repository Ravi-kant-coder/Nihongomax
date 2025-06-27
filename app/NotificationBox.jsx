import useNotificationStore from "@/stores/useNotificationStore";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import MsgNotific from "./MsgNotific";
import { useState } from "react";
const unreadmsgs = [
  {
    imageUrl: "/Horizontal1.jpg",
    key: "1",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "2",
    username: "Sahanubhuti Sharmasmjda",
  },
  {
    imageUrl: "/Horizontal2.jpg",
    key: "5",
    username: "Farheen Khan",
  },

  {
    imageUrl: "/Circular.jpg",
    key: "7",
    username: "Circuit",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "8",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Vertical2.jpg",
    key: "9",
    username: "Circuit",
  },
  {
    imageUrl: "/Vertical1.jpg",
    key: "10",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Girl.jpg",
    key: "11",
    username: "Circuit",
  },
];
const friendRequests = [
  { _id: 1, profilePicture: "/graphic.jpeg", username: "Gayatri Singhania" },
  {
    _id: 2,
    profilePicture: "/drops.jpg",
    username: "Shola",
  },
  {
    _id: 3,
    profilePicture: "/child.jpeg",
    username: "Madhurima VinshikaDulari",
  },
];
const NotificationBox = () => {
  const [accepted, setAccepted] = useState(false);
  const { isNotificationBoxOpen, closeNotificationBox, toggleNotificationBox } =
    useNotificationStore();

  if (!isNotificationBoxOpen) return null;

  return (
    <div>
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bg-white mx-5 w-[90vw] md:left-1/2 md:w-1/4 md:h-7/8
           dark:bg-black overflow-y-auto border bottom-20 md:bottom-5
           border-[rgb(130,130,130)] z-100 rounded"
      >
        <div
          className="flex bg-white dark:bg-[rgb(30,30,30)] justify-between 
          items-center w-full top-0 z-900 sticky"
        >
          <p className="text-xl font-bold ml-5">Notifications</p>{" "}
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
          className="my-2 text-lg text-white bg-black/70 dark:bg-[rgb(100,100,100)] 
        dark:font-bold text-center dark:text-black"
        >
          Friends Request
        </p>
        {friendRequests.map((friend) => (
          <div
            key={friend._id}
            className="inset-y-0 mx-1 flex justify-between items-center cursor-pointer p-1 rounded
            hover:bg-gray-100 dark:hover:bg-[rgb(20,20,20)]"
          >
            <div className="flex justify-start items-center w-[60%]">
              <div className="relative overflow-hidden p-1">
                <Avatar
                  className="cursor-pointer h-10 w-10 hover:ring-3 hover:ring-gray-600
                  hover:ring-offset-1 transition duration-100 mr-2"
                >
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
              <h3 className="font-semibold text-center truncate">
                {friend?.username}
              </h3>
            </div>
            <div className="flex items-center justify-between">
              <button
                className={`${
                  accepted ? "bg-green-900" : "bg-black "
                } rounded p-1 text-gray-100 flex justify-evenly 
                  items-center cursor-pointer mr-2`}
                onClick={() => {
                  setAccepted(true);
                }}
              >
                {accepted ? "Accepted" : "Accept"}
              </button>
              <button
                onClick={() => {}}
                className="w-8 h-8 bg-[rgba(38,38,23,0.25)] dark:bg-[rgb(20,20,20)] 
                  hover:bg-[rgba(38,38,23,0.5)] dark:hover:bg-black 
                  cursor-pointer rounded-full flex items-center justify-center"
              >
                <X className="w-5 h-5" />
              </button>{" "}
            </div>
          </div>
        ))}
        <p
          className="my-2 text-lg text-white bg-black/70 dark:bg-[rgb(100,100,100)] 
        dark:font-bold text-center dark:text-black"
        >
          New Messages
        </p>
        <MsgNotific unreadmsgs={unreadmsgs} />
        <p className="text-sm text-white bg-black/50 text-center dark:text-gray-300 my-2">
          No New Notification animation like in page
        </p>
      </motion.div>
    </div>
  );
};
export default NotificationBox;
