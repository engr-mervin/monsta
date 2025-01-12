import { MonstaaError } from "../error";
import { getBoard } from "../queries/methods/getBoard";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Column, JSONColumn } from "./Column";
import { Group, JSONGroup } from "./Group";
import { Item, JSONItem } from "./Item";

export interface JSONBoard {
  _boardId: number;
  _name: string;
  _columns?: JSONColumn[];
  _groups?: JSONGroup[];
  _items?: JSONItem[];
}
export class Board {
  private readonly _clientOptions!: ClientOptions;
  private _boardId: number;
  private _name: string;
  private _columns?: Column[];
  private _groups?: Group[];
  private _items?: Item[];

  constructor(
    _clientOptions: ClientOptions,
    _boardId: number,
    _name: string,
    _columns?: Column[],
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
    this._columns = _columns;
    this._groups = _groups;
    this._items = _items;
  }

  public static fromJSON(
    clientOptions: ClientOptions,
    jsonBoard: JSONBoard
  ): Board {
    return new Board(
      clientOptions,
      jsonBoard._boardId,
      jsonBoard._name,
      jsonBoard._columns?.map(
        (col) => new Column(col._columnId, col._type, col._title)
      ),
      jsonBoard._groups?.map((group) => Group.fromJSON(clientOptions, group)),
      jsonBoard._items?.map((item) => Item.fromJSON(clientOptions, item))
    );
  }

  public toJSON(): string {
    return JSON.stringify({
      _boardId: this._boardId,
      _name: this._name,
      _columns: this._columns,
      _groups: this._groups,
      _items: this._items,
    });
  }

  public get boardId() {
    return this._boardId;
  }

  public get name() {
    return this._name;
  }

  public get columns() {
    if (!this._columns) {
      throw new MonstaaError("access", `Columns is uninitialized.`);
    }
    return this._columns;
  }

  public get groups() {
    if (!this._groups) {
      throw new MonstaaError("access", `Groups is uninitialized.`);
    }
    return this._groups;
  }
  public get items() {
    if (!this._items) {
      throw new MonstaaError("access", `Items is uninitialized.`);
    }
    return this._items;
  }

  public async update(
    requestOptions: QueryRequestOptions & { includeColumns: boolean }
  ) {
    const updatedBoard = await getBoard(
      this._clientOptions,
      this._boardId,
      requestOptions
    );

    if (!updatedBoard) {
      throw new Error("Tried updating deleted board");
    }
    this._name = updatedBoard.name;
    this._groups = updatedBoard.groups;
    this._items = updatedBoard.items;
    return this;
  }
}
