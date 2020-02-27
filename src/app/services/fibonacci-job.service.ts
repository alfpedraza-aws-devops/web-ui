import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from 'src/app/services/http.helper';
import { JobParameters } from 'src/app/services/jobParameters.class';

@Injectable({ providedIn: "root"})
export class FibonacciJobService {

    constructor(private http: HttpHelper) { }

    public getCount(): Observable<number> {
        return this.http.get<number>("/api/fibonacci-job/count");
    }

    public getStatus(): Observable<string> {
        return this.http.getText("/api/fibonacci-job/status");
    }

    public getParameters(): Observable<JobParameters> {
        return this.http.get<JobParameters>("/api/fibonacci-job/parameters");
    }

    public start(parameters: JobParameters): Observable<object> {
        return this.http.put("/api/fibonacci-job", parameters);
    }
    
    public stop(): Observable<object> {
        return this.http.delete("/api/fibonacci-job");
    }
    
}