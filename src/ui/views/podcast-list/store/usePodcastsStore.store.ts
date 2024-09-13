import { Podcast } from '@/domain/entities/podcast.entity'
import { create } from 'zustand'

interface PodcastState {
  podcasts: Podcast[]
  setPodcasts: (podcasts: Podcast[]) => void
  searchTerm: string
  setSearchTerm: (term: string) => void
}

export const usePodcastStore = create<PodcastState>((set) => ({
  podcasts: [],
  setPodcasts: (podcasts) => set({ podcasts }),
  searchTerm: '',
  setSearchTerm: (term: string) => set({ searchTerm: term }),
}))
