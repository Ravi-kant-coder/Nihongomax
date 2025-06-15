import { useState } from "react";
import { motion } from "framer-motion";
import Msg from "./Msg";

const MsgBox = () => {
  const [showModal, setShowModal] = useState(false);
  const [showMsgBox, setShowMsgBox] = useState(true);

  return (
    <>
      {showMsgBox && (
        <motion.div
          initial={{ scale: 0, rotate: -50, x: -50 }}
          animate={{ scale: 1, rotate: 0, x: 0 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="fixed bg-white dark:bg-[rgb(20,20,20)] dark:text-white md:bottom-0 rounded-md bottom-18 md:left-40 md:w-1/4 left-1 right-1 md:h-2/3 top-26 overflow-y-auto md:top-auto"
        >
          <div className=" md:space-y-4 space-y-2  dark:border-gray-200">
            <Msg />
            <button
              onClick={() => setShowMsgBox(false)}
              className="bg-gray-300 cursor-pointer dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
            >
              Cancel
            </button>
            <div className="flex items-center justify-between text-sm">
              <button
                onClick={() => setShowModal(true)}
                className="mt-4 bg-red-400 dark:bg-red-900 cursor-pointer dark:hover:bg-red-700 hover:bg-red-500  hover:text-white py-2 px-4 rounded font-medium"
              >
                Delete
              </button>
            </div>
            <div className="flex items-center">sdf</div>
            <div className="flex items-center">xcb</div>
            <div className="flex items-center">wert</div>
            <div className="flex items-center">5467</div>
            <div className="flex items-center">sdf</div>
            <div className="flex items-center">xcb</div>
            <div className="flex items-center">wert</div>
            <div className="flex items-center">5467</div>{" "}
            <div className="flex items-center">sdf</div>
            <div className="flex items-center">xcb</div>
            <div className="flex items-center">wert</div>
            <div className="flex items-center">5467</div>{" "}
            <div className="flex items-center">sdf</div>
            <div className="flex items-center">xcb</div>
            <div className="flex items-center">wert</div>
            <div className="flex items-center">5467</div>{" "}
            <div className="flex items-center">sdf</div>
            <div className="flex items-center">xcb</div>
            <div className="flex items-center">wert</div>
            <div className="flex items-center">5467</div>
          </div>
          {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
              <motion.div
                initial={{ scale: 0, rotate: -50 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl "
              >
                <h2 className="text-lg font-semibold text-center text-red-600 dark:text-white">
                  Delete this Post Forever?
                </h2>
                <p className="text-sm  dark:text-gray-300 text-center my-2">
                  This cannot be Recovered.
                </p>

                <div className="flex justify-center gap-4 mt-6 ">
                  <button
                    onClick={() => setShowModal(false)}
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
        </motion.div>
      )}
    </>
  );
};

export default MsgBox;
// {
//   isOpen && (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
//       <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl">
//         <h2 className="text-lg font-semibold text-center text-gray-800 dark:text-white">
//           Messages
//         </h2>
//         <MsgsBox />
//       </div>
//     </div>
//   );
// }
