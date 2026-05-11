import { Reservation } from "../reservation";

export interface Room {
  name: string;
  reservations: Reservation[];
}
