import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Artist } from '../../shared/model/artist.model';
import { ArtistService } from '../../shared/services/artist.service';

@Component({
  selector: 'app-artist',
  standalone: true,
  imports: [],
  templateUrl: './artist.component.html',
  styleUrl: './artist.component.scss',
})
export class ArtistComponent {
  readonly #artistService = inject(ArtistService);

  artist = signal<Artist | null>(null);

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (id) {
      this.#artistService.getArtistDetails(id).subscribe((artist) => {
        this.artist.set(artist);
      });
    }
  }
}
