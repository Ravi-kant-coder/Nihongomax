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
    <div className="lg:mx-20">
      {/* --------------------------Note Input----------------------- */}
      <h1 className="text-center lg:text-4xl text-2xl font-semibold ">
        Make Notes
      </h1>
      <p className="text-center mb-4">Only you can see them</p>
      <div className="flex justify-between items-center md:w-[60%] md:mx-auto mx-4">
        <Input
          id="note"
          type="text"
          className="bg-white dark:bg-[rgb(10,10,10)] "
          placeholder="Make Notes..."
          disabled={isPending}
          autoFocus
          onChange={(e) => setInitialNote(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleNoteSubmit()}
          value={initialNote}
          autoComplete="off"
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
      {userNotes.length === 0 ? (
        <h2 className="text-center text-2xl mt-8 dark:text-gray-400 text-gray-700">
          Hey {user?.username.split(" ")[0]}! <br />
          Making Notes is a very <span className="font-semibold">
            Powerful
          </span>{" "}
          Habit
          <br />
          Start now!
          <br />
          <p className="mt-4"> 頑張ってね。応援しています！</p>
          <p className="text-lg"> (All the best. We are with you)</p>
        </h2>
      ) : (
        userNotes?.map((note) => (
          <Note key={note?._id} initialNote={note.text} note={note} />
        ))
      )}
    </div>
  );
};

export default Notes;
