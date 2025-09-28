import { NgClass } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  LucideAngularModule,
} from 'lucide-angular';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [NgClass, LucideAngularModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
})
export class PaginationComponent {
  @Input({ required: true }) total = 0;
  @Input({ required: true }) limit = 0;

  readonly ChevronLeftIcon = ChevronLeftIcon;
  readonly ChevronRightIcon = ChevronRightIcon;

  totalPages = 0;
  pages: number[] = [];
  pagesToShow: number[] = [];

  currentPage = 1;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      const page = params.get('page');

      if (page) {
        if (Number(page) > this.totalPages || Number(page) < 1) {
          this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { page: 1 },
            queryParamsHandling: 'merge',
          });
        }

        this.currentPage = Number(page);
        this.setPagesToShow();
      }
    });

    this.setPagesToShow();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['total'] || changes['limit']) {
      this.totalPages = Math.ceil(this.total / this.limit);
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);

      this.setPagesToShow();
    }
  }

  setPagesToShow() {
    if (this.totalPages <= 5) {
      this.pagesToShow = this.pages;
      return;
    }

    const start =
      this.currentPage > this.totalPages - 2
        ? this.totalPages - 4
        : Math.max(this.currentPage - 2, 1);
    const end =
      this.currentPage < 3
        ? 5
        : Math.min(this.currentPage + 2, this.totalPages);

    this.pagesToShow = this.pages.slice(start - 1, end);
  }

  changePage(page: number) {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { page },
      queryParamsHandling: 'merge',
    });

    this.setPagesToShow();
  }
}
