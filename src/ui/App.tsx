import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PodcastList from '@/ui/views/podcast-list/PodcastList'
import PodcastDetail from '@/ui/views/podcast-detail/PodcastDetail'
import EpisodeDetail from '@/ui/views/episode-detail/EpisodeDetail'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PodcastList />} />
        <Route path="/podcast/:podcastId" element={<PodcastDetail />} />
        <Route
          path="/podcast/:podcastId/episode/:episodeId"
          element={<EpisodeDetail />}
        />
      </Routes>
    </Router>
  )
}

export default App
