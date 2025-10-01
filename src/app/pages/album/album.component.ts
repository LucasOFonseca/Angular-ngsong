import { DatePipe, TitleCasePipe } from '@angular/common';
import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscAlbumIcon, LucideAngularModule } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';
import { NotFoundComponent } from '../../shared/components/not-found/not-found.component';
import { PopularityBarComponent } from '../../shared/components/popularity-bar/popularity-bar.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { SpotifyLinkButtonComponent } from '../../shared/components/spotify-link-button/spotify-link-button.component';
import { TrackItemComponent } from '../../shared/components/track-item/track-item.component';
import { TrackSkeletonComponent } from '../../shared/components/track-skeleton/track-skeleton.component';
import { Album } from '../../shared/model/album.model';
import { AlbumService } from '../../shared/services/album.service';
import { AlbumInfoSkeletonComponent } from './components/album-info-skeleton/album-info-skeleton.component';

@Component({
  selector: 'app-album',
  standalone: true,
  imports: [
    TitleCasePipe,
    DatePipe,
    TrackItemComponent,
    SpotifyLinkButtonComponent,
    PopularityBarComponent,
    LucideAngularModule,
    AlbumInfoSkeletonComponent,
    TrackSkeletonComponent,
    NotFoundComponent,
    SpinnerComponent,
  ],
  templateUrl: './album.component.html',
  styleUrl: './album.component.scss',
})
export class AlbumComponent implements OnInit, OnDestroy {
  readonly #titleService = inject(Title);
  readonly #albumService = inject(AlbumService);

  readonly DiscAlbumIcon = DiscAlbumIcon;

  album = signal<Album | null>(null);
  isLoadingAlbum = signal(false);
  isLoadingMoreTracks = signal(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isLoadingAlbum.set(true);

      this.#albumService
        .getAlbumDetails(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (album) => {
            this.album.set(album);
            this.isLoadingAlbum.set(false);

            this.#titleService.setTitle(
              `ngSound - Album - ${album.name} by ${album.artists[0].name}`
            );
          },
          error: () => this.isLoadingAlbum.set(false),
        });
    }
  }

  goToArtist(artistId: string) {
    this.router.navigate(['artist', artistId], {
      queryParams: { artist: artistId },
      queryParamsHandling: 'merge',
    });
  }

  loadMoreTracks() {
    const nextUrl = this.album()?.tracks.next;

    if (!nextUrl) return;

    this.isLoadingMoreTracks.set(true);

    this.#albumService
      .getNextAlbumTracks(nextUrl)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.album.update((curr) =>
            curr
              ? {
                  ...curr,
                  tracks: {
                    ...res,
                    items: [...(curr?.tracks.items ?? []), ...res.items],
                  },
                }
              : null
          );
          this.isLoadingMoreTracks.set(false);
        },
        error: () => this.isLoadingMoreTracks.set(false),
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
