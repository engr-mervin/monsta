import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { MonstaError } from "../../error";
import {
  GET_GROUPS_BY_BOARD_LEVEL_CELL,
  GET_GROUPS_BY_BOARD_LEVEL_CELL_ALL,
  GET_GROUPS_BY_BOARD_LEVEL_GROUP,
  GET_GROUPS_BY_BOARD_LEVEL_ITEM,
} from "../strings/getGroups";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  GetGroupsByBoard,
  GetGroupsByBoardWithItems,
  GetGroupsByBoardWithItemsWithCells,
} from "../types/getGroups";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
  QueryNotCellRequestOptions,
  QueryCellRequestOptions,
} from "../../types/types";

async function getGroupsByBoardLevelGroup(
  clientOptions: ClientOptions,
  boardId: (string | number)[],
  requestOptions: QueryNotCellRequestOptions
): Promise<Group[]> {
  const query = GET_GROUPS_BY_BOARD_LEVEL_GROUP;

  const variables = {
    boardId,
  };

  const result = await executeGraphQLQuery<GetGroupsByBoard>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  return board.groups.map(
    (group) => new Group(clientOptions, group.id, group.title, Number(board.id))
  );
}
async function getGroupsByBoardLevelItem(
  clientOptions: ClientOptions,
  boardId: (string | number)[],
  requestOptions: QueryNotCellRequestOptions
): Promise<Group[]> {
  const query = GET_GROUPS_BY_BOARD_LEVEL_ITEM;

  const variables = {
    boardId,
  };

  const result = await executeGraphQLQuery<GetGroupsByBoardWithItems>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  return board.groups.map((group) => {
    const items = group.items_page.items.map(
      (item) => new Item(clientOptions, item.id, item.name, group.id, Number(board.id))
    );
    return new Group(clientOptions, group.id, group.title, Number(board.id), items);
  });
}

async function getGroupsByBoardLevelCell(
  clientOptions: ClientOptions,
  boardId: (string | number)[],
  requestOptions: QueryCellRequestOptions
): Promise<Group[]> {
  const query = requestOptions.columns
    ? GET_GROUPS_BY_BOARD_LEVEL_CELL
    : GET_GROUPS_BY_BOARD_LEVEL_CELL_ALL;

  const variables = requestOptions.columns
    ? {
        boardId,
        cellId: requestOptions.columns,
      }
    : {
        boardId,
      };

  const result = await executeGraphQLQuery<GetGroupsByBoardWithItemsWithCells>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  return board.groups.map((group) => {
    const items = group.items_page.items.map((item) => {
      const cells: Cell[] = item.column_values.map(
        (col) => new Cell(col.id, col.text, col.type, JSON.parse(col.value))
      );
      return new Item(clientOptions, item.id, item.name, group.id, Number(board.id), cells);
    });
    return new Group(clientOptions, group.id, group.title, Number(board.id), items);
  });
}

export async function getGroupsByBoard(
  clientOptions: ClientOptions,
  boardId: (string | number)[],
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
): Promise<Group[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Group:
      return await getGroupsByBoardLevelGroup(
        clientOptions,
        boardId,
        requestOptions
      );
    case QueryLevel.Item:
      return await getGroupsByBoardLevelItem(
        clientOptions,
        boardId,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getGroupsByBoardLevelCell(
        clientOptions,
        boardId,
        requestOptions
      );
    default:
      throw new MonstaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
