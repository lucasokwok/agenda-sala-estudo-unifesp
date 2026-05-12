import { describe, expect, it } from "vitest";
import { Reservation } from "../Reservation";
import { RoomService } from "../service/RoomService";
import { User } from "../User";

describe("Room availability", () => {
  it("deve listar apenas as salas sem reservas dentro do intervalo informado", () => {
    const roomService = RoomService.getInstance();

    roomService.createIndividualRoom("Sala Disponivel Intervalo");
    roomService.createIndividualRoom("Sala Ocupada Intervalo");
    roomService.createIndividualRoom("Sala Reserva Fora Do Intervalo");

    const busyRoom = roomService.findRoom("Sala Ocupada Intervalo");
    const outsideIntervalRoom = roomService.findRoom(
      "Sala Reserva Fora Do Intervalo",
    );

    if (!busyRoom || !outsideIntervalRoom) {
      throw new Error("Salas de teste nao encontradas.");
    }

    const user = new User("Lucas", false);

    busyRoom.addReservation(
      new Reservation(
        new Date("2026-05-12T10:00:00"),
        user,
        busyRoom.name,
      ),
    );

    outsideIntervalRoom.addReservation(
      new Reservation(
        new Date("2026-05-20T10:00:00"),
        user,
        outsideIntervalRoom.name,
      ),
    );

    const availableRooms = roomService.listAvailableRooms(
      new Date("2026-05-12T00:00:00"),
      new Date("2026-05-13T23:59:59"),
    );

    const availableRoomNames = availableRooms.map((room) => room.name);

    expect(availableRoomNames).toContain("Sala Disponivel Intervalo");
    expect(availableRoomNames).toContain("Sala Reserva Fora Do Intervalo");
    expect(availableRoomNames).not.toContain("Sala Ocupada Intervalo");
  });
});
