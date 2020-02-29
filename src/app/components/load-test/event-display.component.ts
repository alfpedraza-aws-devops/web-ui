import { Component, Input } from '@angular/core';
import { MessageItem } from 'src/app/models/message-item.model';

@Component({
  selector: 'event-display',
  templateUrl: './event-display.component.html'
})
export class EventDisplayComponent {

  @Input() public lastUpdate: Date = new Date();
  @Input() public statusDisplay: MessageItem[] = [];

}