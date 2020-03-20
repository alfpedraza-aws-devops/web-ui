/**
 * Contains information about the parameters used
 * to create a fibonacci job in the Kubernetes cluster.
 */
export class JobParameters {

  /**
   * Specfies the number of requests to perform by the job.
   */
  public requests: number;

  /**
   * Specifies the number of requests to perform at a time.
   */
  public concurrency: number;

  /**
   * Creates a new instance of the JobParameters class.
   * @param requests (Optional) The number of requests to perform on the job.
   * @param concurrency (Optional) The number of requests to perform at a time.
   */
  public constructor(requests?: number, concurrency?: number) {
    this.requests = requests || 0;
    this.concurrency = concurrency || 0;
  }

}