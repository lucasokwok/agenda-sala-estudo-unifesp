import { User } from "./user";
import { Room } from "./room/Room.ts";

export class Reservation {
  constructor(
    private readonly _date: Date,
    private readonly _user: User,
    private readonly _room: Room,
  ) {}

  public get date(): Date {
    return this._date;
  }

  public get user(): User {
    return this._user;
  }

  public get room(): Room {
    return this._room;
  }
}
