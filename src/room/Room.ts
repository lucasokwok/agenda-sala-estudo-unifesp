import { Reservation } from "../Reservation";

export interface Room {
  name: string;
  reservations: Reservation[];

  showReservations(): void;
  addReservation(reservation: Reservation): void;
}
