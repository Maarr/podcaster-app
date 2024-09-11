import { PodcastRepository } from '@/infrastructure/repositories/podcast.repository'
import { Podcast } from '../entities/podcast.entity'

export class GetPodcastDetail {
  private repository: PodcastRepository

  constructor(repository: PodcastRepository) {
    this.repository = repository
  }

  async invoke(podcastId: string): Promise<Podcast> {
    return await this.repository.getPodcastDetail(podcastId)
  }
}
