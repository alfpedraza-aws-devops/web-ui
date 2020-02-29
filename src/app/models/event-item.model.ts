/**
 * Holds the information of an event.
 */
export class EventItem {

    /**
     * The date when the event was generated.
     */
    public date: Date = new Date();

    /**
     * It's description of this event.
     */
    public message: string = "";

    /**
     * Creates a new instance of the EventItem class.
     * @param message The text of this event.
     */
    public constructor(message?: string) {
      this.date = new Date();
      this.message = message || "";
    }

  }