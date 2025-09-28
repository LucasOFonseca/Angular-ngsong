import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { ArtistPaginatedResponse } from '../../shared/model/artist.model';
import { ArtistService } from '../../shared/services/artist.service';
import { ArtistCardSkeletonComponent } from './components/artist-card-skeleton/artist-card-skeleton.component';
import { ArtistCardComponent } from './components/artist-card/artist-card.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    SearchBarComponent,
    ArtistCardComponent,
    PaginationComponent,
    ArtistCardSkeletonComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly #artistsService = inject(ArtistService);

  artists = signal<ArtistPaginatedResponse | null>(null);
  isLoadingArtists = signal(false);

  subs = new Subscription();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const sub = this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');
      const page = params.get('page');

      let pageNumber = page ? Number(page) : 1;

      if (Number.isNaN(pageNumber) || pageNumber < 1) {
        pageNumber = 1;

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: 1 },
          queryParamsHandling: 'merge',
        });

        return;
      }

      if (pageNumber > 50) {
        pageNumber = 50;

        this.router.navigate([], {
          relativeTo: this.activatedRoute,
          queryParams: { page: 50 },
          queryParamsHandling: 'merge',
        });

        return;
      }

      if (q) {
        this.isLoadingArtists.set(true);

        const artistSub = this.#artistsService
          .searchArtists(q, pageNumber)
          .subscribe({
            next: (res) => this.artists.set(res.artists),
            complete: () => this.isLoadingArtists.set(false),
          });

        this.subs.add(artistSub);
      } else this.artists.set(null);
    });

    this.subs.add(sub);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
