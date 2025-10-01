import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'artist/:id',
    loadComponent: () =>
      import('./pages/artist/artist.component').then((c) => c.ArtistComponent),
  },
  {
    path: 'album/:id',
    loadComponent: () =>
      import('./pages/album/album.component').then((c) => c.AlbumComponent),
  },
  {
    path: '**',
    loadComponent: () =>
      import('./pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },
];
