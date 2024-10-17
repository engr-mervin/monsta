import { Group } from "../classes/Group";
import { executeGraphQLQuery } from "../services/mondayService";
import { GetGroupsByBoard } from "../types/mondayTypes";
import {
  MondayClientOptions,
  MondayQueryRequestOptions,
  QueryLevel,
} from "../types/types";

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

  const result = await executeGraphQLQuery<GetGroupsByBoard>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const board = result.data.boards[0];

  if (!board) {
    throw new Error(
      `Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`
    );
  }

  return board.groups.map(
    (group) => new Group(group.id, group.title, Number(board.id))
  );
}
