import { Injectable } from '@angular/core';
import { LoadingPopupService } from 'src/app/services/loading-popup.service';

/**
 * Holds application-scope state about the blank popup.
 * The popup will be displayed by the blank-popup-component.
 */
@Injectable({ providedIn: "root"})
export class BlankPopupService extends LoadingPopupService {
    // Inherits all the functionality from the LoadingPopupservice.
    // There is any more logic to add here.
}