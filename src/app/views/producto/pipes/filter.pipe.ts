import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if (arg === '') {
      return value;
    }
    const result = [];
    for(const item of value) {
      if(item.nombre.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        result.push(item);
      }
    }
    return result;
  }

}
