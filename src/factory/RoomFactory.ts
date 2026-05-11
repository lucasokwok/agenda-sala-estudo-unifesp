import { Room } from "../room/Room";
import { IndividualRoom } from "../room/IndividualRoom";
import { GroupRoom } from "../room/GroupRoom";
import { LabRoom } from "../room/LabRoom";

export class RoomFactory {
  public createLabRoom(name: string, type: string): Room {
    return new LabRoom(name, type);
  }

  public createIndividualRoom(name: string): Room {
    return new IndividualRoom(name);
  }

  public createGroupRoom(name: string, numTables: number): Room {
    return new GroupRoom(name, numTables);
  }
}
