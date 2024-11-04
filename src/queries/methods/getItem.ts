import { Cell } from "../../classes/Cell";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";

import { executeGraphQLQuery } from "../../services/mondayService";
import {
  ClientOptions,
  QueryCellRequestOptions,
  QueryRequestOptions,
  QueryLevel,
  Item_CellQuery,
  QueryNotCellRequestOptions,
} from "../../types/types";
import {
  GET_ITEM_LEVEL_CELL,
  GET_ITEM_LEVEL_CELL_ALL,
  GET_ITEM_LEVEL_ITEM,
} from "../strings/getItem";
import {
  GET_ITEM_LEVEL_CELLS_TYPE,
  GET_ITEM_LEVEL_ITEM_TYPE,
} from "../types/getItem";

async function getItemLevelItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryNotCellRequestOptions
): Promise<Item> {
  const query = GET_ITEM_LEVEL_ITEM;

  const variables = {
    itemId: item.itemId,
  };

  const result = await executeGraphQLQuery<GET_ITEM_LEVEL_ITEM_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const resultItem = result.data.items[0];

  return new Item(
    clientOptions,
    Number(item.itemId),
    resultItem.name,
    resultItem.group.id,
    Number(resultItem.board.id)
  );
}

async function getItemLevelCell(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryCellRequestOptions
): Promise<Item> {
  const query = requestOptions.columns
    ? GET_ITEM_LEVEL_CELL
    : GET_ITEM_LEVEL_CELL_ALL;

  const variables = requestOptions.columns
    ? {
        itemId: item.itemId,
        cellId: requestOptions.columns,
      }
    : {
        itemId: item.itemId,
      };

  const result = await executeGraphQLQuery<GET_ITEM_LEVEL_CELLS_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const resultItem = result.data.items[0];
  if (!resultItem) {
    throw new MonstaaError(
      "query",
      `Item with item id: ${item.itemId} not found or you lack the necessary privileges to access this item.`
    );
  }

  const cells = resultItem.column_values.map(
    (col) =>
      new Cell(
        col.id,
        col.text,
        col.type,
        JSON.parse(col.value),
        col.column.title
      )
  );

  return new Item(
    clientOptions,
    Number(item.itemId),
    resultItem.name,
    resultItem.group.id,
    Number(resultItem.board.id),
    cells
  );
}

export async function getItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Cell }
): Promise<Item> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Board:
    case QueryLevel.Group:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getCellsByItem.`
      );
    case QueryLevel.Item:
      return await getItemLevelItem(clientOptions, item, requestOptions);
    case QueryLevel.Cell:
      return await getItemLevelCell(clientOptions, item, requestOptions);
    default:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
