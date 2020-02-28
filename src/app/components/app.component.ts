import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { forkJoin } from 'rxjs';

import { JobParameters } from 'src/app/models/jobParameters.model';
import { MessageItem } from 'src/app/models/message-item.model';
import { FibonacciJobService } from 'src/app/services/fibonacci-job.service';
import { NodesService } from 'src/app/services/nodes.service';
import { JobParametersFormComponent } from 'src/app/components/job-parameters-form.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public initialized: boolean = false;
  private intervalId: any;

  // Model Properties
  public jobCount: number;
  public jobStatus: string;
  public jobParameters: JobParameters = new JobParameters();
  public previousNodesCount: number;
  public nodesCount: number;
  public nodesStatus: string;
  public lastUpdate: Date;
  public statusDisplay: MessageItem[] = [];

  @ViewChild(JobParametersFormComponent, { static: true })
  private jobParametersForm: JobParametersFormComponent;
  
  constructor(
    private jobService: FibonacciJobService,
    private nodesService: NodesService
  ) { }

  ngOnInit(): void {
    this.initialize();
    this.refresh();
  }

  ngOnDestroy(): void {
    this.stopRefresh();
  }

  private async initialize(): Promise<void> {
    this.jobCount = await this.jobService.getCount();
    if (this.jobCount == 1) {
      this.jobParameters = await this.jobService.getParameters();
    } else {
      this.jobParameters.requests = 1000;
      this.jobParameters.concurrency = 20;
    }
    this.jobParametersForm.setJobParameters(this.jobParameters);
    this.loading = false;
  }

  private refresh() {
    forkJoin(
      this.jobService.getCount(),
      this.jobService.getStatus(),
      this.nodesService.getCount(),
      this.nodesService.getStatus()

    ).subscribe(results => {
      this.previousNodesCount = this.nodesCount;
      this.jobCount = results[0];
      this.jobStatus = results[1];
      this.nodesCount = results[2];
      this.nodesStatus = results[3];
      this.lastUpdate = new Date();

      this.detectNodeChanges();
      this.initialized = true;
      this.intervalId = setInterval(() => this.refresh(), 5000);
    });
  }

  private detectNodeChanges(): void {
    if (!this.initialized) return;
    if (this.nodesCount > this.previousNodesCount) {
      let difference = this.nodesCount - this.previousNodesCount;
      let message = "(" + difference + ") nodes were added."
      this.pushMessage(message);
    } else if (this.nodesCount < this.previousNodesCount) {
      let difference = this.previousNodesCount - this.nodesCount;
      let message = "(" + difference + ") nodes were removed."
      this.pushMessage(message);
    }
  }

  private stopRefresh(): void {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  public async onJobStarted(parameters: JobParameters): Promise<void> {
    this.loading = true;
    await this.jobService.start(this.jobParameters);
    this.jobCount = await this.jobService.getCount();
    this.pushMessage("Job started");
    this.loading = false;
  }

  public async onJobStopped(): Promise<void> {
    this.loading = true;
    await this.jobService.stop();
    this.jobCount = await this.jobService.getCount();
    this.pushMessage("Job stopped");
    this.loading = false;
  }

  private pushMessage(message: string): void {
    let item = new MessageItem();
    item.date = new Date();
    item.message = message; 
    this.statusDisplay.push(item);
  }

}