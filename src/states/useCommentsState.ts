import { create } from 'zustand';

type CommentsQuantityState = {
  bears: number
  increase: (by: number) => void
}

export const useBearStore = create<CommentsQuantityState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))