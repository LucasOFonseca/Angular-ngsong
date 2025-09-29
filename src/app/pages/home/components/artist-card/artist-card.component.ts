import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Artist } from '../../../../shared/model/artist.model';
import { FollowersPipe } from '../../../../shared/pipes/followers.pipe';

@Component({
  selector: 'app-artist-card',
  standalone: true,
  imports: [FollowersPipe],
  templateUrl: './artist-card.component.html',
  styleUrl: './artist-card.component.scss',
})
export class ArtistCardComponent {
  @Input({ required: true }) artist!: Artist;

  constructor(private router: Router) {}

  goToArtist() {
    this.router.navigate(['artist', this.artist.id]);
  }
}
