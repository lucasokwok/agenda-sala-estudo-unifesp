import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { RoomService } from "./service/RoomService";
import { ReservationService } from "./service/ReservationService";
import { ArrivalPriority } from "./strategy/ArrivalPriority";
import { TeacherPriority } from "./strategy/TeacherPriority";
import { User } from "./User";
const rl = readline.createInterface({ input, output });

const reservationService = new ReservationService(new ArrivalPriority());

async function ask(question: string) {
  const answer = await rl.question(question);
  return answer.trim();
}

async function askDate(label: string) {
  const raw = await ask(label + " (YYYY-MM-DD): ");
  const [year, month, day] = raw.split("-");
  return new Date(Number(year), Number(month) - 1, Number(day));
}

async function askUser() {
  const name = await ask("User name: ");
  const role = await ask("Is teacher? (y/n): ");
  return new User(name || "User", role.toLowerCase() === "y");
}



async function createRoomFlow(roomService: RoomService) {
  console.log("Types: 1) Individual  2) Group  3) Lab");
  const type = await ask("Choice o tipo: ");
  const name = await ask("Room name: ");


  switch (type) {
    case "1":
      roomService.createIndividualRoom(name);
      console.log('Individual room "' + name + '" created.');
      return;
    case "2": {
      const tablesInput = await ask("Number of tables: ");
      const tables = Number.parseInt(tablesInput, 10);
      if (!Number.isFinite(tables) || tables <= 0) {
        console.log("Invalid number of tables");
        return;
      }
      roomService.createGroupRoom(name, tables);
      console.log('Group room "' + name + '" created with ' + tables + " tables");
      return;
    }
    case "3": {
      const labType = await ask("Lab type: ");
      roomService.createLabRoom(name, labType || "");
      console.log('Lab "' + name + '" created.');
      return;
    }
    default:
      console.log("Invalid type");
  }
}

async function listAvailableFlow(roomService: RoomService) {
  const start = await askDate("Start");
  const end = await askDate("End");

  const available = roomService.listAvailableRooms(start, end);
  if (available.length === 0) {
    console.log("No rooms available in that interval");
    return;
  }

  console.log("Available rooms:");
  available.forEach((room) => console.log(" - " + room.name));
}

async function createReservationFlow(reservationService: ReservationService) {
  const roomName = await ask("Room name: ");
  const date = await askDate("Reservation date:");
  const user = await askUser();

  const ok = reservationService.create(date, roomName, user);
  console.log(ok ? "Reservation created" : "Not possible to create the reservation");
}

async function modifyReservationFlow(reservationService: ReservationService) {
  const roomName = await ask("Room name: ");
  const currentDate = await askDate("Current date");
  const newDate = await askDate("New date");
  const user = await askUser();

  const ok = reservationService.modify(currentDate, newDate, roomName, user);
  console.log(ok ? "Reservation modified" : "Not possible to modify the reservation");
}

async function cancelReservationFlow(reservationService: ReservationService) {
  const roomName = await ask("Room name: ");
  const date = await askDate("Date of reservation");
const user = await askUser();
  const ok = reservationService.cancel(date, roomName, user);
  console.log(ok ? "Reservation canceled" : "Reservation not found for that user");
}

async function dailyReportFlow(roomService: RoomService) {
  const date = await askDate("Day of report");
  const report = roomService.generateDailyReservationsReport(date);
  if (report.length === 0) {
    console.log("No rooms registered");
    return;
  }

  console.log("Report for " + date.toLocaleDateString() + ":");
  report.forEach((entry) => {
    console.log("Room: " + entry.roomName);
    if (entry.reservations.length === 0) {
      console.log(" (no reservations)");
      return;
    }
    entry.reservations.forEach((reservation) => {
      console.log(
        "  - " +
          reservation.date.toLocaleString() +
          " | " +
          reservation.user.name +
          (reservation.user.isDocente ? " (docente)" : "(aluno)"),
      );
    });
  });
}

async function switchStrategyFlow() {
  console.log("Strategies: 1) ArrivalPriority  2) TeacherPriority");
  const c = await ask("Choice: ");
  if (c === "1") reservationService.setStrategy(new ArrivalPriority());
  else if (c === "2") reservationService.setStrategy(new TeacherPriority());
  else {
    console.log("Bad input");
    return;
  }
  console.log("Active strategy: " + reservationService.strategy.constructor.name);
}

async function main() {
  const roomService = RoomService.getInstance();

  let running = true;
  while (running) {
    console.log(
      "\n Options:\n 1) Create room\n 2) List all rooms\n 3) List available rooms in a gap\n 4) Create reservation \n 5) Modify reservation \n 6) Cancel reservation \n 7) Daily report \n 8) Change strategy (current: " +
        reservationService.strategy.constructor.name +
        ")\n 9) Turn off",
    );

    const answer = await ask("Choose: ");
    switch (answer) {
      case "1":
        await createRoomFlow(roomService);
        break;
      case "2":
        roomService.showRooms();
        break;
      case "3":
        await listAvailableFlow(roomService);
        break;
      case "4":
        await createReservationFlow(reservationService);
        break;
      case "5":
        await modifyReservationFlow(reservationService);
        break;
      case "6":
        await cancelReservationFlow(reservationService);
        break;
      case "7":
        await dailyReportFlow(roomService);
        break;
      case "8":
        await switchStrategyFlow();
        break;
      case "9":
        console.log("Turning off..");
        running = false;
        break;
      default:
        console.log("Bad input");
    }
  }

  rl.close();
}

main();