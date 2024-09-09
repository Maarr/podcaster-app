import { useEffect } from 'react'
import { usePodcastStore } from './store/usePodcastsStore.store'
import PodcastItem from './components/PodcastListItem'
import Layout from '@/ui/layouts/Layout'

function PodcastList() {
  const { podcasts, fetchPodcasts } = usePodcastStore()

  useEffect(() => {
    fetchPodcasts()
  }, [])

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
          {podcasts.map((podcast) => (
            <PodcastItem key={podcast.id} podcast={podcast} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default PodcastList
