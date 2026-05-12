import { Reservation } from "../Reservation";
import { Room } from "./Room";

export class IndividualRoom implements Room {
  public name: string;
  public reservations: Reservation[] = [];

  constructor(name: string) {
    this.name = name;
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
