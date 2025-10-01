import { AsyncPipe, NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LucideAngularModule, XIcon } from 'lucide-angular';
import { Observable } from 'rxjs';
import { Toast } from '../../shared/model/toast.model';
import { ToastService } from '../../shared/services/toast.service';

@Component({
  selector: 'app-toast-container',
  standalone: true,
  imports: [AsyncPipe, NgClass, LucideAngularModule],
  templateUrl: './toast-container.component.html',
  styleUrl: './toast-container.component.scss',
})
export class ToastContainerComponent implements OnInit {
  private toastService = inject(ToastService);

  readonly XIcon = XIcon;

  toasts$!: Observable<Toast[]>;

  ngOnInit() {
    this.toasts$ = this.toastService.toasts$;
  }

  removeToast(id: number) {
    this.toastService.removeToast(id);
  }
}
