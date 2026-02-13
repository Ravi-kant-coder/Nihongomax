"use client";
import { useState, useTransition } from "react";
import { formatDate } from "@/lib/utils";
import { SquarePen, Trash2 } from "lucide-react";
import userStore from "@/store/userStore";
import { useNoteStore } from "@/store/useNoteStore";
import Spinner from "../Spinner";
import { motion } from "framer-motion";
import { useEmojiInsert } from "../hooks/useEmojiInsert";
import { Textarea } from "@/components/ui/textarea";
import EmojiPickerButton from "../components/EmojiPickerButton";

const Note = ({ initialNote, note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNote, setTempNote] = useState(initialNote);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = userStore();
  const { deleteUserNote, saveNoteEdit } = useNoteStore();
  const { inputRef, insertEmoji } = useEmojiInsert();

  const handleSaveEditedNote = async (noteId) => {
    const trimmed = tempNote.trim();
    if (!trimmed) return;
    try {
      await saveNoteEdit(noteId, trimmed);
      setTempNote(trimmed);
      setIsEditing(false);
    } catch (error) {
      console.error("Edit failed:", error);
    }
  };

  const handleCancel = () => {
    setTempNote(initialNote);
    setIsEditing(false);
  };

  const handleNoteDelete = (noteId) => {
    startTransition(() => {
      deleteUserNote(noteId);
    });
    setShowDeleteModal(false);
  };

  return (
    <div
      className="relative text-xl my-8 md:mx-20 mx-10 p-8
        border rounded-lg dark:bg-[rgb(36,37,38)]
        dark:border-gray-600 shadow-lg"
    >
      {/* --------------------Above Edit and Delete buttons------------------- */}
      <button
        className="absolute top-0 left-0 rounded-tl-lg flex items-center group shadow-lg
          rounded-br-2xl text-sm p-1 px-4 cursor-pointer hover:bg-gray-200 shadow-gray-400
          dark:shadow-[rgb(25,25,25)] dark:hover:bg-black"
        onClick={() => setIsEditing(true)}
      >
        <p className=" flex items-center text-sm cursor-pointer">
          Edit
          <SquarePen className="h-3 w-3 md:ml-1 shrink-0" />
        </p>
      </button>
      <button
        className="absolute top-0 right-0 rounded-tr-lg flex items-center group shadow-lg
          rounded-bl-2xl text-sm p-1 px-4 cursor-pointer hover:bg-gray-200 shadow-gray-400
          dark:hover:bg-black dark:hover:text-red-800 dark:shadow-[rgb(25,25,25)]"
        onClick={() => setShowDeleteModal(true)}
      >
        <p
          className=" flex items-center text-sm
          font-[Poppins] cursor-pointer group-hover:text-red-700"
        >
          Delete
          <Trash2 className="h-3 w-3 md:ml-1 shrink-0" />
        </p>
      </button>

      {/* ----------------------Note Text--------------------------- */}

      <div className="p-2">
        {!isEditing ? (
          <p
            className="text-gray-800 dark:text-gray-200 font-[450] dark:font-normal 
            text-[18px]"
          >
            {tempNote}
          </p>
        ) : (
          <>
            <div className="relative">
              <Textarea
                className="w-full p-2 border rounded ring-offset focus:outline-none
             focus:ring focus:ring-gray-600"
                rows="2"
                value={tempNote}
                onChange={(e) => setTempNote(e.target.value)}
                ref={inputRef}
              />
              <div className="absolute bottom-0 right-2">
                <EmojiPickerButton
                  onSelect={(emoji) =>
                    insertEmoji({
                      emoji,
                      value: tempNote,
                      setValue: setTempNote,
                    })
                  }
                  emojiSize={"h-8 w-8"}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="px-2 bg-white dark:text-green-400 flex items-center text-xs
               font-[Poppins] cursor-pointer border-green-600 border rounded p-0.5
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)]
                 dark:shadow-none text-green-800"
                onClick={() => handleSaveEditedNote(note?._id)}
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
        {/* ----------------------Created and Updated Date--------------------------- */}
        <div className="absolute bottom-0 right-0 rounded-br-lg flex items-center group shadow-lg rounded-tl-2xl text-xs pb-1 px-2">
          Created:&nbsp;{formatDate(note?.createdAt)}
          {note?.updatedAt && note.updatedAt !== note.createdAt && (
            <>&nbsp;| Updated:&nbsp;{formatDate(note.updatedAt)}</>
          )}
        </div>

        {/* --------------------Delete Confirmation Modal------------------- */}
        {showDeleteModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[9999] bg-black/40 flex items-center justify-center"
          >
            <div
              className="bg-white dark:bg-[rgb(50,50,50)] p-6 rounded-2xl
               shadow-2xl w-80"
            >
              <h2
                className="text-center text-red-600 dark:text-white font-semibold 
                text-xl"
              >
                Sure want to delete this Note {user?.username.split(" ")[0]}?
              </h2>
              <p className="text-sm dark:text-gray-300 text-center my-2">
                This cannot be recovered.
              </p>

              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={() => {
                    setShowDeleteModal(false);
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-300 cursor-pointer 
                          dark:bg-gray-700 hover:bg-gray-400 dark:hover:bg-gray-600 text-sm"
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600
                    cursor-pointer text-white text-sm"
                  onClick={() => handleNoteDelete(note?._id)}
                >
                  Yes, Delete
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {isPending && (
          <div
            className="fixed inset-0 flex items-center justify-center bg-white/30
              dark:bg-black/60 backdrop-blur-xs z-[9999]"
          >
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Note;
