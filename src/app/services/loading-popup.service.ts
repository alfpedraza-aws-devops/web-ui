import { Injectable } from '@angular/core';

/**
 * Holds application-scope state about the loading popup.
 * The popup will be displayed by the loading-popup-component.
 */
@Injectable({ providedIn: "root"})
export class LoadingPopupService {

    // The number of current requests active in the application.
    private requests: number = 0;

    /**
     * Determines whether the popup should be visible or not.
     */
    public get isVisible() { return (this.requests > 0); }

    /**
     * Shows the popup.
     */
    public show(): void {
        this.requests++;
    }

    /**
     * Hides the popup.
     */
    public hide(): void {
        if (this.requests == 0)
            throw new Error("Invalid operation.");
        this.requests--;
    }

}