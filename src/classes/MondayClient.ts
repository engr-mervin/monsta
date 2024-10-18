import { getGroupsByBoard } from "../queries/getGroups";
import { getItemsByGroup } from "../queries/getItems";
import { Group_RowQuery, ClientOptions, QueryRequestOptions, QueryLevel } from "../types/types";

export class MondayClient {
  public readonly clientOptions: ClientOptions;

  constructor(_clientOptions: ClientOptions) {
    this.clientOptions = _clientOptions;
  }


  public async getGroupsByBoard(
    boardId: (string | number)[],
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
  ){
    return await getGroupsByBoard(this.clientOptions, boardId, requestOptions);
  }


  public async getItemsByGroup(group: Group_RowQuery,
    requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Item }
  ) {
    return await getItemsByGroup(this.clientOptions, group, requestOptions);
  }
}
