import { Injectable } from '@angular/core';
import { HttpHelper } from 'src/app/services/http-helper.service';

/**
 * Consumes a REST endpoint to GET information about the nodes
 * running in the Kubernetes cluster.
 */
@Injectable({ providedIn: "root"})
export class ClusterService {

    /**
     * Creates a new instance of the ClusterService class.
     * @param http A helper service used to perform HTTP requests
     * to the kubernetes-api REST endpoint.
     */
    public constructor(private http: HttpHelper) { }

    /**
     * Gets the number of nodes present in the Kubernetes cluster.
     * @returns A Promise<number> object representing the number
     * of nodes present in the cluster.
     */
    public getNodeCount(): Promise<number> {
        return this.http.get<number>("/api/cluster/node-count");
    }

    /**
     * Gets the CPU and memory metrics of the nodes present in the cluster.
     * @returns A Promise<string> object representing the metrics.
     */
    public getStatus(): Promise<string> {
        return this.http.getText("/api/cluster/status");
    }

    /**
     * Gets the status of the fibonacci horizontal pod autoscaler (HPA).
     * @returns A Promise<string> object representing the status
     * of the fibonacci horizontal pod autoscaler.
     */
    public getHpaStatus(): Promise<string> {
        return this.http.getText("/api/cluster/hpa-status");
    }
    
}