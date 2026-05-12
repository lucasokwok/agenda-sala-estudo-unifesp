import { Reservation } from "../Reservation";
import { Room } from "../room/Room";
import { User } from "../User";
import { ReservationStrategy } from "./ReservationStrategy";

export class ArrivalPriority extends ReservationStrategy {
  protected resolveConflict(
    date: Date,
    room: Room,
    user: User,
    existingReservation: Reservation,
  ): boolean {
    return false; // Se ja estava no array entao chegou antes
  }
}
