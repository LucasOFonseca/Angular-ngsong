import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppHistoryService {
  private history: string[] = [];

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        const url = event.url;

        this.history.push(url);
      }
    });
  }

  goBack() {
    if (this.history.length > 1) {
      this.history.pop();

      const previous = this.history.pop();

      if (previous) {
        this.router.navigateByUrl(previous);

        return;
      }
    }

    this.router.navigateByUrl('/');
  }
}
