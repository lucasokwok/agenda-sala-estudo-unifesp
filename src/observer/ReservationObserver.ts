import { Reservation } from "../Reservation";

export interface ReservationObserver {
  onReservationChange(reservation: Reservation, event: string): void;
}
