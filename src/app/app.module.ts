import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

import { NodesStatusComponent } from './components/nodes-status.component';
import { JobStatusComponent } from './components/job-status.component';
import { EventDisplayComponent } from './components/event-display.component';
import { JobParametersFormComponent } from './components/job-parameters-form.component';
import { LoadTestComponent } from './components/load-test.component';
import { TitleBarComponent } from './components/title-bar.component';
import { LoadingPopupComponent } from './components/loading-popup.component';

@NgModule({
  declarations: [
    NodesStatusComponent,
    JobStatusComponent,
    EventDisplayComponent,
    JobParametersFormComponent,
    LoadTestComponent,
    TitleBarComponent,
    LoadingPopupComponent,
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
