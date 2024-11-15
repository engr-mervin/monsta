import { getItem } from "../queries/methods/getItem";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Cell, CellValue } from "./Cell";

export class Item {
  private readonly _clientOptions!: ClientOptions;
  private _itemId: number;
  private _name: string;
  private _groupId: string;
  private _boardId: number;
  private _values: Record<string, CellValue> | undefined = undefined;
  private _cells?: Cell[];
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
    this._cells = _cells;
    this._subitems = _subitems;
    this.buildMapping();
  }

  public isSubitem() {
    return this._groupId === "topics";
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
    return this._cells;
  }
  public get values() {
    return this._values;
  }
  public get subitems() {
    return this._subitems;
  }

  private buildMapping() {
    if (this._cells) {
      this._values = {};
      this._cells.forEach((cell) => (this._values![cell.columnId] = cell.value));
    }
  }

  public async update(requestOptions: QueryRequestOptions) {
    const updatedItem = await getItem(
      this._clientOptions,
      this,
      requestOptions
    );

    this._itemId = updatedItem.itemId;
    this._name = updatedItem.name;
    this._groupId = updatedItem.groupId;
    this._boardId = updatedItem.boardId;
    this._cells = updatedItem.cells;
    this._subitems = updatedItem.subitems;
    this.buildMapping();
    return this;
  }
}
