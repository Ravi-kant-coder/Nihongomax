import { create } from "zustand";
import {
  createPost,
  getAllPosts,
  getAllUserPosts,
  likePost,
  sharePost,
  commentsPost,
  deletePost,
  updatePostContent as updatePostContentAPI,
  deleteComment,
  updateComment as updateCommentAPI,
} from "@/service/post.service";

export const usePostStore = create((set) => ({
  posts: [],
  userPosts: [],
  loading: false,
  error: null,

  fetchPost: async () => {
    set({ loading: true });
    try {
      const posts = await getAllPosts();
      set({ posts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCreatePost: async (postData) => {
    set({ loading: true, error: null });
    try {
      const newPost = await createPost(postData);
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
      return newPost;
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  fetchUserPost: async (userId) => {
    set({ loading: true });
    try {
      const userPosts = await getAllUserPosts(userId);
      set({ userPosts, loading: false });
    } catch (error) {
      set({ error, loading: false });
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
      console.error("Zustand nahi kar paya post delete", error);
    }
  },

  deleteComment: async (postId, commentId) => {
    try {
      await deleteComment(postId, commentId);

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== commentId,
            ),
          };
        }),
        userPosts: state.userPosts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== commentId,
            ),
          };
        }),
      }));
    } catch (error) {
      console.error("Zustand Delete Error:", error);
      set({ error });
    }
  },

  updatePostContent: async (postId, newContent) => {
    try {
      await updatePostContentAPI(postId, newContent);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, ...newContent } : post,
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === postId ? { ...post, ...newContent } : post,
        ),
      }));
    } catch (error) {
      console.error("Zustand Update Error:", error);
      set({ error });
    }
  },

  updateComment: async (postId, commentId, newText) => {
    try {
      await updateCommentAPI(postId, commentId, newText);
      set((state) => ({
        posts: state.posts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment._id === commentId ? { ...comment, ...newText } : comment,
            ),
          };
        }),
        userPosts: state.userPosts.map((post) => {
          if (post._id !== postId) return post;
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment._id === commentId ? { ...comment, ...newText } : comment,
            ),
          };
        }),
      }));
    } catch (error) {
      console.error("Zustand Update Error:", error);
      set({ error });
    }
  },

  handleCommentPost: async (postId, text) => {
    set({ loading: true });
    try {
      const newComments = await commentsPost(postId, { text });
      set((state) => ({
        posts: state.posts.map((post) =>
          post?._id === postId
            ? { ...post, comments: [...post.comments, newComments] }
            : post,
        ),
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleLikePost: async (postId) => {
    set({ loading: true });
    try {
      await likePost(postId);
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleSharePost: async (postId) => {
    set({ loading: true });
    try {
      await sharePost(postId);
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
