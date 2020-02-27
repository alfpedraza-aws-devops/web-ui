import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from 'src/app/services/http.helper';

@Injectable({ providedIn: "root"})
export class NodesService {

    constructor(private http: HttpHelper) { }

    public getCount(): Observable<number> {
        return this.http.get<number>("/api/nodes/count");
    }

    public getStatus(): Observable<string> {
        return this.http.getText("/api/nodes/status");
    }
    
}