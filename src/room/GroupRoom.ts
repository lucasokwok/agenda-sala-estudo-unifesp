import { Reservation } from "../Reservation";
import { Room } from "./Room";

export class GroupRoom implements Room {
  public name: string;
  public reservations: Reservation[] = [];

  constructor(name: string) {
    this.name = name;
  }
}
