import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { forkJoin, Subscription } from 'rxjs';
import { JobParameters } from 'src/app/models/job-parameters.model';
import { EventItem } from 'src/app/models/event-item.model';
import { FibonacciJobService } from 'src/app/services/fibonacci-job.service';
import { ClusterService } from 'src/app/services/cluster.service';
import { JobParametersFormComponent } from 'src/app/components/cluster-autoscaler-test/job-parameters-form.component';
import { LoadingPopupService } from 'src/app/services/loading-popup.service';
import { BlankPopupService } from 'src/app/services/blank-popup.service';

@Component({
  selector: 'cluster-autoscaler-test',
  templateUrl: './cluster-autoscaler-test.component.html'
})
export class ClusterAutoscalerTestComponent implements OnInit, OnDestroy {

  // Model Properties
  public jobCount: number = 0;
  public jobParameters: JobParameters = new JobParameters();
  public previousMachineCount: number = 0;
  public machineCount: number = 0;
  public clusterStatus: string = "";
  public hpaStatus: string = "";
  public lastUpdate: Date = new Date();
  public eventList: EventItem[] = [];

  // UI Properties
  @ViewChild(JobParametersFormComponent, { static: true })
  private jobParametersForm: JobParametersFormComponent;
  private isInitialized: boolean = false;
  private refreshSubscription: Subscription;
  private refreshTimeoutId: any;
  
  // Injected Properties
  public constructor(
    private jobService: FibonacciJobService,
    private clusterService: ClusterService,
    private loadingPopup: LoadingPopupService,
    private blankPopup: BlankPopupService
  ) { }

  public ngOnInit(): void {
    this.initialize();
    this.refresh();
  }

  public ngOnDestroy(): void {
    this.stopRefresh();
  }

  private async initialize(): Promise<void> {
    this.blankPopup.show();
    this.loadingPopup.show();

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
        this.clusterService.getHpaStatus(),
        this.clusterService.getMachineCount(),
        this.clusterService.getStatus()
      ).subscribe(
        data  => { this.refreshModel(data); },
        error => { },
        ()    => {
          this.refreshSubscription.unsubscribe();
          this.refreshTimeoutId = setTimeout(() => this.refresh(), 5000); }
      );
  }

  private refreshModel([jobCount, hpaStatus, machineCount, clusterStatus]): void {
    this.previousMachineCount = this.machineCount;
    this.jobCount = jobCount;
    this.hpaStatus = hpaStatus;
    this.machineCount = machineCount;
    this.clusterStatus = clusterStatus;
    this.lastUpdate = new Date();
    this.detectClusterChanges();
    this.completeInitialize();
  }

  private detectClusterChanges(): void {
    if (!this.isInitialized) return;

    if (this.machineCount > this.previousMachineCount) {
      let difference = this.machineCount - this.previousMachineCount;
      let message = "(" + difference + ") nodes were added."
      this.addEvent(message);

    } else if (this.machineCount < this.previousMachineCount) {
      let difference = this.previousMachineCount - this.machineCount;
      let message = "(" + difference + ") nodes were removed."
      this.addEvent(message);
    }
  }

  private completeInitialize() {
    if (!this.isInitialized) {
      this.blankPopup.hide();
      this.loadingPopup.hide();
      this.isInitialized = true;
    }
  }

  private stopRefresh(): void {
    if (this.refreshTimeoutId) clearTimeout(this.refreshTimeoutId);
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
  }

  public async onJobStarted(parameters: JobParameters): Promise<void> {
    try {
      this.loadingPopup.show();
      await this.jobService.start(this.jobParameters);
      this.jobCount = await this.jobService.getCount();
      this.addEvent("Job started");
    } finally {
      this.loadingPopup.hide();
    }
  }

  public async onJobStopped(): Promise<void> {
    try {
      this.loadingPopup.show();
      await this.jobService.stop();
      this.jobCount = await this.jobService.getCount();
      this.addEvent("Job stopped");
    } finally {
      this.loadingPopup.hide();
    }
  }

  private addEvent(message: string): void {
    let event = new EventItem(message);
    this.eventList.push(event);
  }

}