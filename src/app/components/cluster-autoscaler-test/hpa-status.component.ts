import { Component, Input } from '@angular/core';

/**
 * Displays the information of the Fibonacci Horizontal Pod Autoscaler.
 */
@Component({
  selector: 'hpa-status',
  templateUrl: './hpa-status.component.html'
})
export class HpaStatusComponent {

  /**
   * The status information of the horizontal pod autoscaler.
   */
  @Input() public hpaStatus: string = "";

}