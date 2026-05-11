import { Reservation } from "../Reservation";
import { Room } from "./Room";

export class GroupRoom implements Room {
  public name: string;
  public reservations: Reservation[] = [];
  public numTables: number;

  constructor(name: string, numTables: number) {
    this.name = name;
    this.numTables = numTables;
  }

  public addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  public showReservations(): void {
    console.log("Room: " + this.name + " | Mesas: " + this.numTables);

    if (this.reservations.length === 0) {
      console.log("Nenhuma reserva cadastrada.");
      return;
    }

    this.reservations.forEach((reservation) => {
      console.log(
        "Usuário: " +
          reservation.user.name +
          " | Sala: " +
          reservation.roomName +
          " | Data: " +
          reservation.date.toLocaleString(),
      );
    });
  }
}
