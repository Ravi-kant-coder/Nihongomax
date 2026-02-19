"use client";
import { useState, useTransition } from "react";
import { formatDate } from "@/lib/utils";
import { SquarePen, Trash2 } from "lucide-react";
import userStore from "@/store/userStore";
import { useNoteStore } from "@/store/useNoteStore";
import Spinner from "../Spinner";
import { motion, AnimatePresence } from "framer-motion";
import { useEmojiInsert } from "../hooks/useEmojiInsert";
import { Textarea } from "@/components/ui/textarea";
import EmojiPickerButton from "../components/EmojiPickerButton";
import DeleteConfModal from "../components/DeleteConfModel";
import useT from "../hooks/useT";
import useFormatRelativeTime from "../hooks/useFormatRelativeTime";

const Note = ({ initialNote, note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempNote, setTempNote] = useState(initialNote);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPending, startTransition] = useTransition();
  const { user } = userStore();
  const { deleteUserNote, saveNoteEdit } = useNoteStore();
  const { inputRef, insertEmoji } = useEmojiInsert();
  const [readyTodel, setReadyTodel] = useState(false);
  const formatTime = useFormatRelativeTime();
  const t = useT();

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
    setShowDeleteModal(false);
    setReadyTodel(false);
    startTransition(() => {
      deleteUserNote(noteId);
    });
    setShowDeleteModal(false);
  };

  return (
    <>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0, height: 0, rotate: -5 }}
          animate={{
            opacity: 1,
            height: "auto",
            rotate: readyTodel ? -5 : 0,
          }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className={`relative text-xl my-8 md:mx-20 lg:mx-30 mx-10 p-8 border rounded-lg dark:border-gray-600 shadow-lg
                ${readyTodel ? "bg-[rgb(255,200,200)] dark:bg-[rgb(100,0,0)]" : "bg-accent dark:bg-[rgb(50,50,50)]"}`}
        >
          {/* --------------------Above Edit and Delete buttons------------------- */}
          <button
            className="absolute top-0 left-0 rounded-tl-lg flex items-center group shadow-lg
          rounded-br-2xl text-sm p-1 px-4 cursor-pointer hover:bg-gray-200 shadow-gray-400
          dark:shadow-[rgb(25,25,25)] dark:hover:bg-black"
            onClick={() => setIsEditing(true)}
          >
            <p className=" flex items-center text-sm cursor-pointer">
              {t("edit")}
              <SquarePen className="h-3 w-3 md:ml-1 shrink-0" />
            </p>
          </button>
          <button
            className="absolute top-0 right-0 rounded-tr-lg flex items-center group shadow-lg rounded-bl-2xl text-sm p-1 px-4 cursor-pointer
             hover:bg-gray-200 shadow-gray-400 dark:hover:bg-black dark:hover:text-red-800 dark:shadow-[rgb(25,25,25)]"
            onClick={() => {
              setReadyTodel(true);
              setShowDeleteModal(true);
            }}
          >
            <p className=" flex items-center text-sm font-[Poppins] cursor-pointer group-hover:text-red-700">
              {t("delete")}
              <Trash2 className="h-3 w-3 md:ml-1 shrink-0" />
            </p>
          </button>

          {/* ----------------------Note Text--------------------------- */}

          <div className="p-2">
            {!isEditing ? (
              <p className="text-gray-800 dark:text-gray-200 font-[450] dark:font-normal text-[18px]">
                {tempNote}
              </p>
            ) : (
              <>
                <div className="relative">
                  <Textarea
                    className="w-full p-2 border rounded ring-offset focus:outline-none focus:ring focus:ring-gray-600"
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
                    className="px-2 bg-white dark:text-green-400 flex items-center text-xs font-[Poppins] cursor-pointer border-green-600 border rounded p-0.5
                hover:bg-green-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none text-green-800"
                    onClick={() => handleSaveEditedNote(note?._id)}
                  >
                    <span>{t("save")}</span>
                    <SquarePen className="h-3 w-3 ml-2" />
                  </button>
                  <button
                    className="px-2 bg-white flex items-center text-xs dark:text-red-400 font-[Poppins] cursor-pointer border-red-400 border rounded p-0.5
                hover:bg-red-100  dark:hover:bg-black dark:bg-[rgb(36,37,38)] dark:shadow-none text-red-600"
                    onClick={handleCancel}
                  >
                    <span>{t("cancel")}</span>
                    <SquarePen className="h-3 w-3 ml-2" />
                  </button>
                </div>
              </>
            )}
            {/* ----------------------Created and Updated Date--------------------------- */}
            <div className="absolute bottom-0 right-0 rounded-br-lg flex items-center group shadow-lg rounded-tl-2xl text-xs pb-1 px-2">
              <span className="dark:text-gray-300">
                {t("created")} - {formatTime(note?.createdAt)}
              </span>
              {note?.updatedAt && note?.updatedAt !== note?.createdAt && (
                <>
                  &nbsp;| {t("edited")} - {formatTime(note?.updatedAt)}
                </>
              )}
              <div className="text-xs text-gray-600 dark:text-gray-400"></div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      {/* --------------------Delete Confirmation Modal------------------- */}
      {showDeleteModal && (
        <DeleteConfModal
          user={user}
          item={t("note")}
          handleDelete={() => {
            setShowDeleteModal(false);
            handleNoteDelete(note?._id);
          }}
          handleCancel={() => {
            setShowDeleteModal(false);
            setReadyTodel(false);
          }}
        />
      )}
      {isPending && (
        <div className="fixed inset-0 flex items-center justify-center bg-white/30 dark:bg-black/60 backdrop-blur-xs z-[9999]">
          <Spinner />
        </div>
      )}
    </>
  );
};

export default Note;
