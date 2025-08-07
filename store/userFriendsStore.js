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

  fetchFriendRequest: async () => {
    set({ loading: true });
    try {
      const friend = await getAllFriendsRequest();
      set({ friendRequest: friend.data, loading: false });
    } catch (error) {
      set({ error, loading: false });
    } finally {
      set({ loading: false });
    }
  },

  fetchFriendSuggestion: async () => {
    set({ loading: true });
    try {
      const friend = await getAllFriendsSuggestion();
      set({ friendSuggestion: friend.data, isLoading: false });
    } catch (error) {
      set({ error, loading: false });
    } finally {
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
