import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import {
  GET_BOARD_LEVEL_BOARD,
  GET_BOARD_LEVEL_CELL_ALL_NO_SUBITEM,
  GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL,
  GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL_ALL,
  GET_BOARD_LEVEL_CELL_ALL_SUBITEM_ITEM,
  GET_BOARD_LEVEL_CELL_NO_SUBITEM,
  GET_BOARD_LEVEL_CELL_SUBITEM_CELL,
  GET_BOARD_LEVEL_CELL_SUBITEM_ITEM,
  GET_BOARD_LEVEL_GROUP,
  GET_BOARD_LEVEL_ITEM_NO_SUBITEM,
  GET_BOARD_LEVEL_ITEM_SUBITEM_CELL,
  GET_BOARD_LEVEL_ITEM_SUBITEM_CELL_ALL,
  GET_BOARD_LEVEL_ITEM_SUBITEM_ITEM,
} from "../strings/getBoard";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  GET_BOARD_LEVEL_BOARD_TYPE,
  GET_BOARD_LEVEL_CELL_NO_SUBITEM_TYPE,
  GET_BOARD_LEVEL_CELL_SUBITEM_CELL_TYPE,
  GET_BOARD_LEVEL_CELL_SUBITEM_ITEM_TYPE,
  GET_BOARD_LEVEL_GROUP_TYPE,
  GET_BOARD_LEVEL_ITEM_NO_SUBITEM_TYPE,
  GET_BOARD_LEVEL_ITEM_SUBITEM_CELL_TYPE,
  GET_BOARD_LEVEL_ITEM_SUBITEM_ITEM_TYPE,
} from "../types/getBoard";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
  QueryCellRequestOptions,
  QueryBoardRequestOptions,
  QueryGroupRequestOptions,
  QueryItemRequestOptions,
  QueryItemNoSubitemRequestOptions,
  QueryItemSubitemItemRequestOptions,
  QueryItemSubitemCellRequestOptions,
  QueryCellNoSubitemRequestOptions,
  QueryCellSubitemItemRequestOptions,
  QueryCellSubitemCellRequestOptions,
} from "../../types/types";
import { __DEV__ } from "../../setup";
import { Board } from "../../classes/Board";

async function getBoardLevelBoard(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryBoardRequestOptions
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
  requestOptions: QueryGroupRequestOptions
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

async function getBoardLevelItemNoSubitem(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryItemNoSubitemRequestOptions
): Promise<Board> {
  const query = GET_BOARD_LEVEL_ITEM_NO_SUBITEM;

  const variables = {
    boardId: [boardId],
  };

  const result =
    await executeGraphQLQuery<GET_BOARD_LEVEL_ITEM_NO_SUBITEM_TYPE>(
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

async function getBoardLevelItemSubitemItem(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryItemSubitemItemRequestOptions
): Promise<Board> {
  const query = GET_BOARD_LEVEL_ITEM_SUBITEM_ITEM;

  const variables = {
    boardId: [boardId],
  };

  const result =
    await executeGraphQLQuery<GET_BOARD_LEVEL_ITEM_SUBITEM_ITEM_TYPE>(
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
      const newItem = new Item(
        clientOptions,
        Number(item.id),
        item.name,
        group.id,
        Number(board.id),
        undefined,
        subitems
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

async function getBoardLevelItemSubitemCell(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryItemSubitemCellRequestOptions
): Promise<Board> {
  const query = requestOptions.subitemColumns
    ? GET_BOARD_LEVEL_ITEM_SUBITEM_CELL
    : GET_BOARD_LEVEL_ITEM_SUBITEM_CELL_ALL;

  const variables = requestOptions.subitemColumns
    ? {
        boardId: [boardId],
        subitemCellId: requestOptions.subitemColumns,
      }
    : {
        boardId: [boardId],
      };

  const result =
    await executeGraphQLQuery<GET_BOARD_LEVEL_ITEM_SUBITEM_CELL_TYPE>(
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
      const newItem = new Item(
        clientOptions,
        Number(item.id),
        item.name,
        group.id,
        Number(board.id),
        undefined,
        subitems
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

async function getBoardLevelItem(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryItemRequestOptions
): Promise<Board> {
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getBoardLevelItemNoSubitem(
        clientOptions,
        boardId,
        requestOptions
      );
    case QueryLevel.Item:
      return await getBoardLevelItemSubitemItem(
        clientOptions,
        boardId,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getBoardLevelItemSubitemCell(
        clientOptions,
        boardId,
        requestOptions
      );
  }
}

async function getBoardLevelCellNoSubitem(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryCellNoSubitemRequestOptions
): Promise<Board> {
  const query = requestOptions.columns
    ? GET_BOARD_LEVEL_CELL_NO_SUBITEM
    : GET_BOARD_LEVEL_CELL_ALL_NO_SUBITEM;

  const variables = requestOptions.columns
    ? {
        boardId: [boardId],
        cellId: requestOptions.columns,
      }
    : {
        boardId: [boardId],
      };

  const result =
    await executeGraphQLQuery<GET_BOARD_LEVEL_CELL_NO_SUBITEM_TYPE>(
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

  return new Board(
    clientOptions,
    Number(boardId),
    board.name,
    groups,
    allItems
  );
}

async function getBoardLevelCellSubitemItem(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryCellSubitemItemRequestOptions
): Promise<Board> {
  const query = requestOptions.columns
    ? GET_BOARD_LEVEL_CELL_SUBITEM_ITEM
    : GET_BOARD_LEVEL_CELL_ALL_SUBITEM_ITEM;

  const variables = requestOptions.columns
    ? {
        boardId: [boardId],
        cellId: requestOptions.columns,
      }
    : {
        boardId: [boardId],
      };

  const result =
    await executeGraphQLQuery<GET_BOARD_LEVEL_CELL_SUBITEM_ITEM_TYPE>(
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
      const newItem = new Item(
        clientOptions,
        Number(item.id),
        item.name,
        group.id,
        Number(board.id),
        cells,
        subitems
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

async function getBoardLevelCellSubitemCell(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryCellSubitemCellRequestOptions
): Promise<Board> {
  const query = requestOptions.columns
    ? requestOptions.subitemColumns
      ? GET_BOARD_LEVEL_CELL_SUBITEM_CELL
      : GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL_ALL
    : requestOptions.subitemColumns
    ? GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL
    : GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL_ALL;

  const variables = requestOptions.columns
    ? requestOptions.subitemColumns
      ? {
          boardId: [boardId],
          cellId: requestOptions.columns,
          subitemCellId: requestOptions.subitemColumns,
        }
      : {
          boardId: [boardId],
          cellId: requestOptions.columns,
        }
    : requestOptions.subitemColumns
    ? {
        boardId: [boardId],
        subitemCellId: requestOptions.subitemColumns,
      }
    : {
        boardId: [boardId],
      };

  const result =
    await executeGraphQLQuery<GET_BOARD_LEVEL_CELL_SUBITEM_CELL_TYPE>(
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
      const subitems: Item[] = item.subitems.map((subitem) => {
        const cells: Cell[] = subitem.column_values.map(
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
        cells,
        subitems
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
  switch (requestOptions.subitemLevel) {
    case "none":
      return await getBoardLevelCellNoSubitem(
        clientOptions,
        boardId,
        requestOptions
      );
    case QueryLevel.Item:
      return await getBoardLevelCellSubitemItem(
        clientOptions,
        boardId,
        requestOptions
      );
    case QueryLevel.Cell:
      return await getBoardLevelCellSubitemCell(
        clientOptions,
        boardId,
        requestOptions
      );
    default:
      throw new MonstaaError("query", "Invalid level");
  }
}

export async function getBoard(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Board }
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
