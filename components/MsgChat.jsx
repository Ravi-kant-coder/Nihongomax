import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MoreHorizontal, Trash2, ShieldBan } from "lucide-react";
import { motion } from "framer-motion";

const readmsgs = [
  {
    imageUrl: "/Girl.jpg",
    key: "1",
    username: "Sahanubhuti Sharma",
  },
  {
    imageUrl: "/Gil.jpg",
    key: "2",
    username: "Anjali Devegoda",
  },
];
const unreadmsgs = [
  {
    imageUrl: "/Horizontal1.jpg",
    key: "3",
    username: "Kumar shanu",
  },
  {
    imageUrl: "/Girl.jpg",
    key: "4",
    username: "Sahanubhuti Sharmasmjda",
  },
  {
    imageUrl: "/Gil.jpg",
    key: "5",
    username: "Farheen Khan",
  },
  {
    imageUrl: "/Horizontal1.jpg",
    key: "6",
    username: "Kumar shanu",
  },

  {
    imageUrl: "/Circular.jpg",
    key: "7",
    username: "Circuit",
  },
];

const MsgChat = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [openUp, setOpenUp] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const dropdownRef = useRef(null);
  const buttonRefs = useRef([]); // holds refs for each button

  // Handle click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenIndex(null);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCancelDeleteChat = () => {
    setShowDeleteModal(false);
    setOpenIndex(null);
  };
  // Here add the logic to delete the chat

  // When a 3-dot button is clicked
  const handleDotClick = (index) => {
    const btnRef = buttonRefs.current[index];
    if (!btnRef) return;

    const rect = btnRef.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const estimatedDropdownHeight = 100;

    setOpenUp(spaceBelow < estimatedDropdownHeight);
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="space-y-4">
      {readmsgs.map((dummymsg, index) => (
        <div
          key={dummymsg?.key}
          className="relative group flex items-center  dark:hover:bg-[rgb(30,30,30)] bg-white dark:bg-[rgb(40,40,40)] rounded-md cursor-pointer hover:bg-gray-200"
        >
          <Avatar className="cursor-pointer h-12 w-12 hover:ring-2 hover:ring-black hover:ring-offset-1 mx-2">
            <AvatarImage src={dummymsg?.imageUrl} className="object-cover" />
            <AvatarFallback className="bg-gray-400 text-2xl dark:bg-gray-500 text-black">
              {dummymsg?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="w-1/2">
            <p className="truncate font-semibold">{dummymsg?.username}</p>
            <p className="text-xs text-black dark:text-white font-semibold dark:font-normal truncate">
              Sensei Chal chal baliye Sensei Chal chal baliyeSensei Chal chal
              baliyeSensei Chal chal baliye{" "}
            </p>
          </div>
          <div className="absolute right-2">
            <div
              ref={openIndex === index ? dropdownRef : null}
              className="relative"
            >
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={() => handleDotClick(index)}
                className="w-10 h-10 bg-gray-200 dark:bg-[rgb(20,20,20)] hover:bg-gray-300 cursor-pointer dark:hover:bg-black rounded-full flex items-center justify-center"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {openIndex === index && (
                <div
                  className={`absolute right-0 w-40 bg-orange-100 dark:bg-[rgb(30,30,30)] text-sm shadow-md rounded p-1 z-50 ${
                    openUp ? "bottom-12" : "top-12"
                  }`}
                >
                  <div className="hover:bg-gray-100 p-1 dark:hover:bg-black cursor-pointer flex items-center justify-start">
                    <ShieldBan size={18} className="mr-2 shrink-0" />
                    <p className="truncate ">Block {dummymsg?.username}</p>
                  </div>
                  <div
                    onClick={() => setShowDeleteModal(true)}
                    className="hover:bg-gray-100 dark:hover:bg-black p-1 active:bg-gray-200 active:text-red-700 hover:text-red-700 cursor-pointer flex items-center justify-start"
                  >
                    <Trash2 size={18} className="mr-2 " />
                    Delete Chat
                  </div>
                  {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                      <motion.div
                        initial={{ scale: 0, rotate: -50 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl "
                      >
                        <h2 className="text-lg font-semibold text-center text-red-600 dark:text-white">
                          Delete Chat with {dummymsg?.username}?
                        </h2>
                        <p className="text-sm  dark:text-gray-300 text-center my-2">
                          This cannot be Recovered.
                        </p>

                        <div className="flex justify-center gap-4 mt-6 ">
                          <button
                            onClick={handleCancelDeleteChat}
                            className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                          >
                            Cancel
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm">
                            Yes, Delete
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
      {unreadmsgs.map((dummymsg, index) => (
        <div
          key={dummymsg?.key}
          className="relative group flex items-center dark:hover:bg-[rgb(30,30,30)] bg-white dark:bg-[rgb(40,40,40)] rounded-md cursor-pointer hover:bg-gray-200"
        >
          <Avatar className="cursor-pointer h-12 w-12 hover:ring-2 hover:ring-black hover:ring-offset-1 mx-2">
            <AvatarImage src={dummymsg?.imageUrl} className="object-cover" />
            <AvatarFallback className="bg-gray-400 text-2xl dark:bg-gray-500 text-black">
              {dummymsg?.username.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>

          <div className="w-1/2">
            <p className="truncate">{dummymsg?.username}</p>
            <p className="text-xs text-gray-700 dark:text-gray-400 truncate">
              Sensei Chal chal baliye Sensei Chal chal baliyeSensei Chal chal
              baliyeSensei Chal chal baliye{" "}
            </p>
          </div>
          <div className="absolute right-2">
            <div
              ref={openIndex === index ? dropdownRef : null}
              className="relative"
            >
              <button
                ref={(el) => (buttonRefs.current[index] = el)}
                onClick={() => handleDotClick(index)}
                className="w-10 h-10 bg-gray-200 dark:bg-[rgb(20,20,20)] hover:bg-gray-300 cursor-pointer dark:hover:bg-black rounded-full flex items-center justify-center"
              >
                <MoreHorizontal className="w-5 h-5" />
              </button>

              {openIndex === index && (
                <div
                  className={`absolute right-0 w-40 bg-orange-100 dark:bg-[rgb(30,30,30)] text-sm shadow-md rounded p-1 z-50 ${
                    openUp ? "bottom-12" : "top-12"
                  }`}
                >
                  <div className="hover:bg-gray-100 p-1 dark:hover:bg-black cursor-pointer flex items-center justify-start">
                    <ShieldBan size={18} className="mr-2 shrink-0" />
                    <p className="truncate ">Block {dummymsg?.username}</p>
                  </div>
                  <div
                    onClick={() => setShowDeleteModal(true)}
                    className="hover:bg-gray-100 dark:hover:bg-black p-1 active:bg-gray-200 active:text-red-700 hover:text-red-700 cursor-pointer flex items-center justify-start"
                  >
                    <Trash2 size={18} className="mr-2 " />
                    Delete Chat
                  </div>
                  {showDeleteModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
                      <motion.div
                        initial={{ scale: 0, rotate: -50 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl "
                      >
                        <h2 className="text-lg font-semibold text-center text-red-600 dark:text-white">
                          Delete Chat with {dummymsg?.username}?
                        </h2>
                        <p className="text-sm  dark:text-gray-300 text-center my-2">
                          This cannot be Recovered.
                        </p>

                        <div className="flex justify-center gap-4 mt-6 ">
                          <button
                            onClick={handleCancelDeleteChat}
                            className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
                          >
                            Cancel
                          </button>
                          <button className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm">
                            Yes, Delete
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MsgChat;
