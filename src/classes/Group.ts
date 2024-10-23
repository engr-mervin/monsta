import { getItemsByGroup } from "../queries/methods/getItems";
import { __DEV__ } from "../setup";
import { ClientOptions } from "../types/types";
import { Item } from "./Item";

export class Group {
  public readonly groupId: string;
  public readonly title: string;
  public readonly boardId: number;
  private items?: Item[];
  private readonly clientOptions: ClientOptions;

  constructor(
    _clientOptions: ClientOptions,
    _groupId: string,
    _title: string,
    _boardId: number,
    _items?: Item[] | undefined
  ) {
    this.clientOptions = _clientOptions;
    this.groupId = _groupId;
    this.title = _title;
    this.boardId = _boardId;

    if (_items) {
      this.items = _items;
    }
  }

  public getItemByCellValue(columnId: string, cellValue: string | number) {
    if (this.items) {
      this.items!.find((item) => item.findCell((cell) => cell.columnId === columnId && cell.text === cellValue));
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item list.`
      );
    }
  }

  public async updateItems(recursive: boolean = true) {
    this.items = await getItemsByGroup(this.clientOptions, this);
    if (recursive) {
      await Promise.all(this.items.map(item => item.updateCells()));
    }
  }
}
