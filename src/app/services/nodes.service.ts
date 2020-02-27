import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from 'src/app/services/http.helper';

@Injectable({ providedIn: "root"})
export class NodesService {

    constructor(private http: HttpHelper) { }

    public getCount(): Observable<string> {
        return this.http.get("/api/nodes/count");
    }

    public getStatus(): Observable<string> {
        return this.http.get("/api/nodes/status");
    }
    
}