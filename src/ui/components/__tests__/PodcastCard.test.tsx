import { render, screen } from '@testing-library/react'
import { Podcast } from '@/domain/entities/podcast.entity'
import PodcastCard from '../PodcastCard'

const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

describe('PodcastCard', () => {
  const mockPodcast: Podcast = {
    id: '1',
    imageUrl: 'http://example.com/image.jpg',
    title: 'Sample Podcast',
    author: 'John Doe',
    description: 'This is a sample description.',
  }

  test('renders correctly', () => {
    render(<PodcastCard podcast={mockPodcast} />)

    const { title, author, description } = mockPodcast

    expect(screen.getByAltText(title)).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(`by ${author}`)).toBeInTheDocument()
    expect(screen.getByText('Description:')).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  test('navigates to podcast detail on click', () => {
    render(<PodcastCard podcast={mockPodcast} />)

    const titleElement = screen.getByText(mockPodcast.title)
    titleElement.click()

    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })

  test('navigates to podcast detail on image click', () => {
    render(<PodcastCard podcast={mockPodcast} />)

    const imageElement = screen.getByAltText(mockPodcast.title)
    imageElement.click()

    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })

  test('navigates to podcast detail on author click', () => {
    render(<PodcastCard podcast={mockPodcast} />)

    const authorElement = screen.getByText(`by ${mockPodcast.author}`)
    authorElement.click()

    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })
})
