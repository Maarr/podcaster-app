import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import PodcastList from '@/ui/views/podcast-list/PodcastList'
import { MemoryRouter } from 'react-router-dom'
import { useFetchPodcasts } from '@/infrastructure/hooks/useFetchPodcasts'
import useGlobalStore from '@/store/useGlobalStore.store'
import usePodcastsStore from '@/store/usePodcastsStore.store'

jest.mock('@/infrastructure/hooks/useFetchPodcasts', () => ({
  useFetchPodcasts: jest.fn(),
}))

const globalInitialState = useGlobalStore.getInitialState()
const setTransitioningMock = jest.spyOn(
  useGlobalStore.getState(),
  'setTransitioning'
)

const podcastsInitialState = usePodcastsStore.getInitialState()

describe('PodcastList', () => {
  const mockFetchPodcasts = jest.fn()

  beforeEach(() => {
    useGlobalStore.setState(globalInitialState)
    usePodcastsStore.setState(podcastsInitialState)
    ;(useFetchPodcasts as jest.Mock).mockReturnValue({
      fetchPodcasts: mockFetchPodcasts,
      loading: false,
      error: null,
    })
  })

  test('renders correctly', async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <PodcastList />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(
        screen.getByPlaceholderText('Filter podcasts...')
      ).toBeInTheDocument()
      expect(screen.getByText('0')).toBeInTheDocument()
      expect(setTransitioningMock).toHaveBeenCalledWith(false)
    })
  })

  test('shows loading message', async () => {
    ;(useFetchPodcasts as jest.Mock).mockReturnValue({
      fetchPodcasts: mockFetchPodcasts,
      loading: true,
      error: null,
    })
    await act(async () => {
      render(
        <MemoryRouter>
          <PodcastList />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Loading...')).toBeInTheDocument()
    })
  })

  test('shows error message', async () => {
    ;(useFetchPodcasts as jest.Mock).mockReturnValue({
      fetchPodcasts: mockFetchPodcasts,
      loading: false,
      error: 'Error fetching podcasts',
    })
    await act(async () => {
      render(
        <MemoryRouter>
          <PodcastList />
        </MemoryRouter>
      )
    })
    await waitFor(() => {
      expect(screen.getByText('Error fetching podcasts')).toBeInTheDocument()
    })
  })

  test('renders podcasts correctly', async () => {
    ;(useFetchPodcasts as jest.Mock).mockReturnValue({
      fetchPodcasts: jest.fn().mockResolvedValue([
        {
          id: '1',
          imageUrl: 'http://example.com/image.jpg',
          title: 'Sample Podcast',
          author: 'John Doe',
          description: 'This is a sample description.',
        },
      ]),
      loading: false,
      error: '',
    })

    await act(async () => {
      render(
        <MemoryRouter>
          <PodcastList />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText('Sample Podcast')).toBeInTheDocument()
      expect(screen.getByText('Author: John Doe')).toBeInTheDocument()
    })
  })

  test('filters podcasts correctly based on search term', async () => {
    ;(useFetchPodcasts as jest.Mock).mockReturnValue({
      fetchPodcasts: jest.fn().mockResolvedValue([
        {
          id: '1',
          imageUrl: 'http://example.com/image1.jpg',
          title: 'Sample Podcast 1',
          author: 'John Doe',
          description: 'Description 1',
        },
        {
          id: '2',
          imageUrl: 'http://example.com/image2.jpg',
          title: 'Sample Podcast 2',
          author: 'Jane Doe',
          description: 'Description 2',
        },
      ]),
      loading: false,
      error: '',
    })

    await act(async () => {
      render(
        <MemoryRouter>
          <PodcastList />
        </MemoryRouter>
      )
    })

    await act(async () => {
      fireEvent.change(screen.getByPlaceholderText('Filter podcasts...'), {
        target: { value: 'Sample Podcast 1' },
      })
    })

    await waitFor(() => {
      expect(screen.getByText('Sample Podcast 1')).toBeInTheDocument()
      expect(screen.queryByText('Sample Podcast 2')).toBeNull()
    })
  })
})
