import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHelper } from 'src/app/services/httpHelper.service';

/**
 * Consumes a REST endpoint to GET information about the nodes in the Kubernetes cluster.
 */
@Injectable({ providedIn: "root"})
export class NodesService {

    /**
     * Creates a new instance of the NodeService class.
     * @param http A helper service used to perform HTTP requests.
     */
    constructor(private http: HttpHelper) { }

    /**
     * Gets the number of nodes present in the cluster.
     * @returns An Promise<number> object representing the number
     * of nodes present in the cluster.
     */
    public getCount(): Promise<number> {
        return this.http.get<number>("/api/nodes/count");
    }

    /**
     * Gets the CPU and memory metrics of the nodes present in the cluster.
     * @returns An Observable<string> object representing the metrics.
     */
    public getStatus(): Promise<string> {
        return this.http.getText("/api/nodes/status");
    }
    
}