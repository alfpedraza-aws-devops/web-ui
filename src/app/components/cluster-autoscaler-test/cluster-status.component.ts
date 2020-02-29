import { Component, Input } from '@angular/core';

/**
 * Displays the CPU and memory metrics of the machines in the cluster.
 */
@Component({
  selector: 'cluster-status',
  templateUrl: './cluster-status.component.html'
})
export class ClusterStatusComponent {

  /** 
   * The information of the cluster to display.
   */
  @Input() public clusterStatus: string = "";

}