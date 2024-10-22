import { Cell } from "../../classes/Cell";
import { MonstaError } from "../../error";
import {
  GET_CELLS_BY_ITEM_LEVEL_CELL,
  GET_CELLS_BY_ITEM_LEVEL_CELL_ALL,
} from "../strings/getCells";

import { executeGraphQLQuery } from "../../services/mondayService";
import { GetCellsByItemWithCells } from "../types/getCells";
import {
  ClientOptions,
  QueryCellRequestOptions,
  QueryRequestOptions,
  QueryLevel,
  Item_CellQuery,
} from "../../types/types";

async function getCellsByItemLevelCell(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryCellRequestOptions
): Promise<Cell[]> {
  const query = requestOptions.columns
    ? GET_CELLS_BY_ITEM_LEVEL_CELL
    : GET_CELLS_BY_ITEM_LEVEL_CELL_ALL;

  const variables = requestOptions.columns
    ? {
        boardId: item.boardId,
        groupId: item.groupId,
        itemId: item.itemId,
        cellId: requestOptions.columns,
      }
    : {
        boardId: item.boardId,
        groupId: item.groupId,
        itemId: item.itemId,
      };

  const result = await executeGraphQLQuery<GetCellsByItemWithCells>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  if (!result.data.boards[0]) {
    throw new MonstaError("query", `No board found with id: ${item.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaError(
      "query",
      `No group found with id: ${item.groupId}, or group is not associated with board id: ${item.boardId}`
    );
  }

  if (board.groups[0].items_page.items.length === 0) {
    throw new MonstaError(
      "query",
      `No item found with id: ${item.itemId}, or item is not associated with board id: ${item.itemId}`
    );
  }

  return board.groups[0].items_page.items[0].column_values.map(
    (col) => new Cell(col.id, col.text, col.type, JSON.parse(col.value))
  );
}

export async function getCellsByItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Cell }
): Promise<Cell[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Group:
      throw new MonstaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getCellsByItem.`
      );
    case QueryLevel.Item:
      throw new MonstaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getCellsByItem.`
      );
    case QueryLevel.Cell:
      return await getCellsByItemLevelCell(clientOptions, item, requestOptions);
    default:
      throw new MonstaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
