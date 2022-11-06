import { Pipe, PipeTransform } from '@angular/core';
import { DateTime } from 'luxon';

@Pipe({
  name: 'utcDateToLocal',
})
export class UtcDateToLocalPipe implements PipeTransform {
  transform(utcDate: Date, args?: any): string {
    if (!utcDate) {
      return '';
    }

    const dateUtc = new Date(utcDate);

    const date = dateUtc.setMinutes(
      dateUtc.getMinutes() + dateUtc.getTimezoneOffset() * -1
    );

    const result = DateTime.fromISO(new Date(date).toISOString()).toFormat(
      'yyyy LLL dd hh:mm:ss a'
    );
    return result;
  }
}
