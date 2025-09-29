import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-spotify-link-button',
  standalone: true,
  imports: [],
  templateUrl: './spotify-link-button.component.html',
  styleUrl: './spotify-link-button.component.scss',
})
export class SpotifyLinkButtonComponent {
  @Input() url = '';
}
