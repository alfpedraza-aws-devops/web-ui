import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: "root"})
export class HttpHelper {

    constructor(private http: HttpClient) { }

    public get(path: string) : Observable<string> {
        let url = environment.kubernetesApiUrl + path;
        let result = this.http.get(url, { responseType: 'text'});
        return result;
    }

    public put(path: string, parameters: any) : Observable<object> {
        let url = environment.kubernetesApiUrl + path;
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        return this.http.put(url, parameters, { headers });
    }

    public delete(path: string) : Observable<object> {
        let url = environment.kubernetesApiUrl + path;
        return this.http.delete(url);
    }

}