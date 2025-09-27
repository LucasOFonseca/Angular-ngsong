import { SimplifiedAlbum } from './album.model';
import { SimplifiedArtist } from './artist.model';

export interface LinkedFrom {
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface SimplifiedTrack {
  artists: SimplifiedArtist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_playable: boolean;
  linked_from: LinkedFrom;
  restrictions: {
    reason: string;
  };
  name: string;
  preview_url?: string;
  track_number: number;
  type: string;
  uri: string;
  is_local: boolean;
}

export interface Track extends SimplifiedTrack {
  album: SimplifiedAlbum;
  external_ids: {
    isrc: string;
    ean: string;
    upc: string;
  };
  popularity: number;
}
