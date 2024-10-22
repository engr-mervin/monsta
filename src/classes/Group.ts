import { Item } from "./Item";

export class Group {
  public readonly groupId: string;
  public readonly title: string;
  public readonly boardId: number;
  public readonly items?: Item[];

  constructor(
    _groupId: string,
    _title: string,
    _boardId: number,
    _items?: Item[]
  ) {
    this.groupId = _groupId;
    this.title = _title;
    this.boardId = _boardId;

    if (_items) {
      this.items = _items;
    }
  }

  public getItemByCellValue(cellValue: string){

  }
}
