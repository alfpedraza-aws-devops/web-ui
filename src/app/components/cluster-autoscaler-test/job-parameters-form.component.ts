import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobParameters } from 'src/app/models/job-parameters.model';

/**
 * Displays a form to take the values for the job parameters.
 */
@Component({
  selector: 'job-parameters-form',
  templateUrl: './job-parameters-form.component.html'
})
export class JobParametersFormComponent implements OnInit {

  //#region Parameters

  /**
   * Determines whether the form controls should be enabled or not.
   */
  @Input() public enabled: boolean = true;

  /**
   * Holds the information of the parameters in the form.
   */
  @Input() public jobParameters: JobParameters = new JobParameters();

  /**
   * Used to emit an event when the "Start Job" button is clicked.
   */
  @Output() public jobStarted = new EventEmitter<JobParameters>();

  /**
   * Used to emit an event when the "Stop Job" button is clicked.
   */
  @Output() public jobStopped = new EventEmitter();

  /**
   * Holds the information of the form.
   */
  public form: FormGroup;

  /**
   * Exposes a convenient way to access the "form.controls" array from the HTML.
   */
  public get f() { return this.form.controls; }

  /**
   * Determines whether the form has ever been submitted or not.
   */
  public submitted: boolean = false;

  /**
   * Creates a new instance of the JobParametersFormComponent class.
   * @param formBuilder Creates a form from a user-specified configuration.
   */
  public constructor(private formBuilder: FormBuilder) { }

  //#endregion
  
  /**
   * An Angular callback executed during component initialization.
   */
  public ngOnInit(): void {
    this.initializeForm();
  }

  // Initialize the form controls and its validator.
  // It subscribes to the valueChanges Observable to update the values
  // of the controls whenever there is a call to "form.pathValue()" or
  // by the user in the UI.
  private initializeForm(): void {
    this.form = this.formBuilder.group({
      requests: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(10000)]],
      concurrency: ['', [
        Validators.required,
        Validators.min(1),
        Validators.max(100)]]
    });
    
    this.form.valueChanges.subscribe(data => {
      this.jobParameters.requests = data.requests;
      this.jobParameters.concurrency = data.concurrency;
    });
  }

  /**
   * Updates the values of the form controls.
   * @param parameters The values to update.
   */
  public setJobParameters(parameters: JobParameters): void {
    this.form.patchValue(parameters);
  }

  /**
   * Emits the jobStarted event only if the form is valid.
   */
  public startJob() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.jobStarted.emit(this.jobParameters);
    this.submitted = false;
  }

  /**
   * Emits the jobStopped event.
   */
  public stopJob() {
    this.jobStopped.emit();
  }

}