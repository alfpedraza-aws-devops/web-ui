import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from 'src/app/services/httpHelper.service';
import { JobParameters } from 'src/app/models/jobParameters.model';

/**
 * Consumes a REST endpoint to perform several operations with the Fibonacci Job.
 */
@Injectable({ providedIn: "root"})
export class FibonacciJobService {

    /**
     * Creates a new instance of the FibonacciJobService class.
     * @param http A helper service used to perform HTTP requests.
     */
    constructor(private http: HttpHelper) { }

    /**
     * Gets the number of fibonacci jobs running in the cluster.
     * @returns An Promise<number> object representing the number
     * of fibonacci jobs running.
     */
    public getCount(): Promise<number> {
        return this.http.get<number>("/api/fibonacci-job/count");
    }

    /**
     * Gets the status of the fibonacci deployment.
     * @returns An Promise<string> object representing the status
     * of the fibonacci deployment.
     */
    public getStatus(): Promise<string> {
        return this.http.getText("/api/fibonacci-job/status");
    }

    /**
     * Gets the parameters used to execute the fibonacci job.
     * @returns An Promise<JobParameters> object representing 
     * the paremeters used to execute the job.
     */
    public getParameters(): Promise<JobParameters> {
        return this.http.get<JobParameters>("/api/fibonacci-job/parameters");
    }

    /**
     * Creates a new fibonacci job with the specified parameters.
     * @param parameters The parameters used to execute the fibonacci job.
     * @returns An Promise<object> that returns nothing.
     */
    public start(parameters: JobParameters): Promise<object> {
        return this.http.put("/api/fibonacci-job", parameters);
    }
    
    /**
     * Deletes the current executing fibonacci job.
     * @returns An Promise<object> that returns nothing.
     */
    public stop(): Promise<object> {
        return this.http.delete("/api/fibonacci-job");
    }
    
}