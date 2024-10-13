import { GetGroupsByBoard } from "./mondayTypes.js";
import type { MondayClientOptions, MondayRequestOptions, RowGroup } from "./types.js";

export async function getGroupsByBoard(
  clientOptions: MondayClientOptions,
  boardId: string | number,
  requestOptions: MondayRequestOptions = {}
): Promise<RowGroup[]> {
  const query = `query{
    boards(ids: $id) {
      id
      groups {
        id
        title
      }
    }
  }`;

  const variables = {
    id: boardId,
  };

  const result = await executeGraphQLQuery<GetGroupsByBoard>(clientOptions, requestOptions, query, variables);

  const board = result.data.boards[0];

  if (!board) {
    throw new Error(`Board with board id: ${boardId} not found or you lack the necessary privileges to access this board.`);
  }

  return board.groups.map((group) => ({
    id: group.id,
    title: group.title,
    boardId: Number(board.id),
  }));
}

export function getRowsByGroup(clientOptions: MondayClientOptions): string {
  return "";
}

async function executeGraphQLQuery<T>(
  clientOptions: MondayClientOptions,
  requestOptions: MondayRequestOptions,
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  if (typeof clientOptions.onStart === "function") {
    clientOptions.onStart();
  }
  if (typeof requestOptions.onStart === "function") {
    requestOptions.onStart();
  }
  try {
    //send Query
    const response = await fetch("https://api.monday.com/v2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${clientOptions.apiToken}`,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    const result = (await response.json()) as T;
    if (typeof clientOptions.onSuccess === "function") {
      clientOptions.onSuccess(result);
    }
    if (typeof requestOptions.onSuccess === "function") {
      requestOptions.onSuccess(result);
    }
    return result;
  } catch (error: unknown) {
    if (typeof clientOptions.onError === "function") {
      clientOptions.onError(error);
    }
    if (typeof requestOptions.onError === "function") {
      requestOptions.onError(error);
    }
    throw error;
  }
}
