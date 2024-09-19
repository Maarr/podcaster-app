import { act, render, screen } from '@testing-library/react'
import { Podcast } from '@/domain/entities/podcast.entity'
import PodcastCard from '../PodcastCard'
import useGlobalStore from '@/store/useGlobalStore.store'

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

describe('PodcastCard', () => {
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

  test('renders correctly', async () => {
    await act(async () => {
      render(<PodcastCard podcast={mockPodcast} />)
    })

    const { title, author, description } = mockPodcast

    expect(screen.getByAltText(title)).toBeInTheDocument()
    expect(screen.getByText(title)).toBeInTheDocument()
    expect(screen.getByText(`by ${author}`)).toBeInTheDocument()
    expect(screen.getByText('Description:')).toBeInTheDocument()
    expect(screen.getByText(description)).toBeInTheDocument()
  })

  test('navigates and sets transitioning on title click', async () => {
    await act(async () => {
      render(<PodcastCard podcast={mockPodcast} />)
    })

    const titleElement = screen.getByText(mockPodcast.title)
    titleElement.click()

    expect(setTransitioningMock).toHaveBeenCalledWith(true)
    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })

  test('navigates and sets transitioning on image click', async () => {
    await act(async () => {
      render(<PodcastCard podcast={mockPodcast} />)
    })

    const imageElement = screen.getByAltText(mockPodcast.title)
    imageElement.click()

    expect(setTransitioningMock).toHaveBeenCalledWith(true)
    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })

  test('navigates and sets transitioning on author click', async () => {
    await act(async () => {
      render(<PodcastCard podcast={mockPodcast} />)
    })

    const authorElement = screen.getByText(`by ${mockPodcast.author}`)
    authorElement.click()

    expect(setTransitioningMock).toHaveBeenCalledWith(true)
    expect(mockUseNavigate).toHaveBeenCalledWith(`/podcast/${mockPodcast.id}`)
  })
})
