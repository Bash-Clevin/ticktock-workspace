import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface GeneralState {
  isLoginOpen: boolean;
  isEditProfileModalOpen: boolean;
  selectedPosts: null;
  ids: null;
  posts: null;
}

export interface GeneralActions {
  setLoginIsOpen: (isLoginOpen: boolean) => void;
  setIsEditProfileOpen: () => void;
}

export const useGeneralStore = create<GeneralState & GeneralActions>()(
  devtools(
    persist(
      (set) => ({
        isLoginOpen: false,
        isEditProfileModalOpen: false,
        selectedPosts: null,
        ids: null,
        posts: null,
        setLoginIsOpen: (isLoginOpen: boolean) => {
          set({ isLoginOpen });
        },
        setIsEditProfileOpen: () => {
          return set((state) => ({
            isEditProfileModalOpen: !state.isEditProfileModalOpen,
          }));
        },
      }),
      {
        name: 'general-storage',
      },
    ),
  ),
);
