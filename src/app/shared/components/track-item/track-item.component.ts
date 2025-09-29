import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { SimplifiedTrack } from '../../model/track.model';

@Component({
  selector: 'app-track-item',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './track-item.component.html',
  styleUrl: './track-item.component.scss',
})
export class TrackItemComponent {
  @Input({ required: true }) track!: SimplifiedTrack;
  @Input({ required: true }) trackNumber!: number;

  constructor(private router: Router) {}

  openSpotify() {
    window.open(this.track.external_urls.spotify, '_blank');
  }

  goToArtist(artistId: string) {
    this.router.navigate(['artist', artistId]);
  }
}
