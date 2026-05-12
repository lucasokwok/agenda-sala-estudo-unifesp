import { ReservationObserver } from "./observer/ReservationObserver";
import { Reservation } from "./Reservation";

export class User implements ReservationObserver {
  constructor(
    private _name: string,
    private _isDocente: boolean,
  ) {}

  public get name(): string {
    return this._name;
  }

  public get isDocente(): boolean {
    return this._isDocente;
  }

  public onReservationChange(reservation: Reservation, event: string): void {
    console.log(
      "\nObserver -> " + this._name +
        " - evento: " + event +
        " - sala: " + reservation.roomName +
        " - data: " + reservation.date.toLocaleDateString()+"\n",
    );
  }
}
