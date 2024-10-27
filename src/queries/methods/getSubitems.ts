import { Cell } from "../../classes/Cell";
import { MonstaaError } from "../../error";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  ClientOptions,
  QueryCellRequestOptions,
  QueryNotCellRequestOptions,
  QueryRequestOptions,
  QueryLevel,
  Item_SubitemQuery,
} from "../../types/types";
import { GET_SUBITEMS_BY_ITEM_LEVEL_CELL, GET_SUBITEMS_BY_ITEM_LEVEL_CELL_ALL, GET_SUBITEMS_BY_ITEM_LEVEL_SUBITEM } from "../strings/getSubitems";
import { GetSubitemsByItem, GetSubitemsByItemWithCells } from "../types/getSubitems";
import { Subitem } from "../../classes/Subitem";

async function getSubitemsByItemLevelSubitem(
  clientOptions: ClientOptions,
  item: Item_SubitemQuery,
  requestOptions: QueryNotCellRequestOptions
): Promise<Subitem[]> {
  const query = GET_SUBITEMS_BY_ITEM_LEVEL_SUBITEM;

  const variables = {
    itemId: item.itemId,
  };

  const result = await executeGraphQLQuery<GetSubitemsByItem>(clientOptions, requestOptions, query, variables);

  if (!result.data.items[0]) {
    throw new MonstaaError("query", `No item found with id: ${item.itemId}`);
  }
  const groupId = result.data.items[0].group.id;
  const boardId = result.data.items[0].board.id;

  return result.data.items[0].subitems.map((item) => new Subitem(clientOptions, item.id, item.name, groupId, Number(boardId)));
}

async function getSubitemsByItemLevelCell(clientOptions: ClientOptions, item: Item_SubitemQuery, requestOptions: QueryCellRequestOptions) {
  const query = requestOptions.columns ? GET_SUBITEMS_BY_ITEM_LEVEL_CELL : GET_SUBITEMS_BY_ITEM_LEVEL_CELL_ALL;

  const variables = requestOptions.columns
    ? {
        itemId: item.itemId,
        cellId: requestOptions.columns,
      }
    : {
        item: item.itemId,
      };

  const result = await executeGraphQLQuery<GetSubitemsByItemWithCells>(clientOptions, requestOptions, query, variables);

  if (!result.data.items[0]) {
    throw new MonstaaError("query", `No item found with id: ${item.itemId}`);
  }

  const groupId = result.data.items[0].group.id;
  const boardId = result.data.items[0].board.id;

  return result.data.items[0].subitems.map((item) => {
    const cells: Cell[] = item.column_values.map((col) => new Cell(col.id, col.text, col.type, JSON.parse(col.value), col.column.title));
    return new Subitem(clientOptions, item.id, item.name, groupId, Number(boardId), cells);
  });
}

export async function getSubitemsByItem(
  clientOptions: ClientOptions,
  item: Item_SubitemQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Item }
): Promise<Subitem[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Board:
    case QueryLevel.Group:
      throw new MonstaaError("query", `Query level chosen: ${queryLevel} is not applicable to the calling function: getSubitemsByItem.`);
    case QueryLevel.Item:
      return await getSubitemsByItemLevelSubitem(clientOptions, item, requestOptions);
    case QueryLevel.Cell:
      return await getSubitemsByItemLevelCell(clientOptions, item, requestOptions);
    default:
      throw new MonstaaError("query", `Query level chosen: ${queryLevel} is unknown.`);
  }
}
