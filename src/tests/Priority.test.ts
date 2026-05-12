import { describe, it, expect } from "vitest";
import { RoomService } from "../service/RoomService";
import { Reservation } from "../Reservation";
import { User } from "../User";
import { ArrivalPriority } from "../strategy/ArrivalPriority";
import { TeacherPriority } from "../strategy/TeacherPriority";

describe("ReservationStrategy", () => {
  it("deve retornar false quando a sala não existir", () => {
    const strategy = new ArrivalPriority();

    const user = new User("Lucas", false);
    const date = new Date("2026-05-11T10:00:00");

    const result = strategy.verify(date, "Sala Inexistente", user);

    expect(result).toBe(false);
  });

  it("deve retornar true quando a sala existir e não houver reserva na data", () => {
    const roomService = RoomService.getInstance();

    roomService.createIndividualRoom("Sala Sem Reserva");

    const strategy = new ArrivalPriority();

    const user = new User("Lucas", false);
    const date = new Date("2026-05-11T10:00:00");

    const result = strategy.verify(date, "Sala Sem Reserva", user);

    expect(result).toBe(true);
  });

  it("deve manter a reserva antiga com ArrivalPriority quando já existir reserva na mesma data", () => {
    const roomService = RoomService.getInstance();

    roomService.createIndividualRoom("Sala Arrival");

    const room = roomService.findRoom("Sala Arrival");

    if (!room) {
      throw new Error("Sala não encontrada.");
    }

    const date = new Date("2026-05-11T10:00:00");

    const firstUser = new User("Lucas", false);
    const secondUser = new User("Ana", false);

    const existingReservation = new Reservation(date, firstUser, room.name);
    const newReservation = new Reservation(date, secondUser, room.name);

    room.addReservation(existingReservation);

    const strategy = new ArrivalPriority();

    const canReserve = strategy.verify(date, room.name, secondUser);

    if (canReserve) {
      room.addReservation(newReservation);
    }

    expect(canReserve).toBe(false);
    expect(room.reservations.length).toBe(1);
    expect(room.reservations[0].user.name).toBe("Lucas");
  });

  it("deve substituir a reserva antiga com TeacherPriority quando o novo usuário for docente", () => {
    const roomService = RoomService.getInstance();

    roomService.createIndividualRoom("Sala Teacher Docente");

    const room = roomService.findRoom("Sala Teacher Docente");

    if (!room) {
      throw new Error("Sala não encontrada.");
    }

    const date = new Date("2026-05-11T14:00:00");

    const firstUser = new User("Lucas", false);
    const teacherUser = new User("Professor João", true);

    const existingReservation = new Reservation(date, firstUser, room.name);
    const newReservation = new Reservation(date, teacherUser, room.name);

    room.addReservation(existingReservation);

    const strategy = new TeacherPriority();

    const canReserve = strategy.verify(date, room.name, teacherUser);

    if (canReserve) {
      room.addReservation(newReservation);
    }

    expect(canReserve).toBe(true);
    expect(room.reservations.length).toBe(1);
    expect(room.reservations[0].user.name).toBe("Professor João");
  });

  it("deve manter a reserva antiga com TeacherPriority quando o novo usuário não for docente", () => {
    const roomService = RoomService.getInstance();

    roomService.createIndividualRoom("Sala Teacher Aluno");

    const room = roomService.findRoom("Sala Teacher Aluno");

    if (!room) {
      throw new Error("Sala não encontrada.");
    }

    const date = new Date("2026-05-11T16:00:00");

    const firstUser = new User("Lucas", false);
    const secondUser = new User("Ana", false);

    const existingReservation = new Reservation(date, firstUser, room.name);
    const newReservation = new Reservation(date, secondUser, room.name);

    room.addReservation(existingReservation);

    const strategy = new TeacherPriority();

    const canReserve = strategy.verify(date, room.name, secondUser);

    if (canReserve) {
      room.addReservation(newReservation);
    }

    expect(canReserve).toBe(false);
    expect(room.reservations.length).toBe(1);
    expect(room.reservations[0].user.name).toBe("Lucas");
  });
});
