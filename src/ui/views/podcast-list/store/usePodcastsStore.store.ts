import { Podcast } from '@/domain/entities/podcast.entity'
import { GetPodcasts } from '@/domain/use-cases/getPodcasts.usecase'
import { ApiPodcastRepository } from '@/infrastructure/repositories/apiPodcast.repository'
import { create } from 'zustand'

interface PodcastState {
  podcasts: Podcast[]
  fetchPodcasts: () => Promise<void>
}

const getPodcasts = new GetPodcasts(new ApiPodcastRepository())

export const usePodcastStore = create<PodcastState>((set) => ({
  podcasts: [],
  fetchPodcasts: async () => {
    const podcasts = await getPodcasts.invoke()
    set({ podcasts })
  },
}))
