import { Room } from "../room/Room";
import { IndividualRoom } from "../room/IndividualRoom";
import { GroupRoom } from "../room/GroupRoom";
import { LabRoom } from "../room/LabRoom";

export class RoomFactory {
  public create(type: string, name: string): Room {
    switch (type) {
      case "lab":
        return new LabRoom(name);
      case "indv":
        return new IndividualRoom(name);
      case "group":
        return new GroupRoom(name);
      default:
        throw new Error("Tipo de sala inválido.");
    }
  }
}
