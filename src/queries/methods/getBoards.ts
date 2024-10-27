import { Board } from "../../classes/Board";
import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import { executeGraphQLQuery } from "../../services/mondayService";
import { __DEV__ } from "../../setup";
import { ClientOptions, QueryCellRequestOptions, QueryLevel, QueryNotCellRequestOptions, QueryRequestOptions } from "../../types/types";
import {
  GET_BOARDS_BY_WORKSPACE_LEVEL_BOARD,
  GET_BOARDS_BY_WORKSPACE_LEVEL_CELL,
  GET_BOARDS_BY_WORKSPACE_LEVEL_GROUP,
  GET_BOARDS_BY_WORKSPACE_LEVEL_ITEM,
} from "../strings/getBoards";
import {
  getBoardsByWorkSpace,
  getBoardsByWorkSpaceWithGroups,
  getBoardsByWorkSpaceWithGroupsWithItems,
  getBoardsByWorkSpaceWithGroupsWithItemsWithCells,
} from "../types/getBoards";

async function getBoardsByWorkspaceLevelBoard(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryNotCellRequestOptions
): Promise<Board[]> {
  const query = GET_BOARDS_BY_WORKSPACE_LEVEL_BOARD;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<getBoardsByWorkSpace>(clientOptions, requestOptions, query, variables);
  const boards = result.data.boards;

  return boards.map((board) => new Board(clientOptions, Number(board.id), board.name));
}
async function getBoardsByWorkspaceLevelGroup(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryNotCellRequestOptions
): Promise<Board[]> {
  const query = GET_BOARDS_BY_WORKSPACE_LEVEL_GROUP;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<getBoardsByWorkSpaceWithGroups>(clientOptions, requestOptions, query, variables);
  const boards = result.data.boards;

  return boards.map((board) => {
    const groups = board.groups.map((group) => new Group(clientOptions, group.id, group.title, Number(board.id)));
    return new Board(clientOptions, Number(board.id), board.name, groups);
  });
}
async function getBoardsByWorkspaceLevelItem(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryNotCellRequestOptions
): Promise<Board[]> {
  const query = GET_BOARDS_BY_WORKSPACE_LEVEL_ITEM;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<getBoardsByWorkSpaceWithGroupsWithItems>(clientOptions, requestOptions, query, variables);
  const boards = result.data.boards;

  return boards.map((board) => {
    const groups = board.groups.map((group) => {
      const items = group.items_page.items.map((item) => new Item(clientOptions, item.id, item.name, group.id, Number(board.id)));
      return new Group(clientOptions, group.id, group.title, Number(board.id), items);
    });
    return new Board(clientOptions, Number(board.id), board.name, groups);
  });
}

async function getBoardsByWorkspaceLevelCell(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryCellRequestOptions
): Promise<Board[]> {
  const query = GET_BOARDS_BY_WORKSPACE_LEVEL_CELL;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<getBoardsByWorkSpaceWithGroupsWithItemsWithCells>(clientOptions, requestOptions, query, variables);
  const boards = result.data.boards;

  return boards.map((board) => {
    const groups = board.groups.map((group) => {
      const items = group.items_page.items.map((item) => {
        const cells: Cell[] = item.column_values.map((col) => new Cell(col.id, col.text, col.type, JSON.parse(col.value), col.column.title));
        return new Item(clientOptions, item.id, item.name, group.id, Number(board.id), cells);
      });
      return new Group(clientOptions, group.id, group.title, Number(board.id), items);
    });
    return new Board(clientOptions, Number(board.id), board.name, groups);
  });
}

export async function getBoardsByWorkspace(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Board }
): Promise<Board[]> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Item:
    case QueryLevel.Cell:
      if (__DEV__) {
        console.warn(`NOTE: Deep query level might cause performance and wasteful queries to Monday. Use with precaution.`);
      }
      break;
    default:
      break;
  }

  switch (queryLevel) {
    case QueryLevel.Board:
      return await getBoardsByWorkspaceLevelBoard(clientOptions, workspaceId, requestOptions);
    case QueryLevel.Group:
      return await getBoardsByWorkspaceLevelGroup(clientOptions, workspaceId, requestOptions);
    case QueryLevel.Item:
      return await getBoardsByWorkspaceLevelItem(clientOptions, workspaceId, requestOptions);
    case QueryLevel.Cell:
      return await getBoardsByWorkspaceLevelCell(clientOptions, workspaceId, requestOptions);
    default:
      throw new MonstaaError("query", `Query level chosen: ${queryLevel} is unknown.`);
  }
}
