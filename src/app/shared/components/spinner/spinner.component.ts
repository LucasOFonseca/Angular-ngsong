import { Component, Input } from '@angular/core';
import { Disc3Icon, LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [LucideAngularModule],
  templateUrl: './spinner.component.html',
  styleUrl: './spinner.component.scss',
})
export class SpinnerComponent {
  readonly Disc3Icon = Disc3Icon;

  @Input() size = 24;
}
