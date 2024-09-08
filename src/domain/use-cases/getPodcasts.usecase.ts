import { PodcastRepository } from '@/infrastructure/repositories/podcast.repository'
import { Podcast } from '../entities/podcast.entity'

export class GetPodcasts {
  private repository: PodcastRepository

  constructor(repository: PodcastRepository) {
    this.repository = repository
  }

  async invoke(): Promise<Podcast[]> {
    return await this.repository.getPodcasts()
  }
}
