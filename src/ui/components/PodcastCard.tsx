import { Podcast } from '@/domain/entities/podcast.entity'
import { useNavigate } from 'react-router-dom'
import { hasHtml } from '@/ui/utils/hasHtml.util'
import useGlobalStore from '@/store/useGlobalStore.store'

interface PodcastCardProps {
  podcast: Podcast
}

function PodcastCard({ podcast }: PodcastCardProps) {
  const { setTransitioning } = useGlobalStore()
  const navigate = useNavigate()

  const { id, imageUrl, title, author, description } = podcast

  const handleClick = () => {
    setTransitioning(true)
    navigate(`/podcast/${id}`)
  }

  return (
    <div className="w-full lg:max-w-sm mx-auto bg-white shadow-md">
      <div className="flex justify-center pa-6">
        <img
          src={imageUrl}
          alt={title}
          className="w-40 h-40 rounded-md hover:cursor-pointer"
          onClick={handleClick}
        />
      </div>
      <div className="p-4">
        <div className="border-t border-gray-200 my-2"></div>
        <h2
          className="text-lg font-bold hover:cursor-pointer"
          onClick={handleClick}
        >
          {title}
        </h2>
        <p className="italic mb-2 hover:cursor-pointer" onClick={handleClick}>
          by {author}
        </p>
        <div className="border-t border-gray-200 my-2"></div>
        <p className="text-md font-bold">Description:</p>
        {hasHtml(description) ? (
          <div
            className="italic"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        ) : (
          <p className="italic">{description}</p>
        )}
      </div>
    </div>
  )
}

export default PodcastCard
