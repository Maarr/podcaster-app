import { ApiPodcastRepository } from '@/infrastructure/repositories/apiPodcast.repository'
import { useState, useCallback } from 'react'

const podcastRepository = new ApiPodcastRepository()

export function useFetchPodcasts() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const fetchPodcasts = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const result = await podcastRepository.getPodcasts()
      return result
    } catch (err) {
      setError('Failed to fetch podcasts')
    } finally {
      setLoading(false)
    }
  }, [])

  return { fetchPodcasts, loading, error }
}
