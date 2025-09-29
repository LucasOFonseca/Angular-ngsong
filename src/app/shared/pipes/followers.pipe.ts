import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'followers',
  standalone: true,
})
export class FollowersPipe implements PipeTransform {
  transform(value: number) {
    if (value < 1_000) return String(value);

    if (value < 1_000_000) {
      const thousands = Math.floor(value / 1_000);

      return `${thousands}k`;
    }

    const millions = Math.floor(value / 1_000_000);

    return `${millions}M`;
  }
}
