import { getBoard } from "../queries/methods/getBoard";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Group } from "./Group";
import { Item } from "./Item";

export class Board {
  private readonly _clientOptions!: ClientOptions;
  private _boardId: number;
  private _name: string;
  private _groups?: Group[];
  private _items?: Item[];

  constructor(
    _clientOptions: ClientOptions,
    _boardId: number,
    _name: string,
    _groups?: Group[],
    _items?: Item[]
  ) {
    Object.defineProperty(this, "_clientOptions", {
      value: _clientOptions,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    this._boardId = _boardId;
    this._name = _name;
    this._groups = _groups;
    this._items = _items;
  }

  public get boardId() {
    return this._boardId;
  }

  public get name() {
    return this._name;
  }

  public get groups() {
    return this._groups;
  }
  public get items() {
    return this._items;
  }

  public async update(requestOptions: QueryRequestOptions) {
    const updatedBoard = await getBoard(
      this._clientOptions,
      this._boardId,
      requestOptions
    );
    this._name = updatedBoard.name;
    this._groups = updatedBoard.groups;
    this._items = updatedBoard.items;
    return this;
  }
}
