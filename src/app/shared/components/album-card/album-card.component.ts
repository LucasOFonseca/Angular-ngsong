import { DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { DiscAlbumIcon, LucideAngularModule } from 'lucide-angular';
import { SimplifiedAlbum } from '../../model/album.model';

@Component({
  selector: 'app-album-card',
  standalone: true,
  imports: [DatePipe, LucideAngularModule],
  templateUrl: './album-card.component.html',
  styleUrl: './album-card.component.scss',
})
export class AlbumCardComponent {
  readonly DiscAlbumIcon = DiscAlbumIcon;

  @Input({ required: true }) album!: SimplifiedAlbum;

  constructor(private router: Router) {}

  goToAlbum() {
    this.router.navigate(['album', this.album.id]);
  }
}
