import { MonstaaError } from "../error";
import { getItem } from "../queries/methods/getItem";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Cell, CellValue } from "./Cell";

export class Item {
  private readonly _clientOptions!: ClientOptions;
  private _itemId: number;
  private _name: string;
  private _groupId: string;
  private _boardId: number;
  private _values: Record<string, CellValue | undefined> | undefined =
    undefined;
  private _cells?: Record<string, Cell | undefined>;
  private _subitems?: Item[];

  constructor(
    _clientOptions: ClientOptions,
    _itemId: number,
    _name: string,
    _groupId: string,
    _boardId: number,
    _cells?: Cell[],
    _subitems?: Item[]
  ) {
    Object.defineProperty(this, "_clientOptions", {
      value: _clientOptions,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    this._itemId = _itemId;
    this._name = _name;
    this._groupId = _groupId;
    this._boardId = _boardId;
    this._subitems = _subitems;
    this.buildMapping(_cells);
  }

  public get itemId() {
    return this._itemId;
  }
  public get name() {
    return this._name;
  }
  public get groupId() {
    return this._groupId;
  }
  public get boardId() {
    return this._boardId;
  }
  public get cells() {
    if (!this._cells) {
      throw new MonstaaError("access", `Cells is uninitialized.`);
    }
    return this._cells;
  }
  public get values() {
    if (!this._values) {
      throw new MonstaaError("access", `Values is uninitialized.`);
    }
    return this._values;
  }
  public get subitems() {
    if (!this._subitems) {
      throw new MonstaaError("access", `Subitems is uninitialized.`);
    }
    return this._subitems;
  }

  private buildMapping(cells?: Cell[]) {
    if (cells) {
      this._values = {};
      this._cells = {};
      cells.forEach((cell) => {
        this._cells![cell.columnId] = cell;
        this._values![cell.columnId] = cell.value;
      });
    } else {
      this._cells = undefined;
      this._values = undefined;
    }
  }

  public async update(requestOptions: QueryRequestOptions) {
    const updatedItem = await getItem(
      this._clientOptions,
      this,
      requestOptions
    );

    if (!updatedItem) {
      throw new Error("Tried updating deleted item");
    }

    this._itemId = updatedItem.itemId;
    this._name = updatedItem.name;
    this._groupId = updatedItem.groupId;
    this._boardId = updatedItem.boardId;
    this._cells = updatedItem.cells;
    this._subitems = updatedItem.subitems;
    this._values = updatedItem.values;
    return this;
  }
}
