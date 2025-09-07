import { create } from "zustand";
import { persist } from "zustand/middleware";
import { likePost } from "@/service/post.service";

const useLikeStore = create(
  persist(
    (set, get) => ({
      likePosts: new Set(),
      loadLikes: () => {
        const saved = localStorage.getItem("likePosts");
        if (saved) {
          set({ likePosts: new Set(JSON.parse(saved)) });
        }
      },
      isLiked: (postId) => get().likePosts.has(postId),
      handleLike: async (postId, fetchPost) => {
        if (get().likePosts.has(postId)) return;
        const updatedLikePosts = new Set(get().likePosts);
        updatedLikePosts.add(postId);
        set({ likePosts: updatedLikePosts });
        localStorage.setItem(
          "likePosts",
          JSON.stringify(Array.from(updatedLikePosts))
        );
        try {
          await likePost(postId);
          if (fetchPost) {
            await fetchPost();
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    {
      name: "like-storage",
      partialize: (state) => ({
        likePosts: Array.from(state.likePosts),
      }),
    }
  )
);

export default useLikeStore;
