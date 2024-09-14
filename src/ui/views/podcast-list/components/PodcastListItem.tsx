import { Podcast } from '@/domain/entities/podcast.entity'
import useGlobalStore from '@/ui/store/useGlobalStore.store'
import { useNavigate } from 'react-router-dom'

interface PodcastItemProps {
  podcast: Podcast
}

function PodcastItem({ podcast }: PodcastItemProps) {
  const { setTransitioning } = useGlobalStore()
  const navigate = useNavigate()

  const handleClick = () => {
    setTransitioning(true)
    navigate(`/podcast/${podcast.id}`)
  }

  return (
    <div
      className="relative bg-white rounded shadow-md hover:cursor-pointer"
      data-testid="podcast-list-item"
      onClick={handleClick}
    >
      <div className="relative">
        <img
          src={podcast.imageUrl}
          alt={podcast.title}
          className="absolute top-[-30px] left-1/2 transform -translate-x-1/2 w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div className="pt-16 p-4">
        <h2 className="text-xl font-semibold mb-2 uppercase text-center">
          {podcast.title}
        </h2>
        <p className="text-gray-600 text-center">Author: {podcast.author}</p>
      </div>
    </div>
  )
}

export default PodcastItem
