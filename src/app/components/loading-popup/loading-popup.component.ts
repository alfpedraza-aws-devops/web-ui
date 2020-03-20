import { Component } from '@angular/core';
import { LoadingPopupService } from 'src/app/services/loading-popup.service';

/**
 * Displays a popup frame that will show the "Loading..." message.
 */
@Component({
  selector: 'loading-popup',
  templateUrl: './loading-popup.component.html',
  styleUrls: ['./loading-popup.component.css']
})
export class LoadingPopupComponent {

  /**
   * Determines whether the popup is visible or not.
   */
  public get isVisible() { return this.loadingPopup.isVisible; }

  /**
   * Creates a new instance of the LoadingPopupComponent class.
   * @param loadingPopup The application-wide service that holds the popup state.
   */
  public constructor(private loadingPopup: LoadingPopupService) { }

}