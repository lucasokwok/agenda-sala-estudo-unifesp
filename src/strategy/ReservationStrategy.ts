import { Reservation } from "../Reservation";
import { Room } from "../room/Room";
import { User } from "../User";

export abstract class ReservationStrategy {
  public verify(date: Date, room: Room, user: User): boolean {
    const existingReservation = this.findReservationByDate(date, room);

    if (!existingReservation) {
      return true;
    }

    return this.resolveConflict(date, room, user, existingReservation);
  }

  protected findReservationByDate(
    date: Date,
    room: Room,
  ): Reservation | undefined {
    return room.reservations.find(
      (reservation) => reservation.date.getTime() === date.getTime(),
    );
  }

  protected abstract resolveConflict(
    date: Date,
    room: Room,
    user: User,
    existingReservation: Reservation,
  ): boolean;
}
