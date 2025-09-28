import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Toast, ToastType } from '../model/toast.model';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private toastSubject = new BehaviorSubject<Toast[]>([]);

  toasts$ = this.toastSubject.asObservable();

  private nextId = 0;

  private get toasts(): Toast[] {
    return this.toastSubject.getValue();
  }

  private set toasts(toasts: Toast[]) {
    this.toastSubject.next(toasts);
  }

  removeToast(id: number) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
  }

  show(message: string, type: ToastType) {
    const id = this.nextId++;
    const toast = { id, type, message };

    this.toasts = [...this.toasts, toast];

    setTimeout(() => this.removeToast(id), 5000);
  }

  error(message: string) {
    this.show(message, 'error');
  }
}
