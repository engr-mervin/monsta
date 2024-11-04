import { Cell } from "../../classes/Cell";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import {
  GET_GROUP_LEVEL_CELL,
  GET_GROUP_LEVEL_CELL_ALL,
  GET_GROUP_LEVEL_GROUP,
  GET_GROUP_LEVEL_ITEM,
} from "../strings/getGroup";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  Group_RowQuery,
  ClientOptions,
  QueryCellRequestOptions,
  QueryNotCellRequestOptions,
  QueryRequestOptions,
  QueryLevel,
} from "../../types/types";
import { Group } from "../../classes/Group";
import {
  GET_GROUP_LEVEL_CELL_TYPE,
  GET_GROUP_LEVEL_GROUP_TYPE,
  GET_GROUP_LEVEL_ITEM_TYPE,
} from "../types/getGroup";

async function getGroupLevelGroup(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryNotCellRequestOptions
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
    Number(group.boardId),
  );
}

async function getGroupLevelItem(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryNotCellRequestOptions
): Promise<Group> {
  const query = GET_GROUP_LEVEL_ITEM;

  const variables = {
    boardId: group.boardId,
    groupId: group.groupId,
  };

  const result = await executeGraphQLQuery<GET_GROUP_LEVEL_ITEM_TYPE>(
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

async function getGroupLevelCell(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryCellRequestOptions
): Promise<Group> {
  const query = requestOptions.columns
    ? GET_GROUP_LEVEL_CELL
    : GET_GROUP_LEVEL_CELL_ALL;

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

  const result = await executeGraphQLQuery<GET_GROUP_LEVEL_CELL_TYPE>(
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

export async function getGroup(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Item }
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
      return await getGroupLevelGroup(
        clientOptions,
        group,
        requestOptions
      )
    case QueryLevel.Item:
      return await getGroupLevelItem(
        clientOptions,
        group,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getGroupLevelCell(
        clientOptions,
        group,
        requestOptions
      );
    default:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
