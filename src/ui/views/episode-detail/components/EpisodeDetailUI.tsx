import Layout from '@/ui/layouts/Layout'
import PodcastCard from '@/ui/components/PodcastCard'
import { Episode } from '@/domain/entities/episode.entity'
import { hasHtml } from '@/ui/utils/hasHtml.util'
import { Podcast } from '@/domain/entities/podcast.entity'

interface EpisodeDetailUIProps {
  podcast: Podcast
  episode: Episode
  loading: boolean
  error: string | null
}

function EpisodeDetailUI({
  podcast,
  episode,
  loading,
  error,
}: EpisodeDetailUIProps) {
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

  const { title, description, audioUrl } = episode

  return (
    <Layout>
      <div className="flex flex-col lg:flex-row">
        <aside className="p-4 lg:mr-10">
          <PodcastCard podcast={podcast} />
        </aside>
        <div className="p-4">
          <div className="max-w-3xl shadow-md flex flex-col gap-y-2 p-6">
            <h1 className="text-lg font-bold">{title}</h1>
            {hasHtml(description) ? (
              <div
                className="italic"
                dangerouslySetInnerHTML={{ __html: description }}
              />
            ) : (
              <p className="italic">{description}</p>
            )}
            <audio controls className="w-full mt-2">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default EpisodeDetailUI
