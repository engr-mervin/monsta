import { Cell, Group, Row } from "./classes.js";
import { MonstaError } from "./error.js";
import { executeGraphQLQuery } from "./mondayService.js";
import { GetGroupsByBoard, type GetRowsByGroup } from "./mondayTypes.js";
import { QueryLevel, type MondayClientOptions, type MondayQueryRequestOptions } from "./types.js";

export async function getGroupsByBoard(
  clientOptions: MondayClientOptions,
  boardId: string | number,
  requestOptions: MondayQueryRequestOptions = { queryLevel: QueryLevel.Group }
): Promise<Group[]> {
  const query = `
  query($id: [ID!]){
    boards(ids: $id) {
      id
      groups {
        id
        title
      }
    }
  }`;

  const variables = {
    id: [boardId],
  };

  const result = await executeGraphQLQuery<GetGroupsByBoard>(clientOptions, requestOptions, query, variables);

  const board = result.data.boards[0];

  if (!board) {
    throw new Error(`Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`);
  }

  return board.groups.map((group) => new Group(group.id, group.title, board.id));
}

export async function getRowsByGroup(
  clientOptions: MondayClientOptions,
  group: Group,
  requestOptions: MondayQueryRequestOptions = { queryLevel: QueryLevel.Item }
): Promise<Row[]> {
  if (requestOptions.queryLevel === QueryLevel.Group) {
    throw new MonstaError(
      "query",
      "getRowsByGroup",
      `Query level chosen: ${requestOptions.queryLevel} is not applicable to the calling function: ${getRowsByGroup}.`
    );
  }
  const query = `
    query($id: [ID!], $groupId: [String!]){
        boards(ids: $id) {
            id
            groups(ids: $groupId) {
                id
                title
                ${
                  [QueryLevel.Cell, QueryLevel.Item].includes(requestOptions.queryLevel)
                    ? `items_page {
                        items {
                            id
                            name
                            ${
                              requestOptions.queryLevel === QueryLevel.Cell
                                ? `
                                column_values {
                                    id
                                    value
                                    text
                                    type
                                }`
                                : ``
                            }
                        }
                    }`
                    : ``
                }
            }
        }
    }`;

  const variables = {
    id: group.boardId,
    groupId: group.id,
  };

  const result = await executeGraphQLQuery<GetRowsByGroup>(clientOptions, requestOptions, query, variables);

  const board = result.data.boards[0];

  if (!board) {
    throw new Error(`Board with board id: ${group.boardId} not found or you lack the necessary privilege to access this board.`);
  }

  const foundGroup = board.groups[0];

  if (!foundGroup) {
    throw new Error(`Group with group id: ${group.id} not found or you lack the necessary privilege to access this group.`);
  }

  return foundGroup.items_page.items.map((row) => {
    const cells: Record<string, Cell> = {};
    row.column_values.forEach((col_value) => {
      cells[col_value.id] = new Cell(col_value.id, col_value.text, col_value.type, JSON.parse(col_value.value));
    });
    return new Row(row.id, group.id, group.boardId, cells);
  });
}
