import { Component, Input } from '@angular/core';
import { MessageItem } from 'src/app/models/event-item.model';

@Component({
  selector: 'event-display',
  templateUrl: './event-display.component.html'
})
export class EventDisplayComponent {

  @Input() public lastUpdate: Date = new Date();
  @Input() public eventList: EventItem[] = [];

}