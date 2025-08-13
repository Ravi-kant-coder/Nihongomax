"use client";
import { useTransition, useState, useEffect } from "react";
import LeftSideBar from "../LeftSideBar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNoteStore } from "@/store/useNoteStore";
import Note from "./Note";
import userStore from "@/store/userStore";

const Notes = () => {
  const { userNotes, fetchUserNotes } = useNoteStore();
  const [initialNote, setInitialNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const { handleCreateNote } = useNoteStore();
  const { user } = userStore();

  useEffect(() => {
    fetchUserNotes();
  }, [fetchUserNotes]);

  const handleNoteSubmit = async () => {
    if (initialNote.trim()) {
      handleCreateNote({ text: initialNote });
      setInitialNote("");
    }
  };

  return (
    <div className="md:mt-18 mt-25 mb-20">
      <div className="p-2 w-1/5 overflow-y-auto scroll-smooth overscroll-contain">
        <LeftSideBar />
      </div>

      {/* --------------------------Note Input----------------------- */}
      <div className="md:ml-60">
        <h1 className="text-center lg:text-4xl mt-4 text-2xl font-semibold ">
          Make Notes
        </h1>
        <p className="text-center text-xs">Only you can see</p>
        <h2 className="text-center text-xl m-4">
          Hi {user?.username.split(" ")[0]}! Making Notes is a very powerful
          Habit
        </h2>
        <div className="flex justify-between items-center md:w-[60%] md:mx-auto mx-4">
          <Input
            id="note"
            type="text"
            className="bg-white dark:bg-gray-900 "
            placeholder="Make Notes..."
            disabled={isPending}
            autoFocus
            onChange={(e) => setInitialNote(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleNoteSubmit()}
            value={initialNote}
          />
          <Button
            className="cursor-pointer flex items-center
              ml-4 bg-black shadow-2xl text-white hover:bg-gray-800"
            variant="secondary"
            size="sm"
            onClick={handleNoteSubmit}
          >
            <Plus className=" h-4 w-4" />
            <span>Enter</span>
          </Button>
        </div>

        {/* --------------------------Note Box----------------------- */}
        {userNotes?.map((note) => (
          <Note key={note?._id} initialNote={note.text} note={note} />
        ))}
      </div>
    </div>
  );
};

export default Notes;
