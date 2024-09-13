import { useEffect, useState } from 'react'
import { usePodcastStore } from './store/usePodcastsStore.store'
import PodcastItem from './components/PodcastListItem'
import Layout from '@/ui/layouts/Layout'
import { usePodcasts } from '@/ui/hooks/usePodcasts'
import { Podcast } from '@/domain/entities/podcast.entity'

function PodcastList() {
  const {
    podcasts: storedPodcasts,
    setPodcasts,
    searchTerm,
    setSearchTerm,
  } = usePodcastStore()

  const { fetchPodcasts, loading, error } = usePodcasts()

  const [filteredPodcasts, setFilteredPodcasts] = useState<Podcast[]>([])

  const loadPodcasts = async () => {
    const podcasts = await fetchPodcasts()
    setPodcasts(podcasts ?? [])
  }

  const getFilteredPodcasts = () => {
    return storedPodcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        podcast.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  useEffect(() => {
    if (!storedPodcasts.length) loadPodcasts()
  }, [])

  useEffect(() => {
    if (!searchTerm) {
      setFilteredPodcasts(storedPodcasts)
      return
    }
    setFilteredPodcasts(getFilteredPodcasts())
  }, [storedPodcasts, searchTerm])

  return (
    <Layout>
      <div className="flex justify-end items-center gap-x-4">
        <span className="bg-sky-600 text-white p-1 rounded-md text-lg font-semibold">
          {filteredPodcasts.length}
        </span>
        <input
          type="text"
          placeholder="Filter podcasts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="px-3 py-2 rounded-md bg-white text-black border border-gray-300 box-shadow-md"
        />
      </div>
      {loading && <p>Loading...</p>}
      {!loading && error && <p>{error}</p>}
      {!loading && filteredPodcasts.length > 0 && (
        <div className="container mx-auto mt-8 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-16">
            {filteredPodcasts.map((podcast) => (
              <PodcastItem key={podcast.id} podcast={podcast} />
            ))}
          </div>
        </div>
      )}
    </Layout>
  )
}

export default PodcastList
