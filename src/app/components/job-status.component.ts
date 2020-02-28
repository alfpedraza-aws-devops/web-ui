import { Component, Input } from '@angular/core';

@Component({
  selector: 'job-status',
  templateUrl: './job-status.component.html'
})
export class JobStatusComponent {

  @Input() public jobStatus: string = "";

}