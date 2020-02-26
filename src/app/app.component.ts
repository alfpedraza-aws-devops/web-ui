import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private http:HttpClient) { } 

  private kubernetesApiUrl: string = environment.kubernetesApiUrl;
  public jobCountDisplay: string = "";
  public jobStatusDisplay: string = "";
  public jobParametersDisplay: string = "";
  public nodesCountDisplay: string = "";
  public nodesStatusDisplay: string = "";
  public statusDisplay: string = "";

  private get(path: string) {
    let url: string = this.kubernetesApiUrl + path;
    return this.http.get<string>(url, { responseType: "text"});
  }

  public getJobCount() {
    this.get("/api/fibonacci-job/count")
      .subscribe((value: string) => {
        this.jobCountDisplay = value; });
  }

  public getJobStatus() {
    this.get("/api/fibonacci-job/status")
      .subscribe((value: string) => {
        this.jobStatusDisplay = value; });
  }

  public getJobParameters() {
    this.get("/api/fibonacci-job/parameters")
      .subscribe((value: string) => {
        this.jobParametersDisplay = value; });
  }

  public getNodesCount() {
    this.get("/api/nodes/count")
      .subscribe((value: string) => {
        this.nodesCountDisplay = value; });
  }

  public getNodesStatus() {
    this.get("/api/nodes/status")
      .subscribe((value: string) => {
        this.nodesStatusDisplay = value; });
  }

  public startJob() {
    let path: string = "/api/fibonacci-job"
    let url: string = this.kubernetesApiUrl + path;
    let parameters: any = { requests: 2000, concurrency: 10 };
    let headers: any = new HttpHeaders().set("Content-Type", "application/json");
    this.http.put(url, parameters, { headers })
      .subscribe(() => {
        this.statusDisplay = "Job Started"; });
  }

  public stopJob() {
    let path: string = "/api/fibonacci-job"
    let url: string = this.kubernetesApiUrl + path;
    this.http.delete(url)
      .subscribe(() => {
        this.statusDisplay = "Job Deleted"; });
  }
}
