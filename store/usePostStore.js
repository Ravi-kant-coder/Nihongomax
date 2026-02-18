import { create } from "zustand";
import {
  createPost,
  getAllPosts,
  getAllUserPosts,
  likePost,
  commentsPost,
  deletePost,
  updatePostContent as updatePostContentAPI,
  deleteComment as deleteCommentAPI,
  updateComment as updateCommentAPI,
  savePost,
  getSavedPosts,
} from "@/service/post.service";

export const usePostStore = create((set, get) => ({
  posts: [],
  userPosts: [],
  loading: false,
  error: null,
  loadingComments: {},
  savedPosts: [],
  page: 1,
  hasMore: true,

  // 🔥 Reset feed (important for navigation fixes)
  resetPosts: () => {
    set({
      posts: [],
      page: 1,
      hasMore: true,
    });
  },

  // 🔥 Safely update post in all 3 pages
  updatePostEverywhere: (postId, updater) => {
    set((state) => {
      const updateList = (list = []) =>
        list.map((post) => (post._id === postId ? updater(post) : post));

      return {
        posts: updateList(state.posts),
        userPosts: updateList(state.userPosts),
        savedPosts: updateList(state.savedPosts),
      };
    });
  },

  // 🔥 DUPLICATE-PROOF PAGINATION
  fetchPost: async () => {
    const { page, hasMore, loading } = get();
    if (!hasMore || loading) return;

    set({ loading: true });

    try {
      const data = await getAllPosts(page);

      set((state) => {
        const existingIds = new Set(state.posts.map((p) => p._id));

        const filteredNewPosts = (data.posts || []).filter(
          (p) => !existingIds.has(p._id),
        );

        return {
          posts: [...state.posts, ...filteredNewPosts],
          page: state.page + 1,
          hasMore: data.hasMore,
          loading: false,
        };
      });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  fetchUserPost: async (userId) => {
    set({ loading: true });
    try {
      const userPosts = await getAllUserPosts(userId);

      // Deduplicate just in case
      const unique = Array.from(
        new Map(userPosts.map((p) => [p._id, p])).values(),
      );

      set({ userPosts: unique, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCreatePost: async (postData) => {
    set({ loading: true, error: null });

    try {
      const newPost = await createPost(postData);

      set((state) => {
        const exists = state.posts.some((p) => p._id === newPost._id);

        return {
          posts: exists ? state.posts : [newPost, ...state.posts],
          loading: false,
        };
      });

      return newPost;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  deleteUserPost: async (postId) => {
    set({ loading: true });

    try {
      await deletePost(postId);

      set((state) => ({
        posts: state.posts.filter((p) => p._id !== postId),
        userPosts: state.userPosts.filter((p) => p._id !== postId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCommentPost: async (postId, text) => {
    set((state) => ({
      loadingComments: {
        ...state.loadingComments,
        [postId]: true,
      },
    }));

    try {
      const updatedPost = await commentsPost(postId, { text });
      get().updatePostEverywhere(postId, () => updatedPost);
    } catch (error) {
      set({ error });
    } finally {
      set((state) => ({
        loadingComments: {
          ...state.loadingComments,
          [postId]: false,
        },
      }));
    }
  },

  deleteComment: async (postId, commentId) => {
    try {
      await deleteCommentAPI(postId, commentId);

      get().updatePostEverywhere(postId, (post) => ({
        ...post,
        comments: (post.comments || []).filter((c) => c._id !== commentId),
      }));
    } catch (error) {
      set({ error });
    }
  },

  updateComment: async (postId, commentId, newText) => {
    try {
      await updateCommentAPI(postId, commentId, newText);

      get().updatePostEverywhere(postId, (post) => ({
        ...post,
        comments: (post.comments || []).map((c) =>
          c._id === commentId ? { ...c, text: newText } : c,
        ),
      }));
    } catch (error) {
      set({ error });
    }
  },

  updatePostContent: async (postId, newContent) => {
    try {
      await updatePostContentAPI(postId, newContent);

      get().updatePostEverywhere(postId, (post) => ({
        ...post,
        content: newContent,
      }));
    } catch (error) {
      set({ error });
    }
  },

  handleLikePost: async (postId) => {
    try {
      const updated = await likePost(postId);
      get().updatePostEverywhere(postId, () => updated);
    } catch (error) {
      set({ error });
    }
  },

  handleSavePost: async (postId) => {
    try {
      const updated = await savePost(postId);

      set((state) => {
        const updateList = (list = []) =>
          list.map((post) => (post._id === postId ? updated : post));

        const exists = state.savedPosts.some((post) => post._id === postId);

        let newSavedPosts;

        if (updated.isSaved) {
          newSavedPosts = exists
            ? state.savedPosts.map((post) =>
                post._id === postId ? updated : post,
              )
            : [updated, ...state.savedPosts];
        } else {
          newSavedPosts = state.savedPosts.filter(
            (post) => post._id !== postId,
          );
        }

        return {
          posts: updateList(state.posts),
          userPosts: updateList(state.userPosts),
          savedPosts: newSavedPosts,
        };
      });
    } catch (error) {
      set({ error });
    }
  },

  fetchSavedPosts: async () => {
    try {
      const savedPosts = await getSavedPosts();
      set({ savedPosts });
    } catch (error) {
      console.error("Fetch saved posts error:", error);
    }
  },

  resetAll: () => {
    set({
      posts: [],
      userPosts: [],
      loading: false,
      error: null,
      loadingComments: {},
      page: 1,
      hasMore: true,
    });
  },
}));
