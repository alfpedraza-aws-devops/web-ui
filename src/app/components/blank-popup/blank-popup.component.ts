import { Component } from '@angular/core';
import { BlankPopupService } from 'src/app/services/blank-popup.service';

@Component({
  selector: 'blank-popup',
  templateUrl: './blank-popup.component.html'
})
export class BlankPopupComponent {

  public get isVisible() { return this.blankService.isVisible; }

  constructor(private blankService: BlankPopupService) { }

}