import Layout from '@/ui/layouts/Layout'
import { useParams } from 'react-router-dom'

function PodcastDetail() {
  const { podcastId } = useParams()

  return (
    <Layout>
      <p>TODO: {podcastId}</p>
    </Layout>
  )
}

export default PodcastDetail
