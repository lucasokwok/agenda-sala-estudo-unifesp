import { Reservation } from "../Reservation";
import { Room } from "./Room";

export class IndividualRoom implements Room {
  public name: string;
  public reservations: Reservation[] = [];

  constructor(name: string) {
    this.name = name;
  }

  public addReservation(reservation: Reservation): void {
    this.reservations.push(reservation);
  }

  public showReservations(): void {
    console.log("Room: " + this.name);

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
