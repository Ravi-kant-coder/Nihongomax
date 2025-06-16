import { useState } from "react";
import { motion } from "framer-motion";
import MsgChat from "./MsgChat";
import { X } from "lucide-react";

const MsgBox = () => {
  const [showMsgBox, setShowMsgBox] = useState(true);

  return (
    <>
      {showMsgBox && (
        <motion.div
          initial={{ y: -500 }}
          animate={{ y: 0 }}
          className="fixed bg-white dark:bg-[rgb(20,20,20)] dark:text-white md:bottom-0 rounded-md bottom-18 md:left-40 md:w-1/4 left-1 right-1 md:h-2/3 top-26 overflow-y-auto md:top-auto"
        >
          {" "}
          <div className="relative rounded shadow-lg p-4 bg-gray-400">
            {/* Close (X) button on top-right */}
            <button
              onClick={() => setShowMsgBox(false)}
              className="absolute top-0 right-0 text-black hover:text-gray-700 cursor-pointer dark:text-white dark:hover:text-gray-300"
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          <div className="md:space-y-4 space-y-2 relative dark:border-gray-200">
            <MsgChat />
          </div>
        </motion.div>
      )}{" "}
    </>
  );
};

export default MsgBox;
