import { getItem } from "../queries/methods/getItem";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Cell } from "./Cell";
import { Subitem } from "./Subitem";

export class Item {
  private readonly _clientOptions: ClientOptions;
  private _itemId: number;
  private _name: string;
  private _groupId: string;
  private _boardId: number;
  private _cellMapping: Record<string, Cell> | undefined = undefined;
  private _cells?: Cell[];
  private _subitems?: Subitem[];

  constructor(
    _clientOptions: ClientOptions,
    _itemId: number,
    _name: string,
    _groupId: string,
    _boardId: number,
    _cells?: Cell[]
  ) {
    this._clientOptions = _clientOptions;
    this._itemId = _itemId;
    this._name = _name;
    this._groupId = _groupId;
    this._boardId = _boardId;
    this._cells = _cells;
    this.buildMapping();
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
  public get cellMapping() {
    return this._cellMapping;
  }
  public get subitems() {
    return this._subitems;
  }

  private buildMapping() {
    if (this._cells) {
      this._cellMapping = {};
      this._cells.forEach((cell) => (this._cellMapping![cell.columnId] = cell));
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
