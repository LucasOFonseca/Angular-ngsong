import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import {
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';
import { PaginationComponent } from '../../shared/components/pagination/pagination.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SimplifiedAlbumPaginatedResponse } from '../../shared/model/album.model';
import { ArtistPaginatedResponse } from '../../shared/model/artist.model';
import { AlbumService } from '../../shared/services/album.service';
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
    SpinnerComponent,
    AlbumCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit, OnDestroy {
  readonly #titleService = inject(Title);
  readonly #artistsService = inject(ArtistService);
  readonly #albumService = inject(AlbumService);

  artists = signal<ArtistPaginatedResponse | null>(null);
  isLoadingArtists = signal(false);

  newReleases = signal<SimplifiedAlbumPaginatedResponse | null>(null);
  isLoadingNewReleases = signal(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap
      .pipe(
        map((params) => {
          const q = params.get('q');
          const queryPage = params.get('page');

          let page = queryPage ? Number(queryPage) : 1;

          if (Number.isNaN(page) || page < 1) {
            page = 1;

            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: { page: 1 },
              queryParamsHandling: 'merge',
            });
          } else if (page > 50) {
            page = 50;

            this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: { page: 50 },
              queryParamsHandling: 'merge',
            });
          }

          return { q, page };
        }),
        distinctUntilChanged(
          (prev, curr) => prev.q === curr.q && prev.page === curr.page
        ),
        switchMap(({ q, page }) => {
          if (q) {
            this.isLoadingArtists.set(true);

            return this.#artistsService.searchArtists(q, page).pipe(
              tap({
                next: (res) => {
                  this.artists.set(res.artists);
                  this.isLoadingArtists.set(false);
                },
                error: () => this.isLoadingArtists.set(false),
              })
            );
          }

          this.artists.set(null);

          if (this.newReleases()) return of(null);

          this.isLoadingNewReleases.set(true);

          return this.#albumService.getNewReleases().pipe(
            tap({
              next: (res) => {
                this.newReleases.set(res.albums);
                this.isLoadingNewReleases.set(false);
              },
              error: () => this.isLoadingNewReleases.set(false),
            })
          );
        }),
        takeUntil(this.destroy$)
      )
      .subscribe();
  }

  ngOnInit() {
    this.#titleService.setTitle('ngSound - Home');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
