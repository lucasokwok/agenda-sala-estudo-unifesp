import { Room } from "../room/Room";
import { RoomFactory } from "../factory/RoomFactory";

export class RoomService {
  private rooms: Room[] = [];

  public create(name: string, type: string) {
    const roomFactory = new RoomFactory();

    try {
      this.rooms.push(roomFactory.create(name, type));
    } catch (e) {
      console.log(e);
    }
  }
}
