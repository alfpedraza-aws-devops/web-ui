import { Component, OnInit, OnDestroy } from '@angular/core';
import { FibonacciJobService } from 'src/app/services/fibonacci-job.service';
import { NodesService } from 'src/app/services/nodes.service';
import { Subject, Subscription, forkJoin, timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

  public jobCountDisplay: string;
  public jobStatusDisplay: string;
  public jobParametersDisplay: string;
  public nodesCountDisplay: string;
  public nodesStatusDisplay: string;
  public lastUpdate: string;
  public statusDisplay: string[] = [];

  private refreshSubject: Subject<any>;
  private refreshSubscription: Subscription;
  private timerSubscription: Subscription;
  
  constructor(
    private jobService: FibonacciJobService,
    private nodesService: NodesService,
  ) { }

  async ngOnInit(): Promise<void> {
    this.startRefresh();
    this.jobCountDisplay = await this.jobService.getCount().toPromise();
    this.nodesCountDisplay = await this.nodesService.getCount().toPromise();
  }

  ngOnDestroy(): void {
    this.stopRefresh();
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
      this.jobService.getParameters(),
      this.nodesService.getCount(),
      this.nodesService.getStatus()
    ).subscribe(results => {
      this.refresh(results)
    });
  }

  private refresh(results: string[]): void {
    // Display all the values in the results.
    this.jobCountDisplay = results[0];
    this.jobStatusDisplay = results[1];
    this.jobParametersDisplay = results[2];
    this.nodesCountDisplay = results[3];
    this.nodesStatusDisplay = results[4];
    this.lastUpdate = (new Date).toString();

    // After 5 seconds, requests another refresh. 
    this.timerSubscription =
      timer(5000).subscribe(() => {
        this.refreshSubject.next();
      });
  }

  private stopRefresh(): void {
    if (this.timerSubscription) this.timerSubscription.unsubscribe();
    if (this.refreshSubscription) this.refreshSubscription.unsubscribe();
  }

  public startJob() {
    this.jobService.start().subscribe(() => {
      this.pushMessage("Job Started");
    });
  }

  public stopJob() {
    this.jobService.stop().subscribe(() => {
      this.pushMessage("Job Stopped");
    });
  }

  private pushMessage(message: string): void {
    let now = (new Date()).toLocaleTimeString();
    let item = now + " " + message; 
    this.statusDisplay.push(item);
  }

}