import { MonstaaError } from "../error";
import { getItem } from "../queries/methods/getItem";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Cell, CellValue, JSONCell } from "./Cell";

export interface JSONItem {
  _clientOptions: ClientOptions;
  _itemId: number;
  _name: string;
  _groupId: string;
  _boardId: number;
  _values: Record<string, CellValue> | undefined;
  _cells?: Record<string, JSONCell>;
  _subitems?: JSONItem[];
  _rawCells?: JSONCell[];
}

export class Item {
  private readonly _clientOptions!: ClientOptions;
  private _itemId: number;
  private _name: string;
  private _groupId: string;
  private _boardId: number;
  private _values: Record<string, CellValue> | undefined = undefined;
  private _cells?: Record<string, Cell>;
  private _subitems?: Item[];
  private _rawCells?: Cell[];

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
    this._rawCells = _cells;
    this.buildMapping(_cells);
  }

  public static fromJSON(
    clientOptions: ClientOptions,
    jsonItem: JSONItem
  ): Item {
    return new Item(
      clientOptions,
      jsonItem._itemId,
      jsonItem._name,
      jsonItem._groupId,
      jsonItem._boardId,
      jsonItem._rawCells?.map(Cell.fromJSON),
      jsonItem._subitems?.map((_item) => Item.fromJSON(clientOptions, _item))
    );
  }

  public get rawCells() {
    return this._rawCells;
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
