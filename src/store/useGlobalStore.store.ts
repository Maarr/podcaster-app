import { create } from 'zustand'

interface GlobalState {
  transitioning: boolean
  setTransitioning: (transitioning: boolean) => void
}

const useGlobalStore = create<GlobalState>((set) => ({
  transitioning: false,
  setTransitioning: (transitioning: boolean) => set({ transitioning }),
}))

export default useGlobalStore
