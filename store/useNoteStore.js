import { create } from "zustand";
import {
  createNote,
  getAllUserNotes,
  deleteNote,
  updateNoteService,
} from "@/service/notes.service";

export const useNoteStore = create((set, get) => ({
  userNotes: [],
  loading: false,
  error: null,

  fetchUserNotes: async () => {
    set({ loading: true, error: null });
    try {
      const userNotes = await getAllUserNotes();
      set({ userNotes, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCreateNote: async (noteData) => {
    set({ loading: true, error: null });
    try {
      await createNote(noteData);
      await get().fetchUserNotes(); // Refresh from backend
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteUserNote: async (noteId) => {
    set((state) => ({
      userNotes: state.userNotes.filter((note) => note._id !== noteId),
    }));
    try {
      await deleteNote(noteId);
    } catch (error) {
      console.error("Zustand note Delete failed:", error);
    }
  },

  editNote: async (noteId, newContent) => {
    try {
      await updateNoteService(noteId, newContent);
      set((state) => ({
        userNotes: state.userNotes.map((note) =>
          note._id === noteId ? { ...note, content: newContent } : note
        ),
      }));
    } catch (error) {
      console.error("Zustand note Edit Error:", error);
      set({ error });
    }
  },
}));
