import { describe, it, expect } from "vitest";
import { Reservation } from "../Reservation";
import { User } from "../User";

describe("Reservation", () => {
  it("deve criar uma reserva com data, usuário e nome da sala", () => {
    const user = new User("Lucas", true);
    const date = new Date("2026-05-11T10:00:00");

    const reservation = new Reservation(date, user, "Sala Individual 1");

    expect(reservation.date).toBe(date);
    expect(reservation.user).toBe(user);
    expect(reservation.roomName).toBe("Sala Individual 1");
  });

  it("deve permitir acessar o nome do usuário da reserva", () => {
    const user = new User("Ana", false);
    const date = new Date("2026-05-11T14:00:00");

    const reservation = new Reservation(date, user, "Lab 1");

    expect(reservation.user.name).toBe("Ana");
    expect(reservation.roomName).toBe("Lab 1");
  });
});
