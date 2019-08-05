import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'exponentiallol'
})
export class ExponentialPipe implements PipeTransform {

  transform(value: number, exponent?: number): number {
    return Math.pow(value, isNaN(exponent) ? 1 : exponent);
  }

  // transform(value: any, ...args: any[]): any {
  //   return null;
  // }

}
