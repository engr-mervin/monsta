import { getBoard } from "../queries/methods/getBoard";
import { getGroup } from "../queries/methods/getGroup";
import { getItem } from "../queries/methods/getItem";
import { getItems } from "../queries/methods/getItems";
import { getUser } from "../queries/methods/getUser";
import { getWorkspace } from "../queries/methods/getWorkspace";
import {
  Group_RowQuery,
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
  Item_CellQuery,
  Items_CellQuery,
  RequestOptions,
} from "../types/types";

export class MondayClient {
  public readonly clientOptions!: ClientOptions;

  constructor(_clientOptions: ClientOptions) {
    Object.defineProperty(this, "clientOptions", {
      value: _clientOptions,
      enumerable: false,
      writable: true,
      configurable: true,
    });
  }

  /** Methods to progressively populate the board object */
  /** You should use this if you need the whole board / groups / items, if you know you'll only need specific entities, then use specific query */
  public async getWorkspace(
    workspaceId: string | number,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Board }
  ) {
    return await getWorkspace(this.clientOptions, workspaceId, requestOptions);
  }

  public async getBoard(
    boardId: string | number,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Board }
  ) {
    return await getBoard(this.clientOptions, boardId, requestOptions);
  }
  public async getGroup(
    group: Group_RowQuery,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
  ) {
    return await getGroup(this.clientOptions, group, requestOptions);
  }

  public async getItem(
    item: Item_CellQuery,
    requestOptions: QueryRequestOptions = {
      queryLevel: QueryLevel.Item,
      subitemLevel: "none",
    }
  ) {
    return await getItem(this.clientOptions, item, requestOptions);
  }

  public async getItems(
    items: Items_CellQuery,
    requestOptions: QueryRequestOptions = {
      queryLevel: QueryLevel.Item,
      subitemLevel: "none",
    }
  ) {
    return await getItems(this.clientOptions, items, requestOptions);
  }


  public async getUser(
    userId: string | number,
    requestOptions: RequestOptions = {}
  ){
    return await getUser(this.clientOptions, userId, requestOptions);
  }

  // public async getSubitemsByItem(
  //   item: Item_SubitemQuery,
  //   requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Item }
  // ) {
  //   return await getSubitemsByItem(this.clientOptions, item, requestOptions);
  // }
}
