import { Cell } from "../../classes/Cell";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import {
  GET_GROUP_LEVEL_CELL_ALL_NO_SUBITEM,
  GET_GROUP_LEVEL_CELL_ALL_SUBITEM_CELL,
  GET_GROUP_LEVEL_CELL_ALL_SUBITEM_CELL_ALL,
  GET_GROUP_LEVEL_CELL_ALL_SUBITEM_ITEM,
  GET_GROUP_LEVEL_CELL_NO_SUBITEM,
  GET_GROUP_LEVEL_CELL_SUBITEM_CELL,
  GET_GROUP_LEVEL_CELL_SUBITEM_CELL_ALL,
  GET_GROUP_LEVEL_CELL_SUBITEM_ITEM,
  GET_GROUP_LEVEL_GROUP,
  GET_GROUP_LEVEL_ITEM_NO_SUBITEM,
  GET_GROUP_LEVEL_ITEM_SUBITEM_CELL,
  GET_GROUP_LEVEL_ITEM_SUBITEM_CELL_ALL,
  GET_GROUP_LEVEL_ITEM_SUBITEM_ITEM,
} from "../strings/getGroup";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  Group_RowQuery,
  ClientOptions,
  QueryCellRequestOptions,
  QueryRequestOptions,
  QueryLevel,
  QueryItemRequestOptions,
  QueryGroupRequestOptions,
  QueryItemNoSubitemRequestOptions,
  QueryItemSubitemItemRequestOptions,
  QueryItemSubitemCellRequestOptions,
  QueryCellNoSubitemRequestOptions,
  QueryCellSubitemItemRequestOptions,
  QueryCellSubitemCellRequestOptions,
} from "../../types/types";
import { Group } from "../../classes/Group";
import {
  GET_GROUP_LEVEL_CELL_NO_SUBITEM_TYPE,
  GET_GROUP_LEVEL_CELL_SUBITEM_CELL_TYPE,
  GET_GROUP_LEVEL_CELL_SUBITEM_ITEM_TYPE,
  GET_GROUP_LEVEL_GROUP_TYPE,
  GET_GROUP_LEVEL_ITEM_NO_SUBITEM_TYPE,
  GET_GROUP_LEVEL_ITEM_SUBITEM_CELL_TYPE,
  GET_GROUP_LEVEL_ITEM_SUBITEM_ITEM_TYPE,
} from "../types/getGroup";
import { getItems } from "./getItems";
import { __DEV__ } from "../../setup";

async function getGroupLevelGroup(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryGroupRequestOptions
): Promise<Group> {
  const query = GET_GROUP_LEVEL_GROUP;

  const variables = {
    boardId: group.boardId,
    groupId: group.groupId,
  };

  const result = await executeGraphQLQuery<GET_GROUP_LEVEL_GROUP_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId)
  );
}
async function getGroupLevelItemNoSubitem(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryItemNoSubitemRequestOptions
): Promise<Group> {
  const query = GET_GROUP_LEVEL_ITEM_NO_SUBITEM;

  const variables = {
    boardId: group.boardId,
    groupId: group.groupId,
  };

  const result =
    await executeGraphQLQuery<GET_GROUP_LEVEL_ITEM_NO_SUBITEM_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];
  const items = resultGroup.items_page.items.map(
    (item) =>
      new Item(
        clientOptions,
        Number(item.id),
        item.name,
        group.groupId,
        Number(group.boardId)
      )
  );

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    items
  );
}
async function getGroupLevelItemSubitemItem(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryItemSubitemItemRequestOptions
): Promise<Group> {
  const query = GET_GROUP_LEVEL_ITEM_SUBITEM_ITEM;

  const variables = {
    boardId: group.boardId,
    groupId: group.groupId,
  };

  const result =
    await executeGraphQLQuery<GET_GROUP_LEVEL_ITEM_SUBITEM_ITEM_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];
  const items = resultGroup.items_page.items.map((item) => {
    const subitems: Item[] = item.subitems.map(
      (subitem) =>
        new Item(
          clientOptions,
          Number(subitem.id),
          subitem.name,
          subitem.group.id,
          Number(subitem.group.id)
        )
    );
    return new Item(
      clientOptions,
      Number(item.id),
      item.name,
      group.groupId,
      Number(group.boardId),
      undefined,
      subitems
    );
  });

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    items
  );
}
async function getGroupLevelItemSubitemCell(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryItemSubitemCellRequestOptions
): Promise<Group> {
  const query = requestOptions.subitemColumns
    ? GET_GROUP_LEVEL_ITEM_SUBITEM_CELL
    : GET_GROUP_LEVEL_ITEM_SUBITEM_CELL_ALL;

  const variables = requestOptions.subitemColumns
    ? {
        boardId: group.boardId,
        groupId: group.groupId,
        subitemCellId: requestOptions.subitemColumns,
      }
    : {
        boardId: group.boardId,
        groupId: group.groupId,
      };

  const result =
    await executeGraphQLQuery<GET_GROUP_LEVEL_ITEM_SUBITEM_CELL_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];

  const allSubitemIds: number[] = [];
  resultGroup.items_page.items.forEach((item) =>
    item.subitems.forEach((subitem) => allSubitemIds.push(Number(subitem.id)))
  );

  const subitemDetails = await getItems(
    clientOptions,
    { itemId: allSubitemIds },
    { queryLevel: QueryLevel.Cell, subitemLevel: "none" }
  );

  const subitemMapping: Record<number, Cell[] | undefined> = {};

  subitemDetails.forEach(
    (subitem) => (subitemMapping[subitem.itemId] = subitem.cells)
  );

  const items = resultGroup.items_page.items.map((item) => {
    const subitems: Item[] = item.subitems.map((subitem) => {
      allSubitemIds.push(Number(subitem.id));
      return new Item(
        clientOptions,
        Number(subitem.id),
        subitem.name,
        subitem.group.id,
        Number(subitem.group.id),
        subitemMapping[Number(subitem.id)]
      );
    });

    return new Item(
      clientOptions,
      Number(item.id),
      item.name,
      group.groupId,
      Number(group.boardId),
      undefined,
      subitems
    );
  });

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    items
  );
}

async function getGroupLevelItem(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryItemRequestOptions
): Promise<Group> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getGroupLevelItemNoSubitem(
        clientOptions,
        group,
        requestOptions
      );
    case QueryLevel.Item:
      return await getGroupLevelItemSubitemItem(
        clientOptions,
        group,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getGroupLevelItemSubitemCell(
        clientOptions,
        group,
        requestOptions
      );
  }
}

async function getGroupLevelCellNoSubitem(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryCellNoSubitemRequestOptions
): Promise<Group> {
  const query = requestOptions.columns
    ? GET_GROUP_LEVEL_CELL_NO_SUBITEM
    : GET_GROUP_LEVEL_CELL_ALL_NO_SUBITEM;

  const variables = requestOptions.columns
    ? {
        boardId: group.boardId,
        groupId: group.groupId,
        cellId: requestOptions.columns,
      }
    : {
        boardId: group.boardId,
        groupId: group.groupId,
      };

  const result =
    await executeGraphQLQuery<GET_GROUP_LEVEL_CELL_NO_SUBITEM_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];
  const items = resultGroup.items_page.items.map((item) => {
    const cells: Cell[] = item.column_values.map(
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
      group.groupId,
      Number(group.boardId),
      cells
    );
  });

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    items
  );
}

async function getGroupLevelCellSubitemItem(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryCellSubitemItemRequestOptions
): Promise<Group> {
  const query = requestOptions.columns
    ? GET_GROUP_LEVEL_CELL_SUBITEM_ITEM
    : GET_GROUP_LEVEL_CELL_ALL_SUBITEM_ITEM;

  const variables = requestOptions.columns
    ? {
        boardId: group.boardId,
        groupId: group.groupId,
        cellId: requestOptions.columns,
      }
    : {
        boardId: group.boardId,
        groupId: group.groupId,
      };

  const result =
    await executeGraphQLQuery<GET_GROUP_LEVEL_CELL_SUBITEM_ITEM_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];
  const items = resultGroup.items_page.items.map((item) => {
    const subitems: Item[] = item.subitems.map(
      (subitem) =>
        new Item(
          clientOptions,
          Number(subitem.id),
          subitem.name,
          subitem.group.id,
          Number(subitem.board.id)
        )
    );
    const cells: Cell[] = item.column_values.map(
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
      group.groupId,
      Number(group.boardId),
      cells,
      subitems
    );
  });

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    items
  );
}

async function getGroupLevelCellSubitemCell(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryCellSubitemCellRequestOptions
): Promise<Group> {
  if (__DEV__) {
    console.log(
      `Take note that the query getGroupLevelCellSubitemCell triggers 2 queries in Monday because of depth limitations.`
    );
  }
  const query = requestOptions.columns
    ? requestOptions.subitemColumns
      ? GET_GROUP_LEVEL_CELL_SUBITEM_CELL
      : GET_GROUP_LEVEL_CELL_SUBITEM_CELL_ALL
    : requestOptions.subitemColumns
    ? GET_GROUP_LEVEL_CELL_ALL_SUBITEM_CELL
    : GET_GROUP_LEVEL_CELL_ALL_SUBITEM_CELL_ALL;

  const variables = requestOptions.columns
    ? requestOptions.subitemColumns
      ? {
          boardId: group.boardId,
          groupId: group.groupId,
          cellId: requestOptions.columns,
          subitemCellId: requestOptions.subitemColumns,
        }
      : {
          boardId: group.boardId,
          groupId: group.groupId,
          cellId: requestOptions.columns,
        }
    : requestOptions.subitemColumns
    ? {
        boardId: group.boardId,
        groupId: group.groupId,
        subitemCellId: requestOptions.subitemColumns,
      }
    : {
        boardId: group.boardId,
        groupId: group.groupId,
      };

  const result =
    await executeGraphQLQuery<GET_GROUP_LEVEL_CELL_SUBITEM_CELL_TYPE>(
      clientOptions,
      requestOptions,
      query,
      variables
    );

  if (!result.data.boards[0]) {
    throw new MonstaaError("query", `No board found with id: ${group.boardId}`);
  }
  const board = result.data.boards[0];

  if (!board.groups[0]) {
    throw new MonstaaError(
      "query",
      `No group found with id: ${group.groupId}, or group is not associated with board id: ${group.boardId}`
    );
  }

  const resultGroup = board.groups[0];

  const allSubitemIds: number[] = [];
  resultGroup.items_page.items.forEach((item) =>
    item.subitems.forEach((subitem) => allSubitemIds.push(Number(subitem.id)))
  );

  let subitemDetails;
  const subitemMapping: Record<number, Cell[] | undefined> = {};
  if (allSubitemIds.length > 0) {
    subitemDetails = await getItems(
      clientOptions,
      { itemId: allSubitemIds },
      { queryLevel: QueryLevel.Cell, subitemLevel: "none" }
    );
    subitemDetails.forEach(
      (subitem) => (subitemMapping[subitem.itemId] = subitem.cells)
    );
  }

  const items = resultGroup.items_page.items.map((item) => {
    const subitems: Item[] = item.subitems.map((subitem) => {
      return new Item(
        clientOptions,
        Number(subitem.id),
        subitem.name,
        subitem.group.id,
        Number(subitem.board.id),
        subitemMapping[Number(subitem.id)] || []
      );
    });
    const cells: Cell[] = item.column_values.map(
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
      group.groupId,
      Number(group.boardId),
      cells,
      subitems
    );
  });

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    items
  );
}

async function getGroupLevelCell(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryCellRequestOptions
): Promise<Group> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getGroupLevelCellNoSubitem(
        clientOptions,
        group,
        requestOptions
      );
    case QueryLevel.Item:
      return await getGroupLevelCellSubitemItem(
        clientOptions,
        group,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getGroupLevelCellSubitemCell(
        clientOptions,
        group,
        requestOptions
      );
    default:
      throw new MonstaaError("query", "Invalid level");
  }
}

export async function getGroup(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
): Promise<Group> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Workspace:
    case QueryLevel.Board:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getItemsByGroup.`
      );
    case QueryLevel.Group:
      return await getGroupLevelGroup(clientOptions, group, requestOptions);
    case QueryLevel.Item:
      return await getGroupLevelItem(clientOptions, group, requestOptions);
    case QueryLevel.Cell:
      return await getGroupLevelCell(clientOptions, group, requestOptions);
    default:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
