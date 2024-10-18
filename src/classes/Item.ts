import { Cell } from "./Cell";

export class Item {
  public readonly itemId: string;
  public readonly name: string;
  public readonly groupId: string;
  public readonly boardId: number;
  public readonly cells?: Cell[];
  private readonly cellMapping: Record<string, Cell>;

  constructor(
    _itemId: string,
    _name: string,
    _groupId: string,
    _boardId: number,
    _cells?: Cell[]
  ) {
    this.itemId = _itemId;
    this.name = _name;
    this.groupId = _groupId;
    this.boardId = _boardId;
    if(_cells){
        this.cells = _cells;
        const _cellMapping: Record<string, Cell> = {};
        _cells.forEach((cell) =>  _cellMapping[cell.columnId] = cell);
        this.cellMapping = _cellMapping;
    } else {
      this.cellMapping = {};
    }
  }


  getCell(id: string): Cell | undefined {
    return this.cellMapping[id];
  }
}
