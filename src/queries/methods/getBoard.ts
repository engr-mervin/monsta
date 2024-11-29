import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import { GET_BOARD } from "../strings/getBoard";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  GET_BOARD_TYPE,
} from "../types/getBoard";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
} from "../../types/types";
import { __DEV__ } from "../../setup";
import { Board } from "../../classes/Board";
import { Column } from "../../classes/Column";

export async function getBoard(
  clientOptions: ClientOptions,
  boardId: string | number,
  requestOptions: QueryRequestOptions & { includeColumns: boolean } = {
    queryLevel: QueryLevel.Board,
    includeColumns: false,
  }
): Promise<Board> {
  const queryLevel = requestOptions.queryLevel;

  if (queryLevel === QueryLevel.Cell && __DEV__) {
    console.warn(
      `NOTE: Deep query level might cause performance issues and might get throttled by Monday. Use with precaution.`
    );
  }

  if (queryLevel === QueryLevel.Workspace) {
    throw new MonstaaError(
      "query",
      `Query level chosen: ${queryLevel} is not applicable to the calling function: getBoard.`
    );
  }

  const query = GET_BOARD;

  const variables = {
    boardId: [boardId],
    includeColumns: requestOptions.includeColumns,
    includeGroups: [
      QueryLevel.Group,
      QueryLevel.Item,
      QueryLevel.Cell,
    ].includes(queryLevel),
    includeItems: [QueryLevel.Item, QueryLevel.Cell].includes(queryLevel),
    includeCells: queryLevel === QueryLevel.Cell,
    cellId: (queryLevel === QueryLevel.Cell && requestOptions.columns) ?? null,
    includeSubitems:
      (queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
      requestOptions.subitemLevel !== "none",
    includeSubitemCells:
      (queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
      requestOptions.subitemLevel === QueryLevel.Cell,
  };

  const result =
    await executeGraphQLQuery<GET_BOARD_TYPE>(
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
  const columns = !board.columns ? undefined : board.columns.map((column) => new Column(column.id, column.type, column.title));
  const groups = !board.groups ? undefined : board.groups.map((group) => {
    const items = !group.items_page ? undefined : group.items_page.items.map((item) => {
      const subitems = !item.subitems ? undefined : item.subitems.map((subitem) => {
        const cells = !subitem.column_values ? undefined : subitem.column_values.map(
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

      const cells = !item.column_values ? undefined : item.column_values.map(
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
