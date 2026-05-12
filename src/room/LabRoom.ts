import { Reservation } from "../Reservation";
import { Room } from "./Room";

export class LabRoom implements Room {
  public name: string;
  public type: string;
  public reservations: Reservation[] = [];

  constructor(name: string, type: string) {
    this.name = name;
    this.type = type;
  }

  public addReservation(reservation: Reservation): void {
    // procura se ja existe reserva na mesma data, se existe substitua
    // se chegou aqui entao ja passou pelo verify
    const existingReservationIndex = this.reservations.findIndex(
      (currentReservation) =>
        currentReservation.date.getTime() === reservation.date.getTime(),
    );

    if (existingReservationIndex !== -1) {
      this.reservations.splice(existingReservationIndex, 1);
    }

    this.reservations.push(reservation);
  }

  public showReservations(): void {
    console.log("Room: " + this.name + " | Type: " + this.type);

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
