import { Cell } from "../../classes/Cell";
import { Group } from "../../classes/Group";
import { Item } from "../../classes/Item";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
} from "../../types/types";
import { __DEV__ } from "../../setup";
import { Board } from "../../classes/Board";
import { Column } from "../../classes/Column";
import { GET_WORKSPACE } from "../strings/getWorkspace";
import { GET_WORKSPACE_TYPE } from "../types/getWorkspace";
import { Workspace } from "../../classes/Workspace";

export async function getWorkspace(
  clientOptions: ClientOptions,
  workspaceId: string | number,
  requestOptions: QueryRequestOptions & { includeColumns?: boolean } = {
    queryLevel: QueryLevel.Workspace,
    includeColumns: false,
  }
): Promise<Workspace | null> {
  const queryLevel = requestOptions.queryLevel;

  if (queryLevel === QueryLevel.Cell && __DEV__) {
    console.warn(
      `NOTE: Deep query level might cause performance issues and might get throttled by Monday. Use with precaution.`
    );
  }

  const query = GET_WORKSPACE;

  const variables = {
    workspaceId,
    includeBoards: [QueryLevel.Board, QueryLevel.Group, QueryLevel.Item, QueryLevel.Cell].includes(queryLevel),
    includeColumns: requestOptions.includeColumns || false,
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

  const result = await executeGraphQLQuery<GET_WORKSPACE_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const boards = result.data.boards;
  const workspace = result.data.workspaces[0];
  if(!workspace){
    return null;
  }
  
  const allBoards = boards?.map((board) => {
    const allItems: Item[] = [];
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

  return new Workspace(clientOptions, Number(workspace.id), workspace.name, allBoards);
}
