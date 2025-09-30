import { Component, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
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
export class ArtistComponent {
  readonly #titleService = inject(Title);
  readonly #artistService = inject(ArtistService);
  readonly #topTracksService = inject(TopTracksService);
  readonly #albumService = inject(AlbumService);

  artist = signal<Artist | null>(null);
  isLoadingArtist = signal(false);

  topTracks = signal<Track[] | null>(null);
  isLoadingTopTracks = signal(false);

  albums = signal<SimplifiedAlbumPaginatedResponse | null>(null);
  isLoadingAlbums = signal(false);

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.isLoadingArtist.set(true);
      this.isLoadingTopTracks.set(true);
      this.isLoadingAlbums.set(true);

      this.#artistService.getArtistDetails(id).subscribe({
        next: (artist) => {
          this.artist.set(artist);
          this.isLoadingArtist.set(false);

          this.#titleService.setTitle(`ngSound - Artista - ${artist.name}`);

          this.#topTracksService.getArtistTopTracks(id).subscribe({
            next: ({ tracks }) => {
              this.topTracks.set(tracks);
              this.isLoadingTopTracks.set(false);
            },
            error: () => this.isLoadingTopTracks.set(false),
          });

          this.#albumService.getArtistAlbums(id).subscribe({
            next: (res) => {
              this.albums.set(res);
              this.isLoadingAlbums.set(false);
            },
            error: () => this.isLoadingAlbums.set(false),
          });
        },
        error: () => this.isLoadingArtist.set(false),
      });
    }
  }

  loadMoreAlbums() {
    const nextUrl = this.albums()?.next;

    if (!nextUrl) return;

    this.#albumService.getNextArtistAlbums(nextUrl).subscribe((res) => {
      this.albums.update((curr) => ({
        ...res,
        items: [...(curr?.items ?? []), ...res.items],
      }));
    });
  }
}
