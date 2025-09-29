import { Component, Input } from '@angular/core';
import { LucideAngularModule, SearchXIcon } from 'lucide-angular';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {
  readonly SearchXIcon = SearchXIcon;

  @Input() message = 'Não encontrado';
}
