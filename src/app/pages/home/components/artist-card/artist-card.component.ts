import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private router: Router) {}

  goToArtist() {
    this.router.navigate(['artist', this.artist.id], {
      queryParamsHandling: 'preserve',
    });
  }
}
