import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textCorto'
})
export class TextCortoPipe implements PipeTransform {

  transform(value: string, maxLength: number = 50): string {
    if (value.length <= maxLength) {
      return value;
    }
    return value.substring(0, maxLength) + '...';
  }

}
