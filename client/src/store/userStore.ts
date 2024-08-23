import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface User {
  id?: number;
  name?: string;
  email?: string;
  bio?: string;
  image: string;
}

export interface UserActions {
  setUser: (user: User) => void;
  logout: () => void;
}

export const useUserStore = create<User & UserActions>()(
  devtools(
    persist(
      (set) => ({
        id: undefined,
        name: '',
        email: '',
        bio: '',
        image: '',
        setUser: (user) => set(user),
        logout: () => {
          set({
            id: undefined,
            name: '',
            email: '',
            bio: '',
            image: '',
          });
        },
      }),
      {
        name: 'user-storage',
      },
    ),
  ),
);
