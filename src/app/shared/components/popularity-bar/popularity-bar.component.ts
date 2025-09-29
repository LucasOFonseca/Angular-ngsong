import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-popularity-bar',
  standalone: true,
  imports: [],
  templateUrl: './popularity-bar.component.html',
  styleUrl: './popularity-bar.component.scss',
})
export class PopularityBarComponent {
  @Input({ required: true }) value!: string | number;
}
