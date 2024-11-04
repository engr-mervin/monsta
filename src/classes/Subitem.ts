import { getCellsByItem } from "../queries/methods/getItem";
import { __DEV__ } from "../setup";
import { ClientOptions } from "../types/types";
import { Cell } from "./Cell";

export class Subitem {
  private readonly clientOptions: ClientOptions;
  public readonly itemId: string;
  public readonly name: string;
  public readonly groupId: string;
  public readonly boardId: number;
  private cellMapping: Record<string, Cell> | undefined = undefined;
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
    if (_cells) {
      this.cells = _cells;
      this.buildMapping();
    }
  }

  private buildMapping() {
    if (this.cells) {
      this.cellMapping = {};
      this.cells.forEach((cell) => (this.cellMapping![cell.columnId] = cell));
    }
  }
  public getCell(columnId: string): Cell | undefined {
    if (this.cellMapping) {
      return this.cellMapping[columnId];
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item cells.`
      );
    }
  }

  public findCell(predicate: (cell: Cell) => boolean): Cell | undefined{
    if (this.cells) {
      return this.cells.find(predicate);
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item cells.`
      );
    }
  }

  public getCellByValue(value: string | number): Cell | undefined {
    if (this.cells) {
      return this.cells.find((cell) => cell.text === value);
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item cells.`
      );
    }
  }

  public async updateCells() {
    this.cells = await getCellsByItem(this.clientOptions, this);
    this.buildMapping();
  }
}
