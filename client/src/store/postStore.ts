import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PostState {
  likedPosts: Array<{
    id: number;
    userId: number;
    postId: number;
  }>;
  likedPost: (post: { id: number; userId: number; postId: number }) => void;
  unlikePost: (postId: number) => void;
}

export const usePostStore = create<PostState>()(
  persist(
    (set) => ({
      likedPosts: [],
      likedPost: (post) => {
        set((state) => {
          return { likedPosts: [...state.likedPosts, post] };
        });
      },
      unlikePost: (postId) =>
        set((state) => ({
          likedPosts: state.likedPosts.filter((p) => p.postId !== postId),
        })),
    }),
    {
      name: 'post-storage',
    },
  ),
);
