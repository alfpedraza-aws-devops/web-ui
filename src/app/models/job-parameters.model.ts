/**
 * Contains the parameters used to create a fibonacci job.
 */
export class JobParameters {
  /**
   * Specifies the number of requests to perform at a time.
   */
  public requests: number = 0;

  /**
   * Specfies the number of requests to perform on the job.
   */
  public concurrency: number = 0;
}