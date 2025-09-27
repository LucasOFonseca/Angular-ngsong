import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly themeKey = 'theme';

  getTheme() {
    return localStorage.getItem(this.themeKey);
  }

  setTheme(theme: string) {
    const html = document.getElementsByTagName('html')[0];

    if (theme === 'dark') html.classList.add('dark');
    else html.classList.remove('dark');

    localStorage.setItem(this.themeKey, theme);
  }

  toggleTheme() {
    const theme = this.getTheme() === 'light' ? 'dark' : 'light';

    this.setTheme(theme);
  }

  initializeTheme() {
    const theme = this.getTheme();

    if (theme) {
      this.setTheme(theme);

      return;
    }

    const preferredTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? 'dark'
      : 'light';

    this.setTheme(preferredTheme);
  }
}
