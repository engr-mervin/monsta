import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import {
  GET_BOARD_LEVEL_BOARD,
  GET_BOARD_LEVEL_CELL,
  GET_BOARD_LEVEL_CELL_ALL,
  GET_BOARD_LEVEL_GROUP,
  GET_BOARD_LEVEL_ITEM,
} from "../strings/getBoard";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  GET_BOARD_LEVEL_BOARD_TYPE,
  GET_BOARD_LEVEL_CELL_TYPE,
  GET_BOARD_LEVEL_GROUP_TYPE,
  GET_BOARD_LEVEL_ITEM_TYPE,
} from "../types/getBoard";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
  QueryNotCellRequestOptions,
  QueryCellRequestOptions,
} from "../../types/types";
import { __DEV__ } from "../../setup";
import { Board } from "../../classes/Board";

async function getBoardLevelBoard(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryNotCellRequestOptions
): Promise<Board> {
  const query = GET_BOARD_LEVEL_BOARD;

  const variables = {
    boardId: [boardId],
  };

  const result = await executeGraphQLQuery<GET_BOARD_LEVEL_BOARD_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  return new Board(clientOptions, Number(boardId), board.name);
}

async function getBoardLevelGroup(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryNotCellRequestOptions
): Promise<Board> {
  const query = GET_BOARD_LEVEL_GROUP;

  const variables = {
    boardId: [boardId],
  };

  const result = await executeGraphQLQuery<GET_BOARD_LEVEL_GROUP_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  const groups = board.groups.map(
    (group) => new Group(clientOptions, group.id, group.title, Number(board.id))
  );

  return new Board(clientOptions, Number(boardId), board.name, groups);
}

async function getBoardLevelItem(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryNotCellRequestOptions
): Promise<Board> {
  const query = GET_BOARD_LEVEL_ITEM;

  const variables = {
    boardId: [boardId],
  };

  const result = await executeGraphQLQuery<GET_BOARD_LEVEL_ITEM_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  const allItems: Item[] = [];
  const groups = board.groups.map((group) => {
    const items = group.items_page.items.map((item) => {
      const newItem = new Item(
        clientOptions,
        Number(item.id),
        item.name,
        group.id,
        Number(board.id)
      );
      allItems.push(newItem);
      return newItem;
    });
    return new Group(
      clientOptions,
      group.id,
      group.title,
      Number(board.id),
      items
    );
  });

  return new Board(
    clientOptions,
    Number(boardId),
    board.name,
    groups,
    allItems
  );
}

async function getBoardLevelCell(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryCellRequestOptions
): Promise<Board> {
  const query = requestOptions.columns
    ? GET_BOARD_LEVEL_CELL
    : GET_BOARD_LEVEL_CELL_ALL;

  const variables = requestOptions.columns
    ? {
        boardId: [boardId],
        cellId: requestOptions.columns,
      }
    : {
        boardId,
      };

  const result = await executeGraphQLQuery<GET_BOARD_LEVEL_CELL_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new MonstaaError(
      "query",
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  const allItems: Item[] = [];
  const groups = board.groups.map((group) => {
    const items = group.items_page.items.map((item) => {
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
      const newItem = new Item(
        clientOptions,
        Number(item.id),
        item.name,
        group.id,
        Number(board.id),
        cells
      );
      allItems.push(newItem);
      return newItem;
    });
    return new Group(
      clientOptions,
      group.id,
      group.title,
      Number(board.id),
      items
    );
  });

  return new Board(clientOptions, Number(boardId), board.name, groups, allItems);
}

export async function getBoard(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
): Promise<Board> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Cell:
      if (__DEV__) {
        console.warn(
          `NOTE: Deep query level might cause performance and wasteful queries to Monday. Use with precaution.`
        );
      }
      break;
    default:
      break;
  }
  switch (queryLevel) {
    case QueryLevel.Workspace:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is not applicable to the calling function: getBoard.`
      );
    case QueryLevel.Board:
      return await getBoardLevelBoard(clientOptions, boardId, requestOptions);
    case QueryLevel.Group:
      return await getBoardLevelGroup(clientOptions, boardId, requestOptions);
    case QueryLevel.Item:
      return await getBoardLevelItem(clientOptions, boardId, requestOptions);
    case QueryLevel.Cell:
      return await getBoardLevelCell(clientOptions, boardId, requestOptions);
    default:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}