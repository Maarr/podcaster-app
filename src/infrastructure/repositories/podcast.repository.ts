import { Podcast } from "@/domain/entities/podcast.entity";

export interface PodcastRepository {
    getPodcasts(): Promise<Podcast[]>;
  }
  