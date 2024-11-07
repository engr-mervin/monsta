import { Cell } from "../../classes/Cell";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";

import { executeGraphQLQuery } from "../../services/mondayService";
import {
  ClientOptions,
  QueryCellRequestOptions,
  QueryRequestOptions,
  QueryLevel,
  QueryItemRequestOptions,
  QueryItemSubitemItemRequestOptions,
  QueryItemNoSubitemRequestOptions,
  QueryItemSubitemCellRequestOptions,
  QueryCellNoSubitemRequestOptions,
  QueryCellSubitemCellRequestOptions,
  QueryCellSubitemItemRequestOptions,
  Items_CellQuery,
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

async function getItemsLevelItemNoSubitem(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryItemNoSubitemRequestOptions
): Promise<Item[]> {
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

  return result.data.items.map(
    (item) =>
      new Item(
        clientOptions,
        Number(item.id),
        item.name,
        item.group.id,
        Number(item.board.id)
      )
  );
}

async function getItemsLevelItemSubitemItem(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryItemSubitemItemRequestOptions
): Promise<Item[]> {
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

  return result.data.items.map((item) => {
    const subitems = item.subitems.map(
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
      Number(item.id),
      resultItem.name,
      resultItem.group.id,
      Number(resultItem.board.id),
      undefined,
      subitems
    );
  });
}

async function getItemsLevelItemSubitemCell(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryItemSubitemCellRequestOptions
): Promise<Item[]> {
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

  return result.data.items.map((item) => {
    const subitems = item.subitems.map((subitem) => {
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
      Number(item.id),
      item.name,
      item.group.id,
      Number(item.board.id),
      undefined,
      subitems
    );
  });
}

async function getItemsLevelItem(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryItemRequestOptions
): Promise<Item[]> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getItemsLevelItemNoSubitem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Item:
      return await getItemsLevelItemSubitemItem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getItemsLevelItemSubitemCell(
        clientOptions,
        item,
        requestOptions
      );
    default:
      throw new MonstaaError("query", "Invalid level");
  }
}

async function getItemsLevelCellNoSubitem(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryCellNoSubitemRequestOptions
): Promise<Item[]> {
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

  return result.data.items.map((item) => {
    const cells = item.column_values.map(
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
      Number(item.id),
      item.name,
      item.group.id,
      Number(item.board.id),
      cells
    );
  });
}

async function getItemsLevelCellSubitemItem(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryCellSubitemItemRequestOptions
): Promise<Item[]> {
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

  return result.data.items.map((item) => {
    const cells = item.column_values.map(
      (col) =>
        new Cell(
          col.id,
          col.text,
          col.type,
          JSON.parse(col.value),
          col.column.title
        )
    );

    const subitems = item.subitems.map(
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
      Number(item.id),
      item.name,
      item.group.id,
      Number(item.board.id),
      cells,
      subitems
    );
  });
}

async function getItemsLevelCellSubitemCell(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryCellSubitemCellRequestOptions
): Promise<Item[]> {
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

  return result.data.items.map((item) => {
    const cells = item.column_values.map(
      (col) =>
        new Cell(
          col.id,
          col.text,
          col.type,
          JSON.parse(col.value),
          col.column.title
        )
    );

    const subitems = item.subitems.map((subitem) => {
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
      Number(item.id),
      item.name,
      item.group.id,
      Number(item.board.id),
      cells,
      subitems
    );
  });
}

async function getItemsLevelCell(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryCellRequestOptions
): Promise<Item[]> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getItemsLevelCellNoSubitem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Item:
      return await getItemsLevelCellSubitemItem(
        clientOptions,
        item,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getItemsLevelCellSubitemCell(
        clientOptions,
        item,
        requestOptions
      );
    default:
      throw new MonstaaError("query", "Invalid level");
  }
}

export async function getItems(
  clientOptions: ClientOptions,
  item: Items_CellQuery,
  requestOptions: QueryRequestOptions = {
    queryLevel: QueryLevel.Item,
    subitemLevel: "none",
  }
): Promise<Item[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Board:
    case QueryLevel.Group:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getCellsByItem.`
      );
    case QueryLevel.Item:
      return await getItemsLevelItem(clientOptions, item, requestOptions);
    case QueryLevel.Cell:
      return await getItemsLevelCell(clientOptions, item, requestOptions);
    default:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
