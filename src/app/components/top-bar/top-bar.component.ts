import { Location } from '@angular/common';
import {
  Component,
  computed,
  HostListener,
  inject,
  signal,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {
  ArrowLeftIcon,
  LucideAngularModule,
  MoonIcon,
  SunIcon,
} from 'lucide-angular';
import { filter } from 'rxjs';
import { ThemeService } from '../../shared/services/theme.service';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
})
export class TopBarComponent {
  readonly MoonIcon = MoonIcon;
  readonly SunIcon = SunIcon;
  readonly ArrowLeftIcon = ArrowLeftIcon;

  readonly themeService = inject(ThemeService);

  private lastScrollTop = 0;

  private currentUrl = signal('/');
  showBackButton = computed(() => {
    const fullUrl = this.currentUrl();

    const path = fullUrl.split('?')[0];

    return path !== '/';
  });

  isVisible = signal(true);

  constructor(private router: Router, private location: Location) {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e) => this.currentUrl.set(e.urlAfterRedirects));
  }

  @HostListener('window:scroll', [])
  onScroll() {
    const currentScroll = window.scrollY || document.documentElement.scrollTop;

    if (currentScroll > this.lastScrollTop && currentScroll > 50)
      this.isVisible.set(false);
    else this.isVisible.set(true);

    this.lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;
  }

  goBack() {
    const referrer = document.referrer;
    const currentHost = window.location.origin;

    if (referrer && referrer.startsWith(currentHost)) {
      this.location.back();

      return;
    }

    this.router.navigateByUrl('/');
  }
}
