"use client";
import { useTransition, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useNoteStore } from "@/store/useNoteStore";
import { usePostStore } from "@/store/usePostStore";
import Note from "./Note";
import userStore from "@/store/userStore";
import EmojiPickerButton from "@/app/components/EmojiPickerButton";
import { useEmojiInsert } from "../hooks/useEmojiInsert";
import { Textarea } from "@/components/ui/textarea";
import WallCard from "../WallCard";

const Notes = () => {
  const { userNotes, fetchUserNotes } = useNoteStore();
  const { savedPosts, fetchSavedPosts } = usePostStore();
  const [initialNote, setInitialNote] = useState("");
  const [isPending, startTransition] = useTransition();
  const { handleCreateNote } = useNoteStore();
  const { user } = userStore();
  const { inputRef, insertEmoji } = useEmojiInsert();

  useEffect(() => {
    fetchUserNotes();
    fetchSavedPosts();
  }, []);

  const handleNoteSubmit = async () => {
    if (initialNote.trim()) {
      handleCreateNote({ text: initialNote });
      setInitialNote("");
    }
  };

  return (
    <div className="lg:mx-20">
      {/* --------------------------Note Input----------------------- */}
      <h1 className="text-center lg:text-4xl text-2xl font-semibold text-gray-700 dark:text-gray-400">
        Make Notes
      </h1>
      <p className="text-center mb-4">Only you can see them</p>
      <div className="flex justify-center items-center md:w-[60%] md:mx-auto">
        <div className="relative w-full">
          <Textarea
            id="note"
            type="text"
            className="bg-white dark:bg-[rgb(10,10,10)] "
            placeholder="Type and Enter..."
            disabled={isPending}
            autoFocus
            onChange={(e) => setInitialNote(e.target.value)}
            ref={inputRef}
            value={initialNote}
            autoComplete="off"
          />
          <div className="absolute bottom-0 right-2">
            <EmojiPickerButton
              onSelect={(emoji) =>
                insertEmoji({
                  emoji,
                  value: initialNote,
                  setValue: setInitialNote,
                })
              }
              emojiSize={"h-8 w-8"}
            />
          </div>
        </div>
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

      {/* --------------------------Note Box and mapped notes----------------------- */}
      {userNotes.length === 0 ? (
        <h2 className="text-center text-2xl mt-8 text-gray-500 p-8 border rounded-2xl mb-4 border-gray-400">
          Hey <span className="capitalize">{user?.username.split(" ")[0]}</span>
          ! <br />
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

      {/* ----------------------Saved posts--------------------------- */}
      <div className="mt-12 mb-4 max-w-[40vw] mx-auto">
        {savedPosts.length === 0 ? (
          <h2 className="text-center text-2xl mt-8 text-gray-500 p-8 border rounded-2xl mb-4 border-gray-400">
            Your saved posts will appear here{" "}
            <span className="capitalize">{user?.username.split(" ")[0]} </span>
            <br />
            <br />
            <p className="mt-4">保存されたポストがここで表示されます。</p>
          </h2>
        ) : (
          <>
            <h1 className="text-center font-semibold text-3xl text-gray-700 dark:text-gray-400 mb-4">
              Your saved Posts
            </h1>
            {savedPosts?.map((savedPost) => (
              <WallCard key={savedPost?._id} post={savedPost} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Notes;
