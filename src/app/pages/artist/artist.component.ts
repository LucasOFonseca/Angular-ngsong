import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { forkJoin, Subject, switchMap, takeUntil } from 'rxjs';
import { AlbumCardComponent } from '../../shared/components/album-card/album-card.component';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { PopularityBarComponent } from '../../shared/components/popularity-bar/popularity-bar.component';
import { SpotifyLinkButtonComponent } from '../../shared/components/spotify-link-button/spotify-link-button.component';
import { TrackItemComponent } from '../../shared/components/track-item/track-item.component';
import { TrackSkeletonComponent } from '../../shared/components/track-skeleton/track-skeleton.component';
import { SimplifiedAlbumPaginatedResponse } from '../../shared/model/album.model';
import { Artist } from '../../shared/model/artist.model';
import { Track } from '../../shared/model/track.model';
import { FollowersPipe } from '../../shared/pipes/followers.pipe';
import { AlbumService } from '../../shared/services/album.service';
import { ArtistService } from '../../shared/services/artist.service';
import { ArtistInfoSkeletonComponent } from './components/artist-info-skeleton/artist-info-skeleton.component';
import { TopTracksService } from './services/top-tracks.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [
    FollowersPipe,
    TrackItemComponent,
    AlbumCardComponent,
    ArtistInfoSkeletonComponent,
    TrackSkeletonComponent,
    LucideAngularModule,
    NotFoundComponent,
    SpotifyLinkButtonComponent,
    PopularityBarComponent,
  ],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent implements OnInit, OnDestroy {
  readonly #titleService = inject(Title);
  readonly #artistService = inject(ArtistService);
  readonly #topTracksService = inject(TopTracksService);
  readonly #albumService = inject(AlbumService);

  artist = signal<Artist | null>(null);
  topTracks = signal<Track[] | null>(null);
  albums = signal<SimplifiedAlbumPaginatedResponse | null>(null);

  isLoading = signal(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isLoading.set(true);

      this.#artistService
        .getArtistDetails(id)
        .pipe(
          switchMap((artist) => {
            this.artist.set(artist);
            this.#titleService.setTitle(`ngSound - Artista - ${artist.name}`);

            return forkJoin({
              topTracksRes: this.#topTracksService.getArtistTopTracks(id),
              albumsRes: this.#albumService.getArtistAlbums(id),
            });
          }),
          takeUntil(this.destroy$)
        )
        .subscribe({
          next: ({ topTracksRes, albumsRes }) => {
            this.topTracks.set(topTracksRes.tracks);
            this.albums.set(albumsRes);

            this.isLoading.set(false);
          },
          error: () => this.isLoading.set(false),
        });
    }
  }

  loadMoreAlbums() {
    const nextUrl = this.albums()?.next;

    if (!nextUrl) return;

    this.#albumService
      .getNextArtistAlbums(nextUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.albums.update((curr) => ({
          ...res,
          items: [...(curr?.items ?? []), ...res.items],
        }));
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
