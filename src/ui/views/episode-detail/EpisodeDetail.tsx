import Layout from '@/ui/layouts/Layout'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { Episode } from '@/domain/entities/episode.entity'
import usePodcastStore from '../../../store/usePodcastStore.store'
import { useFetchPodcastDetail } from '@/infrastructure/hooks/useFetchPodcastDetail'
import useGlobalStore from '@/store/useGlobalStore.store'
import EpisodeDetailUI from './components/EpisodeDetailUI'

function EpisodeDetail() {
  const { podcastId, episodeId } = useParams()
  const { setTransitioning } = useGlobalStore()

  const { podcastDetail: podcast, setPodcastDetail } = usePodcastStore()
  const { fetchPodcastDetail, loading, error } = useFetchPodcastDetail(
    podcastId ?? ''
  )

  const [episode, setEpisode] = useState<Episode>()

  const getEpisodeById = (episodes: Episode[]) => {
    return episodes.find((episode: Episode) => episode.id === episodeId)
  }

  const getEpisodeDetail = async () => {
    if (!podcastId || !episodeId) return

    // Get from store
    if (podcast && podcast.id == podcastId) {
      const { episodes = [] } = podcast
      return getEpisodeById(episodes)
    }

    // Get from API
    const podcastData = await fetchPodcastDetail()
    if (podcastData) {
      const { episodes = [] } = podcastData
      setPodcastDetail(podcastData)
      return getEpisodeById(episodes)
    }
  }

  const loadEpisodeDetail = async () => {
    const episode = await getEpisodeDetail()
    setEpisode(episode)
    setTransitioning(false)
  }

  useEffect(() => {
    loadEpisodeDetail()
  }, [podcastId, episodeId])

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <p>{error}</p>
      </Layout>
    )
  }

  if (!episode || !podcast) {
    return (
      <Layout>
        <p>Episode not found</p>
      </Layout>
    )
  }

  return (
    <EpisodeDetailUI
      loading={loading}
      error={error}
      episode={episode}
      podcast={podcast}
    />
  )
}

export default EpisodeDetail
