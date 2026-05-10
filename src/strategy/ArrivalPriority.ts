import { Room } from "../room/Room";
import { User } from "../user";
import { ReservationStrategy } from "./ReservationStrategy";

export class ArrivalPriority implements ReservationStrategy {
  verify(date: Date, room: Room, user: User): boolean {
    return false;
  }
}
