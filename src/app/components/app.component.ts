import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, Subscription, forkJoin, timer } from 'rxjs';
import { JobParameters } from 'src/app/services/jobParameters.class';
import { FibonacciJobService } from 'src/app/services/fibonacci-job.service';
import { NodesService } from 'src/app/services/nodes.service';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public loading: boolean = true;
  public initialized: boolean = false;
  public registerForm: FormGroup;
  public submitted: boolean = false;

  public jobCount: number;
  public jobStatus: string;
  public jobParameters: JobParameters = new JobParameters();
  public previousNodesCount: number;
  public nodesCount: number;
  public nodesStatus: string;
  public lastUpdate: Date;
  public statusDisplay: Array<MessageItem> = [];

  private refreshSubject: Subject<any>;
  private refreshSubscription: Subscription;
  private timerSubscription: Subscription;
  
  constructor(
    private jobService: FibonacciJobService,
    private nodesService: NodesService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.initialize();
    this.startRefresh();
  }

  ngOnDestroy(): void {
    this.stopRefresh();
  }

  private initializeForm(): void {
    this.registerForm = this.formBuilder.group({
      requests: ['', [Validators.required, Validators.min(1), Validators.max(10000)]],
      concurrency: ['', [Validators.required, Validators.min(1), Validators.max(100)]]});
      this.registerForm.valueChanges.subscribe(data => {
        this.jobParameters.requests = data.requests;
        this.jobParameters.concurrency = data.concurrency;
      });
  }

  get f() { return this.registerForm.controls; }

  private async initialize(): Promise<void> {
    this.jobCount = await this.jobService.getCount().toPromise();
    if (this.jobCount == 1) {
      this.jobParameters = await this.jobService.getParameters().toPromise();
    } else {
      this.jobParameters.requests = 2000;
      this.jobParameters.concurrency = 8;
    }
    this.registerForm.patchValue(this.jobParameters);
    this.loading = false;
  }

  private startRefresh(): void {
    this.refreshSubject = new Subject();
    this.refreshSubscription =
      this.refreshSubject.subscribe(() => {
        this.requestRefresh()
      });
    this.refreshSubject.next();
  }

  private requestRefresh(): void {
    forkJoin(
      this.jobService.getCount(),
      this.jobService.getStatus(),
      this.nodesService.getCount(),
      this.nodesService.getStatus()
    ).subscribe(results => {
      this.refresh(results)
    });
  }

  private refresh(results: any[]): void {
    // Display all the values in the results.
    this.previousNodesCount = this.nodesCount;
    this.jobCount = results[0];
    this.jobStatus = results[1];
    this.nodesCount = results[2];
    this.nodesStatus = results[3];
    this.lastUpdate = new Date();
    this.detectNodeChanges();
    this.initialized = true;

    // After 5 seconds, requests another refresh. 
    this.timerSubscription =
      timer(5000).subscribe(() => {
        this.refreshSubject.next();
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
    if (this.timerSubscription) this.timerSubscription.unsubscribe();
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
  }

  public async startJob() {
    this.submitted = true;
    if (this.registerForm.invalid) return;

    this.loading = true;
    await this.jobService.start(this.jobParameters).toPromise();
    this.jobCount = await this.jobService.getCount().toPromise();
    this.pushMessage("Job started");
    this.loading = false;
    this.submitted = false;
  }

  public async stopJob() {
    this.loading = true;
    await this.jobService.stop().toPromise();
    this.jobCount = await this.jobService.getCount().toPromise();
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

export class MessageItem {
  public date: Date;
  public message: string;
}