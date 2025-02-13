import { create } from 'zustand';

type CommentsQuantityState = {
  likes: number
  increase: (by: number) => void
}

export const useLikes = create<CommentsQuantityState>()((set) => ({
  likes: 0,
  increase: (by) => set((state) => ({ likes: state.likes + by })),
}))