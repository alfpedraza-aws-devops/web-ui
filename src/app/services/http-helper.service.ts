import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

/**
 * A service used to perform HTTP requests to the kubernetes-api service.
 */
@Injectable({ providedIn: "root"})
export class HttpHelper {

    /**
     * Creates a new instance of the HttpHelper class.
     * @param http A service that performs HTTP requests.
     */
    public constructor(private http: HttpClient) { }

    /**
     * Generates a GET request and returns the response as the specified type.
     * @param path The endpoint URL.
     * @returns A Promise<T> object with the response of the GET request.
     */
    public get<T>(path: string): Promise<T> {
        let url = environment.kubernetesApiUrl + path;
        let result = this.http.get<T>(url);
        return result.toPromise();
    }

    /**
     * Generates a GET request and returns the response as a string.
     * @param path The endpoint URL.
     * @returns A Promise<string> object with the response of the GET request.
     */
    public getText(path: string): Promise<string> {
        let url = environment.kubernetesApiUrl + path;
        let result = this.http.get(url, { responseType: 'text'});
        return result.toPromise();
    }

    /**
     * Generates a PUT request and returns the response as a generic object.
     * @param path The endpoint URL.
     * @param parameters The JSON parameters used to make the request.
     * @returns A Promise<object> object with the response of the PUT request.
     */
    public put(path: string, parameters: any): Promise<object> {
        let url = environment.kubernetesApiUrl + path;
        let headers = new HttpHeaders().set("Content-Type", "application/json");
        let result = this.http.put(url, parameters, { headers: headers });
        return result.toPromise();
    }

    /**
     * Generates a DELETE request and returns the response as a generic object.
     * @param path The endpoint URL.
     * @returns A Promise<object> object with the response of the DELETE request.
     */
    public delete(path: string): Promise<object> {
        let url = environment.kubernetesApiUrl + path;
        let result = this.http.delete(url);
        return result.toPromise();
    }

}