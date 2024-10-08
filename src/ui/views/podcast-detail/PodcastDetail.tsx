import Layout from '@/ui/layouts/Layout'
import { useNavigate, useParams } from 'react-router-dom'
import usePodcastStore from '../../../store/usePodcastStore.store'
import { useEffect } from 'react'
import PodcastCard from '@/ui/components/PodcastCard'
import { Episode } from '@/domain/entities/episode.entity'
import { formatDate, formatDuration } from '@/ui/utils/date.util'
import { useFetchPodcastDetail } from '@/infrastructure/hooks/useFetchPodcastDetail'
import useGlobalStore from '@/store/useGlobalStore.store'

function PodcastDetail() {
  const { podcastId } = useParams()
  const navigate = useNavigate()
  const { setTransitioning } = useGlobalStore()

  const { podcastDetail: podcast, setPodcastDetail } = usePodcastStore()
  const { fetchPodcastDetail, loading, error } = useFetchPodcastDetail(
    podcastId ?? ''
  )

  const loadPodcastDetail = async () => {
    const podcast = await fetchPodcastDetail()
    setPodcastDetail(podcast ?? null)
    setTransitioning(false)
  }

  useEffect(() => {
    if (podcastId) {
      loadPodcastDetail()
    }
  }, [podcastId])

  if (loading) {
    return (
      <Layout>
        <div>Loading...</div>
      </Layout>
    )
  }

  if (error || !podcast) {
    return (
      <Layout>
        <p>{error ?? 'Podcast not found'}</p>
      </Layout>
    )
  }

  const { episodes } = podcast

  const handleClickEpisode = (episode: Episode) => {
    setTransitioning(true)
    navigate(`/podcast/${podcast.id}/episode/${episode.id}`)
  }

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <aside className="p-4 lg:mr-10">
          <PodcastCard podcast={podcast} />
        </aside>

        {episodes && (
          <div className="p-4">
            <div className="shadow-md p-4">
              <h3 className="text-xl font-bold">Episodes: {episodes.length}</h3>
            </div>
            <div className="shadow-md p-4 mt-4">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border-b border-gray-300 p-2 text-left">
                      Title
                    </th>

                    <th className="border-b border-gray-300 p-2 text-left">
                      Date
                    </th>
                    <th className="border-b border-gray-300 p-2 text-left">
                      Duration
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {episodes.map((episode, index) => (
                    <tr
                      key={index}
                      className={`border-b border-gray-300 ${index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
                    >
                      <td
                        className="p-2 text-sky-600 hover:text-sky-500 hover:cursor-pointer"
                        onClick={() => handleClickEpisode(episode)}
                      >
                        {episode.title}
                      </td>
                      <td className="p-2">{formatDate(episode.publishDate)}</td>
                      <td className="p-2">
                        {formatDuration(episode.duration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  )
}

export default PodcastDetail
