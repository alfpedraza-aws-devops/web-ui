/**
 * Contains the parameters used to create a fibonacci job.
 */
export class JobParameters {

  /**
   * Specfies the number of requests to perform on the job.
   */
  public requests: number = 0;

  /**
   * Specifies the number of requests to perform at a time.
   */
  public concurrency: number = 0;

  /**
   * Creates a new instance of the JobParameters class.
   * @param requests The number of requests to perform on the job.
   * @param concurrency The number of requests to perform at a time.
   */
  public constructor(requests?: number, concurrency?: number) {
    this.requests = requests || 0;
    this.concurrency = concurrency || 0;
  }

}