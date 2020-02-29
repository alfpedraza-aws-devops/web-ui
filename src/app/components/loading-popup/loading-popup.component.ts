import { Component } from '@angular/core';
import { LoadingPopupService } from 'src/app/services/loading-popup.service';

@Component({
  selector: 'loading-popup',
  templateUrl: './loading-popup.component.html'
})
export class LoadingPopupComponent {

  public get isVisible() { return this.popupService.isVisible; }

  constructor(private popupService: LoadingPopupService) { }

}