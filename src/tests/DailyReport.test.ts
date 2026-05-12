import { describe, expect, it } from "vitest";
import { ArrivalPriority } from "../strategy/ArrivalPriority";
import { ReservationService } from "../service/ReservationService";
import { RoomService } from "../service/RoomService";
import { User } from "../User";

describe("Daily reservations report", () => {
  it("deve retornar as reservas confirmadas do dia separadas por sala", () => {
    const roomService = RoomService.getInstance();
    const reservationService = new ReservationService(new ArrivalPriority());
    const user = new User("Lucas", false);

    roomService.createIndividualRoom("Sala Relatorio Diario 1");
    roomService.createGroupRoom("Sala Relatorio Diario 2", 6);

    reservationService.create(
      new Date("2026-05-12T09:00:00"),
      "Sala Relatorio Diario 1",
      user,
    );

    reservationService.create(
      new Date("2026-05-12T14:00:00"),
      "Sala Relatorio Diario 2",
      user,
    );

    reservationService.create(
      new Date("2026-05-13T10:00:00"),
      "Sala Relatorio Diario 2",
      user,
    );

    const report = roomService.generateDailyReservationsReport(
      new Date("2026-05-12T00:00:00"),
    );

    const roomOneReport = report.find(
      (roomReport) => roomReport.roomName === "Sala Relatorio Diario 1",
    );

    const roomTwoReport = report.find(
      (roomReport) => roomReport.roomName === "Sala Relatorio Diario 2",
    );

    expect(roomOneReport?.reservations.length).toBe(1);
    expect(roomOneReport?.reservations[0].roomName).toBe(
      "Sala Relatorio Diario 1",
    );

    expect(roomTwoReport?.reservations.length).toBe(1);
    expect(roomTwoReport?.reservations[0].date.getTime()).toBe(
      new Date("2026-05-12T14:00:00").getTime(),
    );
  });
});
