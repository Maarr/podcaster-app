export interface ApiPodcastDto {
  id: {
    attributes: {
      'im:id': string
    }
  }
  'im:artist': { label: string }
  'im:name': { label: string }
  'im:image': ApiPodcastImageDto[]
  summary: {
    label: string
  }
}

interface ApiPodcastImageDto {
  label: string
}
