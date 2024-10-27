import { getCellsByItem } from "../queries/methods/getCells";
import { getSubitemsByItem } from "../queries/methods/getSubitems";
import { __DEV__ } from "../setup";
import { ClientOptions } from "../types/types";
import { Cell } from "./Cell";
import { Subitem } from "./Subitem";

export class Item {
  private readonly clientOptions: ClientOptions;
  public readonly itemId: string;
  public readonly name: string;
  public readonly groupId: string;
  public readonly boardId: number;
  private cellMapping: Record<string, Cell> | undefined = undefined;
  private cells?: Cell[];
  private subitems?: Subitem[];

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
  public getCell(id: string): Cell | undefined {
    if (this.cellMapping) {
      return this.cellMapping[id];
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item cells.`
      );
    }
  }

  public findCell(predicate: (cell: Cell) => boolean): Cell | undefined {
    if (this.cells) {
      return this.cells.find(predicate);
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item cells.`
      );
    }
  }

  public getCellByValue(value: string | number | boolean | null): Cell | undefined {
    if (this.cells) {
      return this.cells.find((cell) => cell.getValue() === value);
    } else if (__DEV__) {
      console.warn(
        `Trying to get cell value from an uninitialized item cells.`
      );
    }
  }

  public getSubitemByValue(value: string, columnId?: string) {
    if (this.subitems) {
      return this.subitems.find((subitem) =>
        subitem.findCell((cell) => (cell.text === value) && (columnId === undefined ? true : cell.columnId === columnId)) 
      );
    } else if (__DEV__) {
      console.warn(
        `Trying to get subitem from an uninitialized subitem list.`
      );
    }
  }

  public async updateCells() {
    this.cells = await getCellsByItem(this.clientOptions, this);
    this.buildMapping();
  }

  public async updateSubitems() {
    this.subitems = await getSubitemsByItem(this.clientOptions, this);
  }
}