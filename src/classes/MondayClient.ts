import { getGroupsByBoard } from "../queries/getGroups";
import { getItemsByGroup } from "../queries/getItems";
import { Group_RowQuery, MondayClientOptions, MondayQueryRequestOptions, QueryLevel } from "../types/types";

export class MondayClient {
  public readonly clientOptions: MondayClientOptions;

  constructor(_clientOptions: MondayClientOptions) {
    this.clientOptions = _clientOptions;
  }


  public async getGroupsByBoard(
    boardId: string | number,
    requestOptions: MondayQueryRequestOptions = { queryLevel: QueryLevel.Group }
  ){
    return await getGroupsByBoard(this.clientOptions, boardId, requestOptions);
  }


  public async getItemsByGroup(group: Group_RowQuery,
    requestOptions: MondayQueryRequestOptions = { queryLevel: QueryLevel.Item }
  ) {
    return await getItemsByGroup(this.clientOptions, group, requestOptions);
  }
}
