import { Cell } from "../../classes/Cell";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";
import { GET_GROUP } from "../strings/getGroup";
import { executeGraphQLQuery } from "../../services/mondayService";
import {
  Group_RowQuery,
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
} from "../../types/types";
import { Group } from "../../classes/Group";
import { GET_GROUP_TYPE } from "../types/getGroup";

export async function getGroup(
  clientOptions: ClientOptions,
  group: Group_RowQuery,
  requestOptions: QueryRequestOptions = { queryLevel: QueryLevel.Group }
): Promise<Group | null> {
  const queryLevel = requestOptions.queryLevel;

  if ([QueryLevel.Workspace, QueryLevel.Board].includes(queryLevel)) {
    throw new MonstaaError(
      "query",
      `Query level chosen: ${queryLevel} is not applicable to the calling function: getGroup.`
    );
  }

  const query = GET_GROUP;

  const variables = {
    boardId: [group.boardId],
    groupId: [group.groupId],
    includeItems: [QueryLevel.Item, QueryLevel.Cell].includes(queryLevel),
    includeCells: queryLevel === QueryLevel.Cell,
    cellId: (queryLevel === QueryLevel.Cell && requestOptions.columns) ?? null,
    subitemCellId:
      ((queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
        requestOptions.subitemLevel === QueryLevel.Cell &&
        requestOptions.subitemColumns) ??
      null,
    includeSubitems:
      (queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
      requestOptions.subitemLevel !== "none",
    includeSubitemCells:
      (queryLevel === QueryLevel.Item || queryLevel === QueryLevel.Cell) &&
      requestOptions.subitemLevel === QueryLevel.Cell,
  };

  const result = await executeGraphQLQuery<GET_GROUP_TYPE>(
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
    return null;
  }

  const resultGroup = board.groups[0];

  let groupItems: Item[] | undefined;
  if (board.items_page) {
    groupItems = [];
    for (const item of board.items_page.items) {
      if (item.group.id !== resultGroup.id) {
        continue;
      }
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
      
      groupItems.push(currItem);
    }
  }

  return new Group(
    clientOptions,
    group.groupId,
    resultGroup.title,
    Number(group.boardId),
    groupItems
  );
}
