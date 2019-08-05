import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeSpecialChar'
})
export class RemoveSpecialCharPipe implements PipeTransform {

  transform(value: string, character: string): string {
    var data=value.replace(character,'');
    console.log(data);
    return data;
  }

}
