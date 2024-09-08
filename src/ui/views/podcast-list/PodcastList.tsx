import { useEffect } from 'react'
import { usePodcastStore } from './store/usePodcastsStore.store'
import PodcastItem from './components/PodcastListItem'

function PodcastList() {
  const { podcasts, fetchPodcasts } = usePodcastStore()

  useEffect(() => {
    fetchPodcasts()
  }, [])

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {podcasts.map((podcast) => (
          <PodcastItem key={podcast.id} podcast={podcast} />
        ))}
      </div>
    </div>
  )
}

export default PodcastList
