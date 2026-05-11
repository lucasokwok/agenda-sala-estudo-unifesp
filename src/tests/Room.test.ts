import { describe, it, expect, vi } from "vitest";
import { IndividualRoom } from "../room/IndividualRoom";
import { GroupRoom } from "../room/GroupRoom";
import { LabRoom } from "../room/LabRoom";
import { User } from "../User";
import { Reservation } from "../Reservation";

describe("Room", () => {
  it("deve imprimir uma sala individual sem reservas", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const room = new IndividualRoom("Sala Individual 1");

    room.showReservations();

    expect(consoleSpy).toHaveBeenCalledWith("Room: Sala Individual 1");
    expect(consoleSpy).toHaveBeenCalledWith("Nenhuma reserva cadastrada.");

    consoleSpy.mockRestore();
  });

  it("deve imprimir uma sala de grupo com suas reservas", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const user = new User("Lucas", true);
    const room = new GroupRoom("Sala Grupo 1", 4);

    const reservation = new Reservation(
      new Date("2026-05-11T10:00:00"),
      user,
      room.name,
    );

    room.addReservation(reservation);
    room.showReservations();

    expect(consoleSpy).toHaveBeenCalledWith("Room: Sala Grupo 1 | Mesas: 4");

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Usuário: Lucas"),
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Sala: Sala Grupo 1"),
    );

    consoleSpy.mockRestore();
  });

  it("deve imprimir uma sala de laboratório com suas reservas", () => {
    const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});

    const user = new User("Ana", false);
    const room = new LabRoom("Lab 1", "Informática");

    const reservation = new Reservation(
      new Date("2026-05-11T14:00:00"),
      user,
      room.name,
    );

    room.addReservation(reservation);
    room.showReservations();

    expect(consoleSpy).toHaveBeenCalledWith("Room: Lab 1 | Type: Informática");

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Usuário: Ana"),
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining("Sala: Lab 1"),
    );

    consoleSpy.mockRestore();
  });
});
