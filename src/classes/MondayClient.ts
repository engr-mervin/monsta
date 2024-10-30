import { getBoardsByWorkspace } from "../queries/methods/getBoards";
import { getCellsByItem } from "../queries/methods/getCells";
import { getGroupsByBoard } from "../queries/methods/getGroups";
import { getItemsByGroup } from "../queries/methods/getItems";
import { getSubitemsByItem } from "../queries/methods/getSubitems";
import {
  Group_RowQuery,
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
  Item_CellQuery,
  Item_SubitemQuery,
} from "../types/types";

export class MondayClient {
  public readonly clientOptions: ClientOptions;

  constructor(_clientOptions: ClientOptions) {
    this.clientOptions = _clientOptions;
  }

  /** Methods to progressively populate the board object */
  /** You should use this if you need the whole board / groups / items, if you know you'll only need specific entities, then use specific query */
  public async getBoardsByWorkspace(
    workspaceId: string | number,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Board }
  ) {
    return await getBoardsByWorkspace(
      this.clientOptions,
      workspaceId,
      requestOptions
    );
  }

  public async getGroupsByBoard(
    boardId: string | number,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
  ) {
    return await getGroupsByBoard(this.clientOptions, boardId, requestOptions);
  }
  public async getItemsByGroup(
    group: Group_RowQuery,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Item }
  ) {
    return await getItemsByGroup(this.clientOptions, group, requestOptions);
  }

  public async getCellsByItem(
    item: Item_CellQuery,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Cell }
  ) {
    return await getCellsByItem(this.clientOptions, item, requestOptions);
  }

  public async getSubitemsByItem(
    item: Item_SubitemQuery,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Item }
  ) {
    return await getSubitemsByItem(this.clientOptions, item, requestOptions);
  }

  /**Methods for finding specific items */
}
