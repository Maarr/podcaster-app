import { render, screen, fireEvent } from '@testing-library/react'
import PodcastItem from '@/ui/views/podcast-list/components/PodcastListItem'
import { Podcast } from '@/domain/entities/podcast.entity'
import useGlobalStore from '@/ui/store/useGlobalStore.store'

const mockUseNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockUseNavigate,
}))

const initialState = useGlobalStore.getInitialState()
const setTransitioningMock = jest.spyOn(
  useGlobalStore.getState(),
  'setTransitioning'
)

describe('PodcastItem', () => {
  const mockPodcast: Podcast = {
    id: '1',
    imageUrl: 'http://example.com/image.jpg',
    title: 'Sample Podcast',
    author: 'John Doe',
    description: 'This is a sample description.',
  }

  beforeEach(() => {
    mockUseNavigate.mockClear()
    useGlobalStore.setState(initialState)
  })

  test('renders correctly', () => {
    render(<PodcastItem podcast={mockPodcast} />)

    expect(screen.getByAltText(mockPodcast.title)).toBeInTheDocument()
    expect(screen.getByText(mockPodcast.title)).toBeInTheDocument()
    expect(
      screen.getByText(`Author: ${mockPodcast.author}`)
    ).toBeInTheDocument()
  })

  test('navigates and sets transitioning on click', () => {
    render(<PodcastItem podcast={mockPodcast} />)

    const container = screen.getByTestId('podcast-list-item')
    fireEvent.click(container)

    expect(setTransitioningMock).toHaveBeenCalledWith(true)
    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })
})
