import { ImageObject } from './image-object.model';
import { PaginatedData } from './paginated-data.model';

export interface SimplifiedArtist {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}

export interface Artist extends SimplifiedArtist {
  followers: {
    href: string;
    total: number;
  };
  genres: string[];
  images?: ImageObject[];
  popularity: number;
}

export type ArtistPaginatedResponse = PaginatedData<Artist>;
