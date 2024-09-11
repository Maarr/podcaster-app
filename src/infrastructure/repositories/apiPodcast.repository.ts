import { Podcast } from '@/domain/entities/podcast.entity'
import { PodcastRepository } from './podcast.repository'
import { ApiPodcastDto } from '../dtos/apiPodcast.dto'
import { getFromCache, saveToCache } from '../cache/localStorageCache.util'

export class ApiPodcastRepository implements PodcastRepository {
  private readonly GET_PODCASTS_URL =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
  private readonly PODCASTS_CACHE_KEY = 'podcasts'

  async getPodcasts(): Promise<Podcast[]> {
    const cachedPodcasts = getFromCache<Podcast[]>(this.PODCASTS_CACHE_KEY)
    if (cachedPodcasts) return cachedPodcasts

    const response = await fetch(this.GET_PODCASTS_URL)
    const data = await response.json()

    const podcasts: Podcast[] = data.feed.entry.map((dto: ApiPodcastDto) => ({
      id: dto.id.attributes['im:id'],
      imageUrl: dto['im:image'][0].label,
      title: dto['im:name'].label,
      author: dto['im:artist'].label,
      description: dto.summary.label,
    }))

    saveToCache<Podcast[]>(this.PODCASTS_CACHE_KEY, podcasts)
    return podcasts
  }
}
