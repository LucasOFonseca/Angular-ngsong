import { Component, Input } from '@angular/core';
import { Artist } from '../../../../shared/model/artist.model';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss',
})
export class ArtistCardComponent {
  @Input({ required: true }) artist!: Artist;

  openSpotify(url?: string) {
    if (url) window.open(url, '_blank');
  }
}
