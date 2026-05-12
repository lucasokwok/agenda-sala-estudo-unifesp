import { describe, expect, it } from "vitest";
import { ArrivalPriority } from "../strategy/ArrivalPriority";
import { ReservationService } from "../service/ReservationService";
import { RoomService } from "../service/RoomService";
import { User } from "../User";

describe("ReservationService", () => {
  it("deve criar uma reserva para uma sala existente", () => {
    const roomService = RoomService.getInstance();
    roomService.createIndividualRoom("Sala Create Reservation Service");

    const reservationService = new ReservationService(new ArrivalPriority());
    const user = new User("Lucas", false);

    const wasCreated = reservationService.create(
      new Date("2026-05-12T09:00:00"),
      "Sala Create Reservation Service",
      user,
    );

    const room = roomService.findRoom("Sala Create Reservation Service");

    expect(wasCreated).toBe(true);
    expect(room?.reservations.length).toBe(1);
    expect(room?.reservations[0].user.name).toBe("Lucas");
  });

  it("deve modificar a data de uma reserva existente", () => {
    const roomService = RoomService.getInstance();
    roomService.createIndividualRoom("Sala Modify Reservation Service");

    const reservationService = new ReservationService(new ArrivalPriority());
    const user = new User("Ana", false);

    reservationService.create(
      new Date("2026-05-12T10:00:00"),
      "Sala Modify Reservation Service",
      user,
    );

    const wasModified = reservationService.modify(
      new Date("2026-05-12T10:00:00"),
      new Date("2026-05-12T11:00:00"),
      "Sala Modify Reservation Service",
      user,
    );

    const room = roomService.findRoom("Sala Modify Reservation Service");

    expect(wasModified).toBe(true);
    expect(room?.reservations.length).toBe(1);
    expect(room?.reservations[0].date.getTime()).toBe(
      new Date("2026-05-12T11:00:00").getTime(),
    );
  });

  it("deve cancelar uma reserva existente", () => {
    const roomService = RoomService.getInstance();
    roomService.createIndividualRoom("Sala Cancel Reservation Service");

    const reservationService = new ReservationService(new ArrivalPriority());
    const user = new User("Bruna", false);

    reservationService.create(
      new Date("2026-05-12T12:00:00"),
      "Sala Cancel Reservation Service",
      user,
    );

    const wasCancelled = reservationService.cancel(
      new Date("2026-05-12T12:00:00"),
      "Sala Cancel Reservation Service",
      user,
    );

    const room = roomService.findRoom("Sala Cancel Reservation Service");

    expect(wasCancelled).toBe(true);
    expect(room?.reservations.length).toBe(0);
  });
});
