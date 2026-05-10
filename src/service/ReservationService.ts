import { ReservationStrategy } from "../strategy/ReservationStrategy";

export class ReservationService {
  private constructor(reservationStrategy: ReservationStrategy) {}

  public create() {
    // verificar se eh possivel reservar usando a strategia recebida
  }
}
