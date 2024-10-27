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
        itemId: item.itemId,
        cellId: requestOptions.columns,
      }
    : {
        itemId: item.itemId,
      };

  const result = await executeGraphQLQuery<GetCellsByItemWithCells>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  return result.data.items[0].column_values.map(
    (col) => new Cell(col.id, col.text, col.type, JSON.parse(col.value), col.column.title)
  );
}

export async function getCellsByItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Cell }
): Promise<Cell[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Board:
    case QueryLevel.Group:
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
