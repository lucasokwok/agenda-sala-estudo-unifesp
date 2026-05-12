import { RoomFactory } from "../factory/RoomFactory";
import { Reservation } from "../Reservation";
import { Room } from "../room/Room";
import { ReservationStrategy } from "../strategy/ReservationStrategy";
import { User } from "../User";
import { RoomService } from "./RoomService";

export class ReservationService {
  private constructor(private reservationStrategy: ReservationStrategy) {}

  public create(date: Date, roomName: string, user: User) {
    if (!this.reservationStrategy.verify(date, roomName, user)) return;

    // Se chegou aqui room existe entao pode reservar
    const reservation = new Reservation(date, user, roomName);
    const room = RoomService.getInstance().findRoom(roomName);
    room?.addReservation(reservation);
  }
}
