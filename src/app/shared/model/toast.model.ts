export type ToastType = 'error';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}
