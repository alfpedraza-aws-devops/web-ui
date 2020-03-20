import { Component, Input } from '@angular/core';

/**
 * Displays the information of the Fibonacci Horizontal Pod Autoscaler.
 * This includes data about how many pods are running, the CPU and RAM
 * metrics of the whole HPA, etc.
 */
@Component({
  selector: 'hpa-status',
  templateUrl: './hpa-status.component.html'
})
export class HpaStatusComponent {

  /**
   * The status of the fibonacci horizontal pod autoscaler.
   */
  @Input() public hpaStatus: string = "";

}