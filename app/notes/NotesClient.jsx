"use client";

import { useTransition, useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { useNoteStore } from "@/store/useNoteStore";
import { usePostStore } from "@/store/usePostStore";
import userStore from "@/store/userStore";

import useT from "../hooks/useT";
import NoteInput from "./NoteInput";
import NotesList from "./NotesList";
import SavedPosts from "./SavedPosts";

const NotesClient = () => {
  const { userNotes, fetchUserNotes, handleCreateNote } = useNoteStore();

  const { savedPosts, fetchSavedPosts } = usePostStore();

  const { user } = userStore();

  const [initialNote, setInitialNote] = useState("");
  const [isPending, startTransition] = useTransition();

  const t = useT();
  const router = useRouter();

  // Redirect if user is not logged in
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  // Fetch notes and saved posts
  useEffect(() => {
    fetchUserNotes();
    fetchSavedPosts();
  }, [fetchUserNotes, fetchSavedPosts]);

  const handleNoteSubmit = async () => {
    if (!initialNote.trim()) return;

    startTransition(async () => {
      await handleCreateNote({
        text: initialNote,
      });

      setInitialNote("");
    });
  };

  // Avoid rendering the page while redirecting
  if (!user) {
    return null;
  }

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
      <div className="w-full max-w-4xl xl:max-w-5xl 2xl:max-w-6xl mx-auto">
        {/* ---------------- Note Input ---------------- */}

        <NoteInput
          initialNote={initialNote}
          setInitialNote={setInitialNote}
          isPending={isPending}
          onSubmit={handleNoteSubmit}
          t={t}
        />

        {/* ---------------- Notes ---------------- */}

        <NotesList userNotes={userNotes} username={user?.username} />

        {/* ---------------- Saved Posts ---------------- */}

        <SavedPosts savedPosts={savedPosts} username={user?.username} t={t} />
      </div>
    </div>
  );
};

export default NotesClient;
