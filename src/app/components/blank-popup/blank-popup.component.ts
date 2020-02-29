import { Component } from '@angular/core';
import { BlankPopupService } from 'src/app/services/blank-popup.service';

/**
 * Displays a blank popup so the content of the application
 * can be loaded in the background without disturbing the user.
 */
@Component({
  selector: 'blank-popup',
  templateUrl: './blank-popup.component.html',
  styleUrls: ['./blank-popup.component.css']
})
export class BlankPopupComponent {

  /**
   * Determines whether the popup is visible or not.
   */
  public get isVisible() { return this.blankPopup.isVisible; }

   /**
   * Creates a new instance of the BlankPopupComponent class.
   * @param blankPopup The application-wide service that holds the popup state.
   */
  public constructor(private blankPopup: BlankPopupService) { }

}