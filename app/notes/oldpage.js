"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
import useT from "../hooks/useT";

const Notes = () => {
  const { userNotes, fetchUserNotes } = useNoteStore();
  const { savedPosts, fetchSavedPosts } = usePostStore();

  const [initialNote, setInitialNote] = useState("");
  const [isPending, startTransition] = useTransition();

  const { handleCreateNote } = useNoteStore();
  const { user } = userStore();

  const { inputRef, insertEmoji } = useEmojiInsert();

  const t = useT();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user]);

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
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      {/* Main Container */}
      <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* ---------------- Note Input ---------------- */}

        <div
          className="bg-white dark:bg-[rgb(10,10,10)] rounded-2xl shadow-md border border-gray-200
         dark:border-gray-800 p-4 sm:p-6"
        >
          <h1 className="text-xl sm:text-2xl font-semibold text-center">
            {t("makeNotes")}
          </h1>

          <p className="text-center text-gray-500 text-sm sm:text-base mt-2 mb-6">
            {t("onlyYouCanSee")}
          </p>

          <Textarea
            id="note"
            type="text"
            className="bg-white dark:bg-[rgb(10,10,10)] text-base"
            placeholder={`${t("typeEnt")}`}
            disabled={isPending}
            autoFocus
            onChange={(e) => setInitialNote(e.target.value)}
            ref={inputRef}
            value={initialNote}
            autoComplete="off"
          />

          <div className="flex items-center justify-between mt-4 gap-4">
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

            <Button
              onClick={handleNoteSubmit}
              disabled={isPending || !initialNote.trim()}
              className="px-6"
            >
              <Plus className="mr-2 h-4 w-4" />
              {t("enter")}
            </Button>
          </div>
        </div>

        {/* ---------------- Notes ---------------- */}

        <div className="mt-8 space-y-5">
          {userNotes.length === 0 ? (
            <div className="text-center text-gray-500 border rounded-2xl p-6 sm:p-10">
              <h2 className="text-xl sm:text-2xl">
                Hey{" "}
                <span className="capitalize">
                  {user?.username.split(" ")[0]}
                </span>
                !
              </h2>

              <p className="mt-4 text-base sm:text-lg">
                Making Notes is a very{" "}
                <span className="font-semibold">Powerful</span> Habit.
              </p>

              <p className="mt-2">Start now!</p>

              <p className="mt-6 text-sm sm:text-base">
                ノート作成しながら頑張りましょう。応援しています！
              </p>
            </div>
          ) : (
            userNotes.map((note) => (
              <Note key={note?._id} initialNote={note.text} note={note} />
            ))
          )}
        </div>

        {/* ---------------- Saved Posts ---------------- */}

        <div className="mt-14">
          <h1 className="text-center text-2xl sm:text-3xl font-semibold text-gray-700 dark:text-gray-400">
            {t("savedPosts")}
          </h1>

          {savedPosts.length === 0 ? (
            <div className="text-center text-gray-500 border rounded-2xl p-6 sm:p-10 mt-8">
              <h2 className="text-xl sm:text-2xl">
                Your saved posts will appear here{" "}
                <span className="capitalize">
                  {user?.username.split(" ")[0]}
                </span>
              </h2>

              <p className="mt-6 text-base">
                保存されたポストがここで表示されます。
              </p>
            </div>
          ) : (
            <>
              <p className="text-center text-gray-600 dark:text-gray-500 mt-4 mb-6 text-sm sm:text-base">
                {t("untillCreatorDeletes")}
              </p>

              <div className="space-y-6">
                {savedPosts.map((savedPost) => (
                  <WallCard key={savedPost?._id} post={savedPost} />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Notes;
