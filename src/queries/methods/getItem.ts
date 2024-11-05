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
  QueryItemRequestOptions,
  QueryItemSubitemItemRequestOptions,
  QueryItemNoSubitemRequestOptions,
  QueryItemSubitemCellRequestOptions,
  QueryCellNoSubitemRequestOptions,
  QueryCellSubitemCellRequestOptions,
  QueryCellSubitemItemRequestOptions,
} from "../../types/types";
import {
  GET_ITEM_LEVEL_CELL_ALL_NO_SUBITEM,
  GET_ITEM_LEVEL_CELL_ALL_SUBITEM_CELL,
  GET_ITEM_LEVEL_CELL_ALL_SUBITEM_CELL_ALL,
  GET_ITEM_LEVEL_CELL_ALL_SUBITEM_ITEM,
  GET_ITEM_LEVEL_CELL_NO_SUBITEM,
  GET_ITEM_LEVEL_CELL_SUBITEM_CELL,
  GET_ITEM_LEVEL_CELL_SUBITEM_CELL_ALL,
  GET_ITEM_LEVEL_CELL_SUBITEM_ITEM,
  GET_ITEM_LEVEL_ITEM_NO_SUBITEM,
  GET_ITEM_LEVEL_ITEM_SUBITEM_CELL,
  GET_ITEM_LEVEL_ITEM_SUBITEM_CELL_ALL,
  GET_ITEM_LEVEL_ITEM_SUBITEM_ITEM,
} from "../strings/getItem";
import {
  GET_ITEM_LEVEL_CELL_NO_SUBITEM_TYPE,
  GET_ITEM_LEVEL_CELL_SUBITEM_CELL_TYPE,
  GET_ITEM_LEVEL_CELL_SUBITEM_ITEM_TYPE,
  GET_ITEM_LEVEL_ITEM_NO_SUBITEM_TYPE,
  GET_ITEM_LEVEL_ITEM_SUBITEM_CELL_TYPE,
  GET_ITEM_LEVEL_ITEM_SUBITEM_ITEM_TYPE,
} from "../types/getItem";

async function getItemLevelItemNoSubitem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryItemNoSubitemRequestOptions
): Promise<Item> {
  const query = GET_ITEM_LEVEL_ITEM_NO_SUBITEM;

  const variables = {
    itemId: item.itemId,
  };

  const result = await executeGraphQLQuery<GET_ITEM_LEVEL_ITEM_NO_SUBITEM_TYPE>(
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

async function getItemLevelItemSubitemItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryItemSubitemItemRequestOptions
): Promise<Item> {
  const query = GET_ITEM_LEVEL_ITEM_SUBITEM_ITEM;

  const variables = {
    itemId: item.itemId,
  };

  const result =
    await executeGraphQLQuery<GET_ITEM_LEVEL_ITEM_SUBITEM_ITEM_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  const resultItem = result.data.items[0];
  const subitems = resultItem.subitems.map(
    (subitem) =>
      new Item(
        clientOptions,
        Number(subitem.id),
        subitem.name,
        subitem.group.id,
        Number(subitem.board.id)
      )
  );
  return new Item(
    clientOptions,
    Number(item.itemId),
    resultItem.name,
    resultItem.group.id,
    Number(resultItem.board.id),
    undefined,
    subitems
  );
}
async function getItemLevelItemSubitemCell(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryItemSubitemCellRequestOptions
): Promise<Item> {
  const query = requestOptions.subitemColumns
    ? GET_ITEM_LEVEL_ITEM_SUBITEM_CELL
    : GET_ITEM_LEVEL_ITEM_SUBITEM_CELL_ALL;

  const variables = {
    itemId: item.itemId,
  };

  const result =
    await executeGraphQLQuery<GET_ITEM_LEVEL_ITEM_SUBITEM_CELL_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  const resultItem = result.data.items[0];
  const subitems = resultItem.subitems.map((subitem) => {
    const cells = subitem.column_values.map(
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
      Number(subitem.id),
      subitem.name,
      subitem.group.id,
      Number(subitem.board.id),
      cells
    );
  });
  return new Item(
    clientOptions,
    Number(item.itemId),
    resultItem.name,
    resultItem.group.id,
    Number(resultItem.board.id),
    undefined,
    subitems
  );
}

async function getItemLevelItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryItemRequestOptions
): Promise<Item> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getItemLevelItemNoSubitem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Item:
      return await getItemLevelItemSubitemItem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getItemLevelItemSubitemCell(
        clientOptions,
        item,
        requestOptions
      );
    default:
      throw new MonstaaError("query", "Invalid level");
  }
}

async function getItemLevelCellNoSubitem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryCellNoSubitemRequestOptions
): Promise<Item> {
  const query = requestOptions.columns
    ? GET_ITEM_LEVEL_CELL_NO_SUBITEM
    : GET_ITEM_LEVEL_CELL_ALL_NO_SUBITEM;

  const variables = requestOptions.columns
    ? {
        itemId: item.itemId,
        cellId: requestOptions.columns,
      }
    : {
        itemId: item.itemId,
      };

  const result = await executeGraphQLQuery<GET_ITEM_LEVEL_CELL_NO_SUBITEM_TYPE>(
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

async function getItemLevelCellSubitemItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryCellSubitemItemRequestOptions
): Promise<Item> {
  const query = requestOptions.columns
    ? GET_ITEM_LEVEL_CELL_SUBITEM_ITEM
    : GET_ITEM_LEVEL_CELL_ALL_SUBITEM_ITEM;

  const variables = requestOptions.columns
    ? {
        itemId: item.itemId,
        cellId: requestOptions.columns,
      }
    : {
        itemId: item.itemId,
      };

  const result =
    await executeGraphQLQuery<GET_ITEM_LEVEL_CELL_SUBITEM_ITEM_TYPE>(
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

  const subitems = resultItem.subitems.map(
    (subitem) =>
      new Item(
        clientOptions,
        Number(subitem.id),
        subitem.name,
        subitem.group.id,
        Number(subitem.board.id)
      )
  );

  return new Item(
    clientOptions,
    Number(item.itemId),
    resultItem.name,
    resultItem.group.id,
    Number(resultItem.board.id),
    cells,
    subitems
  );
}

async function getItemLevelCellSubitemCell(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryCellSubitemCellRequestOptions
): Promise<Item> {
  const query = requestOptions.columns
    ? requestOptions.subitemColumns
      ? GET_ITEM_LEVEL_CELL_SUBITEM_CELL
      : GET_ITEM_LEVEL_CELL_SUBITEM_CELL_ALL
    : requestOptions.subitemColumns
    ? GET_ITEM_LEVEL_CELL_ALL_SUBITEM_CELL
    : GET_ITEM_LEVEL_CELL_ALL_SUBITEM_CELL_ALL;

  const variables = requestOptions.columns
    ? requestOptions.subitemColumns
      ? {
          itemId: item.itemId,
          cellId: requestOptions.columns,
          subitemCellId: requestOptions.subitemColumns,
        }
      : {
          itemId: item.itemId,
          cellId: requestOptions.columns,
        }
    : requestOptions.subitemColumns
    ? {
        itemId: item.itemId,
        subitemCellId: requestOptions.subitemColumns,
      }
    : {
        itemId: item.itemId,
      };

  const result =
    await executeGraphQLQuery<GET_ITEM_LEVEL_CELL_SUBITEM_CELL_TYPE>(
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

  const subitems = resultItem.subitems.map((subitem) => {
    const cells = subitem.column_values.map(
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
      Number(subitem.id),
      subitem.name,
      subitem.group.id,
      Number(subitem.board.id),
      cells
    );
  });

  return new Item(
    clientOptions,
    Number(item.itemId),
    resultItem.name,
    resultItem.group.id,
    Number(resultItem.board.id),
    cells,
    subitems
  );
}

async function getItemLevelCell(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryCellRequestOptions
): Promise<Item> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getItemLevelCellNoSubitem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Item:
      return await getItemLevelCellSubitemItem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getItemLevelCellSubitemCell(
        clientOptions,
        item,
        requestOptions
      );
    default:
      throw new MonstaaError("query", "Invalid level");
  }
}

export async function getItem(
  clientOptions: ClientOptions,
  item: Item_CellQuery,
  requestOptions: QueryRequestOptions = {
    queryLevel: QueryLevel.Item,
    subitemLevel: "none",
  }
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
