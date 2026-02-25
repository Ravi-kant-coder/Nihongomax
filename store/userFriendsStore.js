import {
  deleteUserFromRequest,
  followUser,
  getAllFriendsRequest,
  getAllFriendsSuggestion,
  getMutualFriends,
  UnfollowUser,
} from "@/service/user.service";
import { create } from "zustand";

export const userFriendStore = create((set, get) => ({
  friendRequest: [],
  friendSuggestion: [],
  mutualFriends: [],
  loading: false,
  requestHasMore: true,
  suggestionHasMore: true,

  fetchFriendRequest: async (page = 1) => {
    try {
      set({ loading: true });
      const response = await getAllFriendsRequest(page);
      const { users, hasMore } = response.data;
      set((state) => ({
        friendRequest: page === 1 ? users : [...state.friendRequest, ...users],
        requestHasMore: hasMore,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching friend requests:", error);
      set({ loading: false });
    }
  },

  fetchFriendSuggestion: async (page = 1) => {
    try {
      set({ loading: true });
      const response = await getAllFriendsSuggestion(page);
      const { users, hasMore } = response.data;
      set((state) => ({
        friendSuggestion:
          page === 1 ? users : [...state.friendSuggestion, ...users],
        suggestionHasMore: hasMore,
        loading: false,
      }));
    } catch (error) {
      console.error("Error fetching friend suggestions:", error);
      set({ loading: false });
    }
  },

  fetchMutualFriends: async (userId) => {
    set({ loading: true });
    try {
      const friend = await getMutualFriends(userId);
      set({ mutualFriends: friend, loading: false });
    } catch (error) {
      set({ error, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  followUser: async (userId) => {
    set({ loading: true });
    try {
      await followUser(userId);
    } catch (error) {
      set({ error, loading: false });
    }
  },

  UnfriendUser: async (userId) => {
    set({ loading: true });
    try {
      await UnfollowUser(userId);
    } catch (error) {
      set({ error, loading: false });
    }
  },

  deleteUserFromRequest: async (userId) => {
    set({ loading: true });
    try {
      await deleteUserFromRequest(userId);
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
