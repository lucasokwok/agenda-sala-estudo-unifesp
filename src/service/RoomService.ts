import { Room } from "../room/Room";
import { RoomFactory } from "../factory/RoomFactory";
import { Reservation } from "../reservation";

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

  public book(reservation: Reservation) {
    // regitrar reserva rooms.
    const roomIndex = this.findRoom(reservation.room.name);
    if (roomIndex == -1) return; // nao existe room com esse nome

    // existe room com esse nome entao ver se tem reservations para a mesma data
    // if (this.rooms[roomIndex].reservations)
  }

  public findRoom(name: string): number {
    return this.rooms.findIndex((room) => room.name === name);
  }
}
