import { motion } from "framer-motion";
import useT from "../hooks/useT";

const DeleteConfModal = ({ user, item, handleDelete, handleCancel }) => {
  const t = useT();
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <motion.div
        initial={{ scale: 0, rotate: -50 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="bg-white dark:bg-gray-800 p-10 rounded-lg"
      >
        <h2 className="text-xl font-semibold text-center text-red-600 dark:text-white dark:font-normal">
          {t("sureDel")} {item} {t("ending")} {user?.username?.split(" ")[0]}
        </h2>
        <p className=" dark:text-gray-300 text-center my-3 text-lg">
          {t("CntRecvr")}
        </p>

        <div className="flex justify-center gap-4 mt-6 ">
          <button
            onClick={() => handleCancel()}
            className="px-4 py-2 rounded-lg bg-gray-300  cursor-pointer
                dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-sm"
          >
            {t("cancel")}
          </button>
          <button
            onClick={() => handleDelete()}
            className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 cursor-pointer text-white text-sm"
          >
            {t("yesDelete")}
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfModal;
