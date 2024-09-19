import { GetPodcastDetail } from '@/domain/use-cases/getPodcastDetail.usecase'
import { ApiPodcastRepository } from '@/infrastructure/repositories/apiPodcast.repository'
import { useCallback, useState } from 'react'

const getPodcastDetail = new GetPodcastDetail(new ApiPodcastRepository())

export function useFetchPodcastDetail(podcastId: string) {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPodcastDetail = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await getPodcastDetail.invoke(podcastId)
      return result
    } catch (err) {
      setError('Failed to fetch podcast detail')
    } finally {
      setLoading(false)
    }
  }, [podcastId])

  return { fetchPodcastDetail, loading, error }
}
