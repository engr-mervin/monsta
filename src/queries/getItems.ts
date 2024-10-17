import { Cell } from "../classes/Cell";
import { Item } from "../classes/Item";
import { MonstaError } from "../error";
import { GET_ITEM_BY_GROUP_LEVEL_CELL, GET_ITEM_BY_GROUP_LEVEL_ITEM } from "../query-strings/getItems";
import { executeGraphQLQuery } from "../services/mondayService";
import { GetItemsByGroup, GetItemsByGroupWithCells } from "../types/mondayTypes";
import {
  Group_RowQuery,
  MondayClientOptions,
  MondayQueryCellRequestOptions,
  MondayQueryNotCellRequestOptions,
  MondayQueryRequestOptions,
  QueryLevel,
} from "../types/types";

async function getItemsByGroupLevelItem(
  clientOptions: MondayClientOptions,
  group: Group_RowQuery,
  requestOptions: MondayQueryNotCellRequestOptions
): Promise<Item[]>{
  const query = GET_ITEM_BY_GROUP_LEVEL_ITEM;

  const variables = {
    id: group.boardId,
    groupId: group.groupId,
  };

  
  const result = await executeGraphQLQuery<GetItemsByGroup>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  if(!result.data.boards[0]){
    throw new MonstaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if(!board.groups[0]){
    throw new MonstaError("query", `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`);
  }

  return board.groups[0].items_page.items.map((item) => new Item(item.id, item.name, group.groupId, Number(group.boardId)))
}

async function getItemsByGroupLevelCell(
  clientOptions: MondayClientOptions,
  group: Group_RowQuery,
  requestOptions: MondayQueryCellRequestOptions
){
  const query = GET_ITEM_BY_GROUP_LEVEL_CELL;

  const variables = {
    id: group.boardId,
    groupId: group.groupId,
  };

  
  const result = await executeGraphQLQuery<GetItemsByGroupWithCells>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  
  if(!result.data.boards[0]){
    throw new MonstaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if(!board.groups[0]){
    throw new MonstaError("query", `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`);
  }

  return board.groups[0].items_page.items.map((item) => {
    const cells: Record<string, Cell> = {};
    const cols = item.column_values.filter((col) => requestOptions.columns.includes(col.id));
    cols.forEach(col => cells[col.id] = new Cell(col.id, col.text, col.type, JSON.parse(col.value)));
    return new Item(item.id, item.name, group.groupId, Number(group.boardId), cells)
  })
}


export async function getItemsByGroup(
  clientOptions: MondayClientOptions,
  group: Group_RowQuery,
  requestOptions: MondayQueryRequestOptions = { queryLevel: QueryLevel.Item }
): Promise<Item[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Group:
      throw new MonstaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getItemsByGroup.`
      );
    case QueryLevel.Item:
      return await getItemsByGroupLevelItem(clientOptions, group, requestOptions);
    case QueryLevel.Cell:
      return await getItemsByGroupLevelCell(clientOptions, group, requestOptions);
    default:
      throw new MonstaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
