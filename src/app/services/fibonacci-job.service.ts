import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from 'src/app/services/http.helper';

@Injectable({ providedIn: "root"})
export class FibonacciJobService {

    constructor(private http: HttpHelper) { }

    public getCount() : Observable<string> {
        return this.http.get("/api/fibonacci-job/count");
    }

    public getStatus() : Observable<string> {
        return this.http.get("/api/fibonacci-job/status");
    }

    public getParameters() : Observable<string> {
        return this.http.get("/api/fibonacci-job/parameters");
    }

    public start() : Observable<object> {
        let parameters = { requests: 2000, concurrency: 10 };
        return this.http.put("/api/fibonacci-job", parameters);
    }
    
    public stop() : Observable<object> {
        return this.http.delete("/api/fibonacci-job");
    }
    
}