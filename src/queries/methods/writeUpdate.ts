import { executeGraphQLQuery } from "../../services/mondayService";
import { ClientOptions, RequestOptions } from "../../types/types";
import { WRITE_UPDATE } from "../strings/writeUpdate";
import { WRITE_UPDATE_TYPE } from "../types/writeUpdate";

export async function writeUpdate(
  clientOptions: ClientOptions,
  itemId: number,
  update: string,
  requestOptions: RequestOptions
): Promise<number> {
  const query = WRITE_UPDATE;

  const variables = {
    itemId,
    update,
  };

  const result = await executeGraphQLQuery<WRITE_UPDATE_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  //TODO: Add error handling in monstaa
  return Number(result.data.create_update.id);
}
