import { Podcast } from '@/domain/entities/podcast.entity'
import { PodcastRepository } from './podcast.repository'
import { ApiPodcastDto } from '../dtos/apiPodcast.dto'
import { getFromCache, saveToCache } from '../cache/localStorageCache.util'
import { ApiPodcastDetailDto } from '../dtos/apiPodcastDetail.dto'
import { Episode } from '@/domain/entities/episode.entity'

export class ApiPodcastRepository implements PodcastRepository {
  private readonly GET_PODCASTS_URL =
    'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json'
  private readonly PODCASTS_CACHE_KEY = 'podcasts'

  private readonly GET_PODCAST_DETAIL_URL = '/api/lookup' // use api because of the proxy I added in vite.config.ts to avoid CORS problems
  private readonly PODCAST_CACHE_KEY = 'podcast'

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

  async getPodcastDetail(podcastId: string): Promise<Podcast> {
    const cachedDetail = getFromCache<Podcast>(
      `${this.PODCAST_CACHE_KEY}_${podcastId}`
    )
    if (cachedDetail) return cachedDetail

    const params = new URLSearchParams({ id: podcastId })

    const response = await fetch(
      `${this.GET_PODCAST_DETAIL_URL}?${params.toString()}`
    )
    const { results } = await response.json()
    if (!results || !results.length)
      throw new Error('Error getting information from the podcast')

    const { collectionName, artistName, feedUrl }: ApiPodcastDetailDto =
      results[0]
    const { description, episodes, imageUrl } =
      await this.getPodcastFeedData(feedUrl)

    const podcast: Podcast = {
      id: podcastId,
      imageUrl,
      title: collectionName,
      author: artistName,
      description,
      episodes,
    }

    return podcast
  }

  private async getPodcastFeedData(feedUrl: string) {
    const response = await fetch(feedUrl)
    const feedXmlText = await response.text()
    const xmlDoc = new DOMParser().parseFromString(
      feedXmlText,
      'application/xml'
    )

    const description = xmlDoc.querySelector('description')?.innerHTML ?? ''
    const imageUrl = xmlDoc.querySelector('url')?.textContent ?? ''

    const items = xmlDoc.querySelectorAll('item')
    const episodes: Episode[] = Array.from(items).map((item, index) => ({
      id: item.querySelector('guid')?.textContent ?? index.toString(),
      title: item.querySelector('title')?.textContent ?? '',
      publishDate: item.querySelector('pubDate')?.textContent ?? '',
      duration: item.querySelector('duration')?.textContent ?? '',
    }))

    return { description, episodes, imageUrl }
  }
}
