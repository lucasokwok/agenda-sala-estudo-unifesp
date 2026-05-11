import { Room } from "../room/Room";
import { User } from "../user";
import { ReservationStrategy } from "./ReservationStrategy";

export class ArrivalPriority implements ReservationStrategy {
  public verify(date: Date, room: Room, user: User): boolean {
    const index = room.reservations.findIndex(
      (reservation) => reservation.date.getTime() === date.getTime(),
    );

    if (index == -1) return true; // nao tem nenhuma reserva nessa sala para essa data

    // comparar as duas reservas para ver qual fica
    // quem chegou primeiro fica
    return false;
  }
}
