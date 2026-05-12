import { ReservationObserver } from "./observer/ReservationObserver";
import { User } from "./User";

export class Reservation {
  private observers: ReservationObserver[] = [];

  constructor(
    private readonly _date: Date,
    private readonly _user: User,
    private readonly _roomName: string,
  ) {}

  public get date(): Date {
    return this._date;
  }

  public get user(): User {
    return this._user;
  }

  public get roomName(): string {
    return this._roomName;
  }

  public subscribe(observer: ReservationObserver): void {
    this.observers.push(observer);
  }

  public notify(event: string): void {
    this.observers.forEach((observer) =>
      observer.onReservationChange(this, event),
    );
  }
}
