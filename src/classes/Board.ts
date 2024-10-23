import { ClientOptions } from "../types/types";
import { Group } from "./Group";

export class Board {
  private readonly clientOptions: ClientOptions;
  public readonly id: number;
  public readonly name: string;
  public readonly groups: Group[] | undefined;

  constructor(_clientOptions: ClientOptions, _id: number, _name: string, _groups?: Group[]) {
    this.clientOptions = _clientOptions;
    this.id = _id;
    this.name = _name;
    if(_groups){
        this.groups = _groups;
    }
  }
}
