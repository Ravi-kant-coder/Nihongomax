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
} from "@/service/post.service";
import toast from "react-hot-toast";
import { create } from "zustand";
import userStore from "@/store/userStore"; // adjust path as needed
export const usePostStore = create((set) => ({
  posts: [],
  userPosts: [],
  story: [],
  loading: false,
  error: null,

  //fetchPost
  fetchPost: async () => {
    set({ loading: true });
    try {
      const posts = await getAllPosts();
      set({ posts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },

  //delete user posts
  deleteUserPost: async (userId) => {
    set({ loading: true });
    try {
      const deletedPost = await deletePost(userId);
      set({ post, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
    set((state) => ({
      posts: state.posts.filter((p) => p._id !== id),
    }));
  },

  //fetch user posts
  fetchUserPost: async (userId) => {
    set({ loading: true });
    try {
      const userPosts = await getAllUserPosts(userId);
      set({ userPosts, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
  //fetch all story
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

      // Get user from userStore
      const { user } = userStore.getState();

      // Inject user info into the post
      const newPost = {
        ...newPostRaw,
        user: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };

      // Add to Zustand posts
      set((state) => ({
        posts: [newPost, ...state.posts],
        loading: false,
      }));

      return newPost; // optional, still returns for chaining
    } catch (error) {
      set({ error, loading: false });
      throw error;
    }
  },

  handleCreateStory: async (storyData) => {
    set({ loading: true });
    try {
      const newStoryRaw = await createStory(storyData);
      // Get user from userStore
      const { user } = userStore.getState();
      // Inject user info into the Story
      const newStory = {
        ...newStoryRaw,
        user: {
          _id: user._id,
          username: user.username,
          profilePicture: user.profilePicture,
        },
      };
      // Add to Zustand Story
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

  //create a new story
  handleLikePost: async (postId) => {
    set({ loading: true });
    try {
      await likePost(postId);
    } catch (error) {
      set({ error, loading: false });
    }
  },

  //create a new story
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
      toast.success("Comments added successfully");
    } catch (error) {
      set({ error, loading: false });
    }
  },

  //create a new story
  handleSharePost: async (postId) => {
    set({ loading: true });
    try {
      await sharePost(postId);
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));
