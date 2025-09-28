import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArtistPaginatedResponse } from '../../shared/model/artist.model';
import { ArtistService } from '../../shared/services/artist.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SearchBarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly #artistsService = inject(ArtistService);

  artists = signal<ArtistPaginatedResponse | null>(null);
  isLoadingArtists = signal(false);

  constructor(private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      const page = params.get('page');

      if (q) {
        this.isLoadingArtists.set(true);

        this.#artistsService
          .searchArtists(q, page ? Number(page) : 1)
          .subscribe({
            next: (res) => this.artists.set(res.artists),
            complete: () => this.isLoadingArtists.set(false),
          });
      }
    });
  }
}
