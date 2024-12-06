import {
    ClientOptions,
  RequestOptions,
} from "../../types/types";
import { executeGraphQLQuery } from "../../services/mondayService";
import { GET_USER } from "../strings/getUser";
import { GET_USER_TYPE } from "../types/getUser";
import { User } from "../../classes/User";

export async function getUsers(
  clientOptions: ClientOptions,
  userIds: (string | number)[],
  requestOptions: RequestOptions = {}
): Promise<User[]> {
  const query = GET_USER;

  const variables = {
    userId: userIds,
  };

  const result = await executeGraphQLQuery<GET_USER_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const users = result.data.users;

  if (users.length === 0) {
    return [];
  }

  return users.map(user => new User(clientOptions, Number(user.id), user.name, user.email));
}
