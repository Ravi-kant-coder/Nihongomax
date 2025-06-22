import useNotificationStore from "@/stores/useNotificationStore";
import { X } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import MsgChat from "./MsgChat";
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
    username: "Shola aur Shabnam",
  },
  {
    _id: 3,
    profilePicture: "/child.jpeg",
    username: "Madhurima",
  },
];
const NotificationBox = () => {
  const { isNotificationBoxOpen, closeNotificationBox } =
    useNotificationStore();

  if (!isNotificationBoxOpen) return null;

  return (
    <div>
      <motion.div
        initial={{ y: -500, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed mx-5 left-2 md:w-1/4 md:h-3/4 border border-white/60
         dark:border-white/20 backdrop-blur-xl
           bg-[rgba(38,38,23,0.25)] dark:bg-[rgba(30,30,30,0.3)] 
           text-black dark:text-white inset-y-0 z-100 md:left-1/2 
           mt-18 rounded shadow-lg overflow-y-auto"
      >
        {" "}
        <button
          onClick={closeNotificationBox}
          className="bg-[rgba(38,38,23,0.7)] 
               hover:bg-black text-white
               md:px-20 md:left-20 dark:text-white
               dark:hover:bg-black cursor-pointer border-2 border-white/80 sticky
               dark:border-[rgb(200,200,200)] rounded-lg top-1 z-50"
        >
          <X className="w-7 h-7" />
        </button>
        <p className="my-2 text-white bg-black/50 text-center dark:text-gray-300">
          Friends Requests
        </p>
        {friendRequests.map((friend) => (
          <div
            key={friend._id}
            className="border border-white/10 dark:border-white/20 backdrop-blur-xl
           bg-[rgba(38,38,23,0.25)] dark:bg-[rgba(30,30,30,0.3)] 
           inset-y-0 rounded flex justify-start items-center p-1 mx-2"
          >
            <div className="relative overflow-hidden p-1">
              <Avatar
                className="cursor-pointer h-10 w-10  hover:ring-3
             hover:ring-gray-600 hover:ring-offset-1 transition duration-100 mx-2"
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
            <div className="flex items-center justify-between w-3/4">
              <h3 className="hover:underline cursor-pointer font-semibold text-center truncate">
                {friend?.username}
              </h3>
              <div className="">
                <button
                  className="bg-black/60 rounded p-1 text-gray-100 flex justify-evenly 
                items-center hover:bg-black cursor-pointer"
                  onClick={() => {}}
                >
                  {/* <UserPlus className="mr-2 lg:mr-0 h-4 w-4" /> */}
                  Accept
                </button>
              </div>
            </div>
          </div>
        ))}
        <p className="mt-4 mb-2 text-white bg-black/50 text-center dark:text-gray-300">
          New Messages
        </p>
        <MsgChat unreadmsgs={unreadmsgs} />
        <p className="text-sm text-white bg-black/50 text-center dark:text-gray-300">
          No New Notification animation like in page
        </p>
      </motion.div>
    </div>
  );
};
export default NotificationBox;
