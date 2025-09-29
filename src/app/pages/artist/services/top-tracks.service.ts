import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.example';
import { Track } from '../../../shared/model/track.model';

@Injectable({
  providedIn: 'root',
})
export class TopTracksService {
  private readonly baseUrl = environment.apiUrl;
  readonly #httpClient = inject(HttpClient);

  getArtistTopTracks(artistId: string) {
    return this.#httpClient.get<{ tracks: Track[] }>(
      `${this.baseUrl}/artists/${artistId}/top-tracks`
    );
  }
}
