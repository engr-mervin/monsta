import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import { GET_BOARD } from "../strings/getBoard";
import { executeGraphQLQuery } from "../../services/mondayService";
import { GET_BOARD_TYPE } from "../types/getBoard";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
} from "../../types/types";
import { __DEV__ } from "../../setup";
import { Board } from "../../classes/Board";
import { Column } from "../../classes/Column";

export async function getBoards(
  clientOptions: ClientOptions,
  boardIds: (string | number)[],
  requestOptions: QueryRequestOptions & { includeColumns: boolean } = {
    queryLevel: QueryLevel.Board,
    includeColumns: false,
  }
): Promise<Board[]> {
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
    boardId: boardIds,
    includeColumns: requestOptions.includeColumns,
    includeGroups: [
      QueryLevel.Group,
      QueryLevel.Item,
      QueryLevel.Cell,
    ].includes(queryLevel),
    includeItems: [QueryLevel.Item, QueryLevel.Cell].includes(queryLevel),
    includeCells: queryLevel === QueryLevel.Cell,
    cellId: (queryLevel === QueryLevel.Cell && requestOptions.columns) || null,
    subitemCellId:
      ((queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
        requestOptions.subitemLevel === QueryLevel.Cell &&
        requestOptions.subitemColumns) ||
      null,
    includeSubitems:
      (queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
      requestOptions.subitemLevel !== "none",
    includeSubitemCells:
      (queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
      requestOptions.subitemLevel === QueryLevel.Cell,
  };

  const result = await executeGraphQLQuery<GET_BOARD_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const boards = result.data.boards;

  if (boards.length === 0) {
    return [];
  }

  const allItems: Item[] = [];

  return boards.map((board) => {
    const columns = board.columns?.map(
      (column) => new Column(column.id, column.type, column.title)
    );
    const groupItemMapping: { [key: string]: Item[] } = {};
    if (board.items_page) {
      for (const item of board.items_page.items) {
        const cells = item.column_values?.map(
          (col) =>
            new Cell(
              col.id,
              col.text,
              col.type,
              JSON.parse(col.value),
              col.column.title
            )
        );
        const subitems = item.subitems?.map((subitem) => {
          const subitemCells = subitem.column_values?.map(
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
            subitemCells
          );
        });
        const currItem = new Item(
          clientOptions,
          Number(item.id),
          item.name,
          item.group.id,
          Number(board.id),
          cells,
          subitems
        );
        if (!groupItemMapping[item.group.id]) {
          groupItemMapping[item.group.id] = [currItem];
        } else {
          groupItemMapping[item.group.id].push(currItem);
        }
        allItems.push(currItem);
      }
    }

    const groups = board.groups?.map((group) => {
      return new Group(
        clientOptions,
        group.id,
        group.title,
        Number(board.id),
        groupItemMapping[group.id]
      );
    });

    return new Board(
      clientOptions,
      Number(board.id),
      board.name,
      columns,
      groups,
      allItems
    );
  });
}
