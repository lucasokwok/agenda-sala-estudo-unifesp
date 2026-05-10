import { Room } from "../room/Room";
import { RoomFactory } from "../factory/RoomFactory";

export class RoomService {
  private static instance: RoomService | null = null;
  private rooms: Room[] = [];

  private constructor() {} // padrao Singleton

  public static getInstance(): RoomService {
    if (RoomService.instance === null) {
      RoomService.instance = new RoomService();
    }

    return RoomService.instance;
  }

  public create(name: string, type: string) {
    const roomFactory = new RoomFactory();

    try {
      this.rooms.push(roomFactory.create(name, type));
    } catch (e) {
      console.log(e);
    }
  }
}
