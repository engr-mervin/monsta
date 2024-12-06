import { MonstaaError } from "../error";
import { getGroup } from "../queries/methods/getGroup";
import { ClientOptions, QueryRequestOptions } from "../types/types";
import { Item } from "./Item";

export class Group {
  private _groupId: string;
  private _title: string;
  private _boardId: number;
  private _items?: Item[];
  private readonly _clientOptions!: ClientOptions;

  constructor(
    _clientOptions: ClientOptions,
    _groupId: string,
    _title: string,
    _boardId: number,
    _items?: Item[]
  ) {
    Object.defineProperty(this, "_clientOptions", {
      value: _clientOptions,
      enumerable: false,
      writable: true,
      configurable: true,
    });
    this._groupId = _groupId;
    this._title = _title;
    this._boardId = _boardId;
    this._items = _items;
  }

  public get groupId() {
    return this._groupId;
  }

  public get title() {
    return this._title;
  }

  public get boardId() {
    return this._boardId;
  }

  public get items() {
    if (!this._items) {
      throw new MonstaaError("access", `Items is uninitialized.`);
    }
    return this._items;
  }

  public async update(requestOptions: QueryRequestOptions) {
    const updatedGroup = await getGroup(
      this._clientOptions,
      this,
      requestOptions
    );

    if (!updatedGroup) {
      throw new Error("Tried updating deleted group");
    }
    this._title = updatedGroup.title;
    this._items = updatedGroup.items;
    return this;
  }
}
