import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapData',
})
export class MapDataPipe implements PipeTransform {
  transform<T>(value: T[], key: keyof T): any[] {
    return value.map((item) => item[key]);
  }
}
