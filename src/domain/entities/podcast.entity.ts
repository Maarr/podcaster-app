import { Episode } from './episode.entity'

export interface Podcast {
  id: string
  imageUrl: string
  title: string
  author: string
  description: string
  episodes?: Episode[]
}
