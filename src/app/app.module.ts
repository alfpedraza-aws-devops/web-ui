import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from "@angular/forms";
import { AppRoutingModule } from './app-routing.module';

import { ClusterStatusComponent } from './components/cluster-autoscaler-test/cluster-status.component';
import { HpaStatusComponent } from './components/cluster-autoscaler-test/hpa-status.component';
import { EventListComponent } from './components/cluster-autoscaler-test/event-list.component';
import { JobParametersFormComponent } from './components/cluster-autoscaler-test/job-parameters-form.component';
import { ClusterAutoscalerTestComponent } from './components/cluster-autoscaler-test/cluster-autoscaler-test.component';
import { TitleBarComponent } from './components/title-bar/title-bar.component';
import { LoadingPopupComponent } from './components/loading-popup/loading-popup.component';
import { BlankPopupComponent } from './components/blank-popup/blank-popup.component';
import { AppComponent } from './components/app.component';

@NgModule({
  declarations: [
    ClusterStatusComponent,
    HpaStatusComponent,
    EventListComponent,
    JobParametersFormComponent,
    ClusterAutoscalerTestComponent,
    TitleBarComponent,
    LoadingPopupComponent,
    BlankPopupComponent,
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
