import { Board } from "../../classes/Board";
import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { Workspace } from "../../classes/Workspace";
import { MonstaaError } from "../../error";
import { executeGraphQLQuery } from "../../services/mondayService";
import { __DEV__ } from "../../setup";
import {
  ClientOptions,
  QueryBoardRequestOptions,
  QueryCellRequestOptions,
  QueryGroupRequestOptions,
  QueryItemRequestOptions,
  QueryLevel,
  QueryRequestOptions,
  QueryWorkspaceRequestOptions,
} from "../../types/types";
import {
  GET_WORKSPACE_LEVEL_BOARD,
  GET_WORKSPACE_LEVEL_CELL,
  GET_WORKSPACE_LEVEL_GROUP,
  GET_WORKSPACE_LEVEL_ITEM,
} from "../strings/getWorkspace";
import {
  GET_WORKSPACE_LEVEL_BOARD_TYPE,
  GET_WORKSPACE_LEVEL_CELL_TYPE,
  GET_WORKSPACE_LEVEL_GROUP_TYPE,
  GET_WORKSPACE_LEVEL_ITEM_TYPE,
  GET_WORKSPACE_LEVEL_WORKSPACE_TYPE,
} from "../types/getWorkspace";

async function getWorkspaceLevelWorkspace(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryWorkspaceRequestOptions
): Promise<Workspace> {
  const query = GET_WORKSPACE_LEVEL_BOARD;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<GET_WORKSPACE_LEVEL_WORKSPACE_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const workspaceName = result.data.workspaces[0].name;

  return new Workspace(clientOptions, Number(workspaceId), workspaceName);
}

async function getWorkspaceLevelBoard(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryBoardRequestOptions
): Promise<Workspace> {
  const query = GET_WORKSPACE_LEVEL_BOARD;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<GET_WORKSPACE_LEVEL_BOARD_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );
  const boards = result.data.boards;

  const workspaceName = result.data.workspaces[0].name;
  const resultBoards = boards.map(
    (board) => new Board(clientOptions, Number(board.id), board.name)
  );

  return new Workspace(
    clientOptions,
    Number(workspaceId),
    workspaceName,
    resultBoards
  );
}

async function getWorkspaceLevelGroup(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryGroupRequestOptions
): Promise<Workspace> {
  const query = GET_WORKSPACE_LEVEL_GROUP;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<GET_WORKSPACE_LEVEL_GROUP_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );
  const boards = result.data.boards;

  const workspaceName = result.data.workspaces[0].name;
  const resultBoards = boards.map((board) => {
    const groups = board.groups.map(
      (group) =>
        new Group(clientOptions, group.id, group.title, Number(board.id))
    );
    return new Board(clientOptions, Number(board.id), board.name, groups);
  });

  return new Workspace(
    clientOptions,
    Number(workspaceId),
    workspaceName,
    resultBoards
  );
}
async function getWorkspaceLevelItem(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryItemRequestOptions
): Promise<Workspace> {
  const query = GET_WORKSPACE_LEVEL_ITEM;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<GET_WORKSPACE_LEVEL_ITEM_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );
  const boards = result.data.boards;

  const workspaceName = result.data.workspaces[0].name;
  const resultBoards = boards.map((board) => {
    const groups = board.groups.map((group) => {
      const items = group.items_page.items.map(
        (item) =>
          new Item(
            clientOptions,
            Number(item.id),
            item.name,
            group.id,
            Number(board.id)
          )
      );
      return new Group(
        clientOptions,
        group.id,
        group.title,
        Number(board.id),
        items
      );
    });
    return new Board(clientOptions, Number(board.id), board.name, groups);
  });

  return new Workspace(
    clientOptions,
    Number(workspaceId),
    workspaceName,
    resultBoards
  );
}

async function getWorkspaceLevelCell(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryCellRequestOptions
): Promise<Workspace> {
  const query = GET_WORKSPACE_LEVEL_CELL;

  const variables = {
    workspaceId: [workspaceId],
  };

  const result = await executeGraphQLQuery<GET_WORKSPACE_LEVEL_CELL_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );
  const boards = result.data.boards;
  const workspaceName = result.data.workspaces[0].name;

  const resultBoards = boards.map((board) => {
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
        return new Item(
          clientOptions,
          Number(item.id),
          item.name,
          group.id,
          Number(board.id),
          cells
        );
      });
      return new Group(
        clientOptions,
        group.id,
        group.title,
        Number(board.id),
        items
      );
    });
    return new Board(clientOptions, Number(board.id), board.name, groups);
  });

  return new Workspace(
    clientOptions,
    Number(workspaceId),
    workspaceName,
    resultBoards
  );
}

export async function getWorkspace(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Workspace }
): Promise<Workspace> {
  const queryLevel = requestOptions.queryLevel;
  switch (queryLevel) {
    case QueryLevel.Item:
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
      return await getWorkspaceLevelWorkspace(
        clientOptions,
        workspaceId,
        requestOptions
      );
    case QueryLevel.Board:
      return await getWorkspaceLevelBoard(
        clientOptions,
        workspaceId,
        requestOptions
      );
    case QueryLevel.Group:
      return await getWorkspaceLevelGroup(
        clientOptions,
        workspaceId,
        requestOptions
      );
    case QueryLevel.Item:
      return await getWorkspaceLevelItem(
        clientOptions,
        workspaceId,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getWorkspaceLevelCell(
        clientOptions,
        workspaceId,
        requestOptions
      );
    default:
      throw new MonstaaError(
        "query",
        `Query level chosen: ${queryLevel} is unknown.`
      );
  }
}
