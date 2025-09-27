import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LucideAngularModule, SearchIcon } from 'lucide-angular';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [LucideAngularModule, FormsModule, ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.scss',
})
export class SearchBarComponent {
  #formBuilder = inject(FormBuilder);

  readonly SearchIcon = SearchIcon;

  searchValue = signal('');

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const q = params.get('q');

      if (q && decodeURIComponent(q) !== this.searchValue()) {
        this.searchValue.set(decodeURIComponent(q));
      }
    });
  }

  onSearch() {
    const value = this.searchValue();

    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {
        q: value !== '' ? encodeURIComponent(value ?? '') : null,
        page: value !== '' ? 1 : null,
      },
      queryParamsHandling: 'merge',
    });
  }
}
