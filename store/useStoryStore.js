import { create } from "zustand";
import {
  getAllStories,
  likeStory,
  shareStory,
  createStory,
  deleteStory,
} from "@/service/story.service";

export const useStoryStore = create((set) => ({
  stories: [],
  loading: false,
  error: null,

  deleteUserStory: async (storyId) => {
    set({ loading: true });
    try {
      await deleteStory(storyId);
      set((state) => ({
        stories: state.stories.filter((st) => st._id !== storyId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      console.error("Zustand story delete Failed", error);
    }
  },

  fetchStories: async () => {
    set({ loading: true });
    try {
      const stories = await getAllStories();
      set({ stories, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCreateStory: async (storyData) => {
    set({ loading: true, error: null });
    try {
      const newStory = await createStory(storyData);
      set((state) => ({
        stories: [newStory, ...state.stories],
        loading: false,
      }));
      return newStory;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  handleLikeStory: async (storyId, currentUser) => {
    // Optimistic UI first
    set((state) => ({
      stories: state.stories.map((story) =>
        story._id === storyId
          ? {
              ...story,
              isLiked: true,
              likeCount: story.likeCount + 1,
              likes: [
                ...(story.likes || []),
                {
                  _id: currentUser._id,
                  username: currentUser.username,
                  profilePicture: currentUser.profilePicture,
                },
              ],
            }
          : story,
      ),
    }));

    try {
      // Real Db update
      await likeStory(storyId);
    } catch (error) {
      // Rollback if backend fails
      set((state) => ({
        stories: state.stories.map((story) =>
          story._id === storyId
            ? {
                ...story,
                isLiked: false,
                likeCount: story.likeCount - 1,
                likes: story.likes.filter((u) => u._id !== currentUser._id),
              }
            : story,
        ),
      }));

      console.error(error);
    }
  },
}));
