import { Reservation } from "../Reservation";
import { Room } from "../room/Room";
import { User } from "../User";
import { ReservationStrategy } from "./ReservationStrategy";

export class TeacherPriority extends ReservationStrategy {
  protected resolveConflict(
    date: Date,
    room: Room,
    user: User,
    existingReservation: Reservation,
  ): boolean {
    return user.isDocente; // Se eh docente tem prioridade
  }
}
