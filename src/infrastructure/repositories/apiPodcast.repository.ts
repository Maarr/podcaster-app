import { Podcast } from '@/domain/entities/podcast.entity'
import { PodcastRepository } from './podcast.repository'
import { ApiPodcastDto } from '../dtos/apiPodcast.dto'

export class ApiPodcastRepository implements PodcastRepository {
  private readonly GET_PODCASTS_URL =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'

  async getPodcasts(): Promise<Podcast[]> {
    const response = await fetch(this.GET_PODCASTS_URL)
    const data = await response.json()

    const podcasts: Podcast[] = data.feed.entry.map((dto: ApiPodcastDto) => ({
      id: dto.id.attributes['im:id'],
      imageUrl: dto['im:image'][0].label,
      title: dto['im:name'].label,
      author: dto['im:artist'].label,
      description: dto.summary.label,
    }))

    return podcasts
  }
}
