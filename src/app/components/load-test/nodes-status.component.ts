import { Component, Input } from '@angular/core';

@Component({
  selector: 'nodes-status',
  templateUrl: './nodes-status.component.html'
})
export class NodesStatusComponent {

  @Input() public nodesStatus: string = "";

}