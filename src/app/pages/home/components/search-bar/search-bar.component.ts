import { Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, SearchIcon, XIcon } from 'lucide-angular';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  readonly SearchIcon = SearchIcon;
  readonly XIcon = XIcon;

  searchValue = signal('');
  showClearButton = signal(false);

  private readonly destroy$ = new Subject<void>();

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        const q = params.get('q');

        if (q) {
          this.showClearButton.set(true);

          if (q !== this.searchValue()) {
            this.searchValue.set(q);
          }
        } else {
          this.searchValue.set('');
          this.showClearButton.set(false);
        }
      });
  }

  onSearch(v?: string) {
    const value = v ?? this.searchValue();

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        q: value !== '' ? value : null,
        page: value !== '' ? 1 : null,
      },
      queryParamsHandling: 'merge',
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
