import { Room } from "./Room";

export class LabRoom implements Room {
  public name: string;

  constructor(name: string) {
    this.name = name;
  }
}
