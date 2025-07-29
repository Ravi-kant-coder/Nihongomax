import { create } from "zustand";
import userStore from "@/store/userStore";
import {
  createPost,
  getAllPosts,
  getAllStory,
  getAllUserPosts,
  likePost,
  sharePost,
  createStory,
  commentsPost,
  deletePost,
  deleteStory,
  updatePostContent as updatePostContentAPI,
  deleteComment as deleteCommentAPI,
  updateComment as updateCommentAPI,
} from "@/service/post.service";

export const usePostStore = create((set) => ({
  posts: [],
  userPosts: [],
  story: [],
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
      await deleteCommentAPI(postId, commentId);

      set((state) => ({
        posts: state.posts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== commentId
            ),
          };
        }),
        userPosts: state.userPosts.map((post) => {
          if (post._id !== postId) return post;

          return {
            ...post,
            comments: post.comments.filter(
              (comment) => comment._id !== commentId
            ),
          };
        }),
      }));
    } catch (error) {
      console.error("Zustand Delete Error:", error);
      set({ error });
    }
  },

  deleteUserStory: async (storyId) => {
    set({ loading: true });
    try {
      await deleteStory(storyId);
      set((state) => ({
        story: state.story.filter((st) => st._id !== storyId),
        loading: false,
      }));
    } catch (error) {
      set({ error, loading: false });
      console.error("Zustand nahi kar paya story delete", error);
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

  fetchStoryPost: async () => {
    set({ loading: true });
    try {
      const story = await getAllStory();
      set({ story, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCreatePost: async (postData) => {
    set({ loading: true });
    try {
      const newPostRaw = await createPost(postData);
      const { user } = userStore.getState();
      const newPost = {
        ...newPostRaw,
        user: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));
      return newPost; // Return the new post for further use
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  updatePostContent: async (postId, newContent) => {
    try {
      await updatePostContentAPI(postId, newContent);
      set((state) => ({
        posts: state.posts.map((post) =>
          post._id === postId ? { ...post, content: newContent } : post
        ),
        userPosts: state.userPosts.map((post) =>
          post._id === postId ? { ...post, content: newContent } : post
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
              comment._id === commentId
                ? { ...comment, text: newText }
                : comment
            ),
          };
        }),
        userPosts: state.userPosts.map((post) => {
          if (post._id !== postId) return post;
          return {
            ...post,
            comments: post.comments.map((comment) =>
              comment._id === commentId
                ? { ...comment, text: newText }
                : comment
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
            : post
        ),
      }));
    } catch (error) {
      set({ error, loading: false });
    }
  },

  handleCreateStory: async (storyData) => {
    set({ loading: true });
    try {
      const newStoryRaw = await createStory(storyData);
      const { user } = userStore.getState();
      const newStory = {
        ...newStoryRaw,
        user: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
      set((state) => ({
        story: [newStory, ...state.story],
        loading: false,
      }));

      return newStory;
    } catch (error) {
      set({ error, loading: false });
      throw error;
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
