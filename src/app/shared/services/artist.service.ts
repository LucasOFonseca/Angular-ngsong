import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.example';
import { Artist, ArtistPaginatedResponse } from '../model/artist.model';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private readonly baseUrl = environment.apiUrl;

  readonly #httpClient = inject(HttpClient);

  searchArtists(q: string, page = 1) {
    return this.#httpClient.get<{ artists: ArtistPaginatedResponse }>(
      `${this.baseUrl}/search`,
      {
        params: {
          q,
          offset: (page - 1) * 20,
          type: 'artist',
        },
      }
    );
  }

  getArtistDetails(id: string) {
    return this.#httpClient.get<Artist>(`${this.baseUrl}/artists/${id}`);
  }
}
