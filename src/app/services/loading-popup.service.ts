import { Injectable } from '@angular/core';

/**
 * Holds information about the loading popup.
 */
@Injectable({ providedIn: "root"})
export class LoadingPopupService {

    // Is the number of current requests.
    private requests: number = 0;

    /**
     * Determines wheter the popup should be visible or not.
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