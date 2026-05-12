import { Reservation } from "../Reservation";
import { ReservationStrategy } from "../strategy/ReservationStrategy";
import { User } from "../User";
import { RoomService } from "./RoomService";

export class ReservationService {
  constructor(private reservationStrategy: ReservationStrategy) {}

  public setStrategy(strategy: ReservationStrategy): void {
    this.reservationStrategy = strategy;
  }

  public get strategy(): ReservationStrategy {
    return this.reservationStrategy;
  }

  public create(date: Date, roomName: string, user: User): boolean {
    if (!this.reservationStrategy.verify(date, roomName, user)) return false;

    // Se chegou aqui room existe entao pode reservar
    const reservation = new Reservation(date, user, roomName);
    const room = RoomService.getInstance().findRoom(roomName);

    const existing = room?.reservations.find(
      (r) => r.date.getTime() === date.getTime(),
    );
    existing?.notify("REPLACED");

    reservation.subscribe(user);
    room?.addReservation(reservation);
    reservation.notify("CREATED");

    return true;
  }

  public modify(
    currentDate: Date,
    newDate: Date,
    roomName: string,
    user: User,
  ): boolean {
    const room = RoomService.getInstance().findRoom(roomName);
    if (!room) {
      return false;
    }

    const existingReservationIndex = room.reservations.findIndex(
      (reservation) =>
        reservation.date.getTime() === currentDate.getTime() &&
        this.isSameUser(reservation.user, user),
    );

    if (existingReservationIndex === -1) {
      return false;
    }

    const [existingReservation] = room.reservations.splice(
      existingReservationIndex,
      1,
    );

    existingReservation.notify("MODIFIED");

    const wasCreated = this.create(newDate, roomName, user);

    if (!wasCreated) {
      room.reservations.splice(
        existingReservationIndex,
        0,
        existingReservation,
      );
      return false;
    }

    return true;
  }

  public cancel(date: Date, roomName: string, user: User): boolean {
    const room = RoomService.getInstance().findRoom(roomName);
    if (!room) {
      return false;
    }

    const reservationIndex = room.reservations.findIndex(
      (reservation) =>
        reservation.date.getTime() === date.getTime() &&
        this.isSameUser(reservation.user, user),
    );

    if (reservationIndex === -1) {
      return false;
    }

    room.reservations[reservationIndex].notify("CANCELLED");
    room.reservations.splice(reservationIndex, 1);
    return true;
  }

  private isSameUser(firstUser: User, secondUser: User): boolean {
    return (
      firstUser.name === secondUser.name &&
      firstUser.isDocente === secondUser.isDocente
    );
  }
}
