import { Component, inject } from '@angular/core';
import { LucideAngularModule, MoonIcon, SunIcon } from 'lucide-angular';
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

  readonly themeService = inject(ThemeService);
}
