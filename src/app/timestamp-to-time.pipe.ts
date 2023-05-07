import { formatDate } from '@angular/common';
import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { Timestamp } from '@angular/fire/firestore';

@Pipe({
  name: 'timestampToTime'
})
export class TimestampToTimePipe implements PipeTransform {
constructor(@Inject(LOCALE_ID) private locale: string) {}
  transform(timestamp: Timestamp | undefined): string {
    return (timestamp) ? formatDate(timestamp.toDate(), "yyyy-MM-dd hh:mm", this.locale) : "";
  }

}
