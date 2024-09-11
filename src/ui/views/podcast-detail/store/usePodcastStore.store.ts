import { Podcast } from '@/domain/entities/podcast.entity'
import { GetPodcastDetail } from '@/domain/use-cases/getPodcastDetail.usecase'
import { ApiPodcastRepository } from '@/infrastructure/repositories/apiPodcast.repository'
import { create } from 'zustand'

interface PodcastState {
  podcastDetail: Podcast | null
  fetchPodcastDetail: (podcastId: string) => Promise<void>
}

const getPodcastDetail = new GetPodcastDetail(new ApiPodcastRepository())

const usePodcastStore = create<PodcastState>((set) => ({
  podcastDetail: null,
  fetchPodcastDetail: async (podcastId: string): Promise<void> => {
    const detail = await getPodcastDetail.invoke(podcastId)
    set({ podcastDetail: detail })
  },
}))

export default usePodcastStore
