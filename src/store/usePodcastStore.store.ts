import { Podcast } from '@/domain/entities/podcast.entity'
import { create } from 'zustand'

interface PodcastState {
  podcastDetail: Podcast | null
  setPodcastDetail: (podcast: Podcast | null) => void
}

const usePodcastStore = create<PodcastState>((set) => ({
  podcastDetail: null,
  setPodcastDetail: (podcastDetail: Podcast | null) => set({ podcastDetail }),
}))

export default usePodcastStore
