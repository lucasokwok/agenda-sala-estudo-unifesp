import { Room } from "../room/Room";
import { User } from "../user";

export interface ReservationStrategy {
  verify(date: Date, room: Room, user: User): boolean;
}
