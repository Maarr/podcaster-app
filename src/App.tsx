import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import PodcastList from '@/ui/views/podcast-list/PodcastList'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PodcastList />} />
      </Routes>
    </Router>
  )
}

export default App
