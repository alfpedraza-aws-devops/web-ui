import { Component, OnInit } from '@angular/core';
import { Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { JobParameters } from 'src/app/models/job-parameters.model';

@Component({
  selector: 'job-parameters-form',
  templateUrl: './job-parameters-form.component.html'
})
export class JobParametersFormComponent implements OnInit {

  @Input() public enabled: boolean = true;
  @Input() public jobParameters: JobParameters = new JobParameters();
  @Output() jobStarted = new EventEmitter<JobParameters>();
  @Output() jobStopped = new EventEmitter();

  public form: FormGroup;
  public submitted: boolean = false;
  public get f() { return this.form.controls; }

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

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

  public setJobParameters(parameters: JobParameters): void {
    this.form.patchValue(parameters);
  }

  public startJob() {
    this.submitted = true;
    if (this.form.invalid) return;
    this.jobStarted.emit(this.jobParameters);
    this.submitted = false;
  }

  public stopJob() {
    this.jobStopped.emit();
  }

}