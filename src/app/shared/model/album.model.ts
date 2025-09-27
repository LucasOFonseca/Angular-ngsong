import { SimplifiedArtist } from './artist.model';
import { ImageObject } from './image-object.model';
import { PaginatedData } from './paginated-data.model';
import { SimplifiedTrack } from './track.model';

export interface SimplifiedAlbum {
  album_type: string;
  total_tracks: number;
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images?: ImageObject[];
  name: string;
  release_date: string;
  release_date_precision: string;
  restrictions: {
    reason: string;
  };
  type: string;
  uri: string;
  artists: SimplifiedArtist[];
  album_group: string;
}

export interface Album extends SimplifiedAlbum {
  tracks: PaginatedData<SimplifiedTrack>;
  copyrights: {
    text: string;
    type: string;
  };
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  label: string;
  popularity: string;
}

export type SimplifiedAlbumPaginatedResponse = PaginatedData<SimplifiedAlbum>;
