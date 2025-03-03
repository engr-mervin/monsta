import {
    ClientOptions,
  RequestOptions,
} from "../../types/types";
import { executeGraphQLQuery } from "../../services/mondayService";
import { GET_USER } from "../strings/getUser";
import { GET_USER_TYPE } from "../types/getUser";
import { User } from "../../classes/User";

export async function getUser(
  clientOptions: ClientOptions,
  userId: string | number,
  requestOptions: RequestOptions = {}
): Promise<User | null> {
  const query = GET_USER;

  const variables = {
    userId: [userId],
  };

  const result = await executeGraphQLQuery<GET_USER_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const user = result.data.users[0];

  if (!user) {
    return null;
  }

  return new User(clientOptions, Number(user.id), user.name, user.email);
}
