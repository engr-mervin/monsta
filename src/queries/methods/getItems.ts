import { Cell } from "../../classes/Cell";
import { Item } from "../../classes/Item";
import { MonstaaError } from "../../error";

import { executeGraphQLQuery } from "../../services/mondayService";
import {
  ClientOptions,
  QueryRequestOptions,
  QueryLevel,
} from "../../types/types";
import { GET_ITEM } from "../strings/getItem";
import { GET_ITEM_TYPE } from "../types/getItem";

export async function getItems(
  clientOptions: ClientOptions,
  itemIds: (string | number)[],
  requestOptions: QueryRequestOptions = {
    queryLevel: QueryLevel.Item,
    subitemLevel: "none",
  }
): Promise<Item[]> {
  const queryLevel = requestOptions.queryLevel;

  if (
    [QueryLevel.Workspace, QueryLevel.Board, QueryLevel.Group].includes(
      queryLevel
    )
  ) {
    throw new MonstaaError(
      "query",
      `Query level chosen: ${queryLevel} is not applicable to the calling function: getGroup.`
    );
  }
  const query = GET_ITEM;
  const variables = {
    itemId: itemIds,
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

  const result = await executeGraphQLQuery<GET_ITEM_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  if (!result.data.items[0]) {
    return [];
  }

  return result.data.items.map((item) => {
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

    return new Item(
      clientOptions,
      Number(item.id),
      item.name,
      item.group.id,
      Number(item.board.id),
      cells,
      subitems
    );
  });
}
