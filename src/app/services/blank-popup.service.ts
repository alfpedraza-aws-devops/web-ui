import { Injectable } from '@angular/core';
import { LoadingPopupService } from 'src/app/services/loading-popup.service';

/**
 * Holds application-wide state about the blank popup.
 * The popup will be displayed by the blank-popup-component.
 */
@Injectable({ providedIn: "root"})
export class BlankPopupService extends LoadingPopupService {
    // Inherits all the functionality from the LoadingPopupservice.
    // No more extra logic to implement here.
}