"use client";
import { useState, useTransition } from "react";
import { SquarePen, Trash2 } from "lucide-react";
import { usePostStore } from "@/store/usePostStore";
import userStore from "@/store/userStore";
import { motion, AnimatePresence } from "framer-motion";
import Spinner from "./Spinner";

const CommentEdit = ({ comment, postId, commentId, initialComment }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [initComment, setComment] = useState(initialComment);
  const [tempComment, setTempComment] = useState(initialComment);
  const updateComment = usePostStore((state) => state.updateComment);
  const { deleteComment, fetchPost } = usePostStore();
  const { user } = userStore();
  const [readyTodel, setReadyTodel] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleSave = async () => {
    const trimmed = tempComment.trim();
    if (!trimmed) return;
    try {
      await updateComment(postId, commentId, trimmed);
      setComment(trimmed);
      setIsEditing(false);
    } catch (error) {
      console.error("Comment edit fail ho gaya", error);
    }
  };

  const handleCancel = () => {
    setTempComment(tempComment);
    setIsEditing(false);
  };

  const handleCommentDelete = async (postId, commentId) => {
    setShowDeleteModal(false);
    startTransition(async () => {
      if (postId) {
        try {
          await deleteComment(postId, commentId);
        } catch (err) {
          console.error("Error in handler", err);
        }
      }
    });
    fetchPost();
  };

  const cancelCommentDelete = () => {
    setShowDeleteModal(false);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, height: 0, rotate: -5 }}
        animate={{ opacity: 1, height: "auto", rotate: readyTodel ? -5 : 0 }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        {!isEditing ? (
          <div className="flex">
            <p className="text-gray-800 dark:text-gray-300 text-md font-semibold">
              {initComment}
            </p>
            <button
              className="flex items-center text-xs cursor-pointer hover:underline ml-5"
              onClick={() => setIsEditing(true)}
            >
              <span>Edit/Add</span>
              <SquarePen className="h-3 w-3 ml-1" />
            </button>
            <button
              className="flex items-center text-xs cursor-pointer hover:underline ml-3"
              onClick={() => setShowDeleteModal(true)}
            >
              <span>Delete</span>
              <Trash2 className="h-3 w-3 ml-1" />
            </button>
          </div>
        ) : (
          <>
            <textarea
              className="w-full p-2 border rounded ring-offset focus:outline-none
             focus:ring focus:ring-gray-600"
              rows="2"
              value={tempComment}
              onChange={(e) => setTempComment(e.target.value)}
            />
            <div className="flex gap-2">
              <button
                className="px-2 bg-white dark:text-green-400 flex items-center text-xs
               font-[Poppins] cursor-pointer border-green-600 border rounded p-0.5
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-green-800"
                onClick={handleSave}
              >
                <span>SAVE</span>
                <SquarePen className="h-3 w-3 ml-2" />
              </button>
              <button
                className="px-2 bg-white flex items-center text-xs dark:text-red-400
               font-[Poppins] cursor-pointer border-red-400 border rounded p-0.5
                hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-red-600"
                onClick={handleCancel}
              >
                <span>CANCEL</span>
                <SquarePen className="h-3 w-3 ml-2" />
              </button>
            </div>
          </>
        )}
        {/* --------------------Delete Confirmation Modal------------------- */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
          >
            <div className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl shadow-2xl w-80">
              <h2 className="text-center text-red-600 dark:text-white font-semibold text-xl">
                Sure want to delete this comment?
              </h2>
              <p className="text-sm dark:text-gray-300 text-center my-2">
                This cannot be recovered.
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    cancelCommentDelete();
                    setReadyTodel(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                          dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
                    cursor-pointer text-white text-sm"
                  onClick={() => handleCommentDelete(postId, commentId)}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}
        {/* ------------------------Spinner-------------------------- */}
        {isPending && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-white/60
                             dark:bg-black/60 backdrop-blur-sm z-[9999] transition-opacity
                              duration-300 opacity-100"
          >
            <Spinner />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default CommentEdit;
