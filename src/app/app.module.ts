import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './components/app.component';

import { NodesStatusComponent } from './components/load-test/nodes-status.component';
import { JobStatusComponent } from './components/load-test/job-status.component';
import { EventDisplayComponent } from './components/load-test/event-display.component';
import { JobParametersFormComponent } from './components/load-test/job-parameters-form.component';
import { LoadTestComponent } from './components/load-test/load-test.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { LoadingPopupComponent } from './components/loading-popup/loading-popup.component';

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
