import { getCellsByItem } from "../queries/methods/getCells";
import { ClientOptions } from "../types/types";
import { Cell } from "./Cell";

export class Item {
  private readonly clientOptions: ClientOptions;
  public readonly itemId: string;
  public readonly name: string;
  public readonly groupId: string;
  public readonly boardId: number;
  private cellMapping: Record<string, Cell> = {};
  private cellsLoaded: boolean;
  private cells?: Cell[];

  constructor(
    _clientOptions: ClientOptions,
    _itemId: string,
    _name: string,
    _groupId: string,
    _boardId: number,
    _cells?: Cell[]
  ) {
    this.clientOptions = _clientOptions;
    this.itemId = _itemId;
    this.name = _name;
    this.groupId = _groupId;
    this.boardId = _boardId;
    if(_cells){
        this.cells = _cells;
        this.buildMapping();
        this.cellsLoaded = true;
    } else {
      this.cellsLoaded = false;
    }
  }

  private buildMapping(){
    if(this.cells){
      this.cellMapping = {};
      this.cells.forEach((cell) =>  this.cellMapping[cell.columnId] = cell);
    }
  }
  public getCell(id: string): Cell | undefined {
    return this.cellMapping[id];
  }

  public async updateCells() {
    this.cells = await getCellsByItem(this.clientOptions, this);
    this.buildMapping();
    this.cellsLoaded = true;
  }
}
