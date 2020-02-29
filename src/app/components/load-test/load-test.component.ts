import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';

import { JobParameters } from 'src/app/models/job-parameters.model';
import { EventItem } from 'src/app/models/event-item.model';
import { FibonacciJobService } from 'src/app/services/fibonacci-job.service';
import { NodesService } from 'src/app/services/nodes.service';
import { JobParametersFormComponent } from 'src/app/components/load-test/job-parameters-form.component';
import { LoadingPopupService } from '../../services/loading-popup.service';
import { BlankPopupService } from 'src/app/services/blank-popup.service';

@Component({
  selector: 'load-test',
  templateUrl: './load-test.component.html'
})
export class LoadTestComponent implements OnInit, OnDestroy {

  // Model Properties
  public jobCount: number;
  public jobStatus: string;
  public jobParameters: JobParameters = new JobParameters();
  public previousNodesCount: number;
  public nodesCount: number;
  public nodesStatus: string;
  public lastUpdate: Date;
  public eventList: EventItem[] = [];

  // UI Properties
  @ViewChild(JobParametersFormComponent, { static: true })
  private jobParametersForm: JobParametersFormComponent;
  private isInitialized: boolean = false;
  private refreshSubscription: Subscription;
  private timeoutId: any;
  
  // Injected Properties
  constructor(
    private jobService: FibonacciJobService,
    private nodesService: NodesService,
    private popupService: LoadingPopupService,
    private blankService: BlankPopupService
  ) { }

  public ngOnInit(): void {
    this.initialize();
    this.refresh();
  }

  public ngOnDestroy(): void {
    this.stopRefresh();
  }

  private async initialize(): Promise<void> {
    this.blankService.show();
    this.popupService.show();

    this.jobCount = await this.jobService.getCount();
    if (this.jobCount == 1) {
      this.jobParameters = await this.jobService.getParameters();
    } else {
      this.jobParameters = new JobParameters(2000, 20);
    }
    this.jobParametersForm.setJobParameters(this.jobParameters);
  }

  private refresh() {
    this.refreshSubscription =
      forkJoin(
        this.jobService.getCount(),
        this.jobService.getStatus(),
        this.nodesService.getCount(),
        this.nodesService.getStatus()
      ).subscribe(
        data  => { this.refreshModel(data); },
        error => { },
        ()    => {
          this.refreshSubscription.unsubscribe();
          this.timeoutId = setTimeout(() => this.refresh(), 5000); }
      );
  }

  private refreshModel(data: any[]): void {
    this.previousNodesCount = this.nodesCount;
    this.jobCount = data[0];
    this.jobStatus = data[1];
    this.nodesCount = data[2];
    this.nodesStatus = data[3];
    this.lastUpdate = new Date();
    this.detectNodeChanges();
    this.completeInitialize();
  }

  private completeInitialize() {
    if (!this.isInitialized) {
      this.blankService.hide();
      this.popupService.hide();
      this.isInitialized = true;
    }
  }

  private detectNodeChanges(): void {
    if (!this.isInitialized) return;

    if (this.nodesCount > this.previousNodesCount) {
      let difference = this.nodesCount - this.previousNodesCount;
      let message = "(" + difference + ") nodes were added."
      this.addEvent(message);

    } else if (this.nodesCount < this.previousNodesCount) {
      let difference = this.previousNodesCount - this.nodesCount;
      let message = "(" + difference + ") nodes were removed."
      this.addEvent(message);
    }
  }

  private stopRefresh(): void {
    if (this.timeoutId) clearTimeout(this.timeoutId);
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
  }

  public async onJobStarted(parameters: JobParameters): Promise<void> {
    try {
      this.popupService.show();
      await this.jobService.start(this.jobParameters);
      this.jobCount = await this.jobService.getCount();
      this.addEvent("Job started");
    } finally {
      this.popupService.hide();
    }
  }

  public async onJobStopped(): Promise<void> {
    try {
      this.popupService.show();
      await this.jobService.stop();
      this.jobCount = await this.jobService.getCount();
      this.addEvent("Job stopped");
    } finally {
      this.popupService.hide();
    }
  }

  private addEvent(message: string): void {
    let item = new EventItem(message);
    this.eventList.push(item);
  }

}