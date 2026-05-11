import { Reservation } from "../Reservation";
import { Room } from "../room/Room";
import { ReservationStrategy } from "../strategy/ReservationStrategy";

export class ReservationService {
  private constructor(reservationStrategy: ReservationStrategy) {}

  public create() {
    // verificar se eh possivel reservar usando a strategia recebida
  }

  public findReservationByDate(
    date: Date,
    room: Room,
  ): Reservation | undefined {
    return room.reservations.find(
      (reservation) => reservation.date.getTime() === date.getTime(),
    );
  }
}
