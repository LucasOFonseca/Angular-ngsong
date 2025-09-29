import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.example';
import { Album, SimplifiedAlbumPaginatedResponse } from '../model/album.model';
import { PaginatedData } from '../model/paginated-data.model';
import { SimplifiedTrack } from '../model/track.model';

@Injectable({
  providedIn: 'root',
})
export class AlbumService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  getArtistAlbums(artistId: string) {
    return this.#httpClient.get<SimplifiedAlbumPaginatedResponse>(
      `${this.baseUrl}/artists/${artistId}/albums`,
      { params: { limit: 8 } }
    );
  }

  getNextArtistAlbums(nextUrl: string) {
    return this.#httpClient.get<SimplifiedAlbumPaginatedResponse>(nextUrl);
  }

  getAlbumDetails(albumId: string) {
    return this.#httpClient.get<Album>(`${this.baseUrl}/albums/${albumId}`);
  }

  getNextAlbumTracks(nextUrl: string) {
    return this.#httpClient.get<PaginatedData<SimplifiedTrack>>(nextUrl);
  }
}
