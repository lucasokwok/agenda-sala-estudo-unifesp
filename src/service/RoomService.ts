import { Room } from "../room/Room";
import { RoomFactory } from "../factory/RoomFactory";

export class RoomService {
  private static instance: RoomService | null = null;
  private rooms: Room[] = [];
  private roomFactory: RoomFactory = new RoomFactory();

  private constructor() {} // padrão Singleton

  public static getInstance(): RoomService {
    if (RoomService.instance === null) {
      RoomService.instance = new RoomService();
    }

    return RoomService.instance;
  }

  public createLabRoom(name: string, type: string): void {
    const room = this.roomFactory.createLabRoom(name, type);
    this.rooms.push(room);
  }

  public createIndividualRoom(name: string): void {
    const room = this.roomFactory.createIndividualRoom(name);
    this.rooms.push(room);
  }

  public createGroupRoom(name: string, numTables: number): void {
    const room = this.roomFactory.createGroupRoom(name, numTables);
    this.rooms.push(room);
  }

  public findRoom(name: string): Room | undefined {
    return this.rooms.find((room) => room.name === name);
  }

  public listAvailableRooms(startDate: Date, endDate: Date): Room[] {
    const intervalStart = Math.min(startDate.getTime(), endDate.getTime());
    const intervalEnd = Math.max(startDate.getTime(), endDate.getTime());

    return this.rooms.filter((room) =>
      room.reservations.every((reservation) => {
        const reservationTime = reservation.date.getTime();

        return reservationTime < intervalStart || reservationTime > intervalEnd;
      }),
    );
  }

  public showRooms(): void {
    this.rooms.forEach((room) => {
      console.log(room.name);
    });
  }
}
