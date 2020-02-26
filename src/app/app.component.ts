import { Component } from '@angular/core';
import { FibonacciJobService } from 'src/app/services/fibonacci-job.service';
import { NodesService } from 'src/app/services/nodes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public jobCountDisplay: string;
  public jobStatusDisplay: string;
  public jobParametersDisplay: string;
  public nodesCountDisplay: string;
  public nodesStatusDisplay: string;
  public statusDisplay: string[] = [];

  constructor(
    private jobService: FibonacciJobService,
    private nodesService: NodesService,
  ) { } 

  public getJobCount() {
    this.jobService.getCount().subscribe((value) => {
      this.jobCountDisplay = value;
    });
  }

  public getJobStatus() {
    this.jobService.getStatus().subscribe((value) => {
      this.jobStatusDisplay = value;
    });
  }

  public getJobParameters() {
    this.jobService.getParameters().subscribe((value) => {
      this.jobParametersDisplay = value;
    });
  }

  public getNodesCount() {
    this.nodesService.getCount().subscribe((value) => {
      this.nodesCountDisplay = value;
    });
  }

  public getNodesStatus() {
    this.nodesService.getStatus().subscribe((value) => {
      this.nodesStatusDisplay = value;
    });
  }

  public startJob() {
    this.jobService.start().subscribe((value) => {
      this.statusDisplay.push("Job Started");
    });
  }

  public stopJob() {
    this.jobService.stop().subscribe((value) => {
      this.statusDisplay.push("Job Stopped");
    });
  }

}