/**
 * Holds information about an event.
 */
export class EventItem {

    /**
     * The date when the event was generated.
     */
    public date: Date;

    /**
     * The description of this event.
     */
    public message: string;

    /**
     * Creates a new instance of the EventItem class.
     * @param message (Optional) The description of this event.
     * @param date (Optional) The date when the event was generated.
     */
    public constructor(message?: string, date?: Date) {
      this.date = date || new Date();
      this.message = message || "";
    }

  }