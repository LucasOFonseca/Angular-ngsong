import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.example';
import { SimplifiedAlbumPaginatedResponse } from '../model/album.model';

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

  getNext(nextUrl: string) {
    return this.#httpClient.get<SimplifiedAlbumPaginatedResponse>(nextUrl);
  }
}
