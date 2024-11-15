import {
    ClientOptions,
  RequestOptions,
} from "../../types/types";
import { executeGraphQLQuery } from "../../services/mondayService";
import { MonstaaError } from "../../error";
import { GET_USER } from "../strings/getUser";
import { GET_USER_TYPE } from "../types/getUser";
import { User } from "../../classes/User";

export async function getUser(
  clientOptions: ClientOptions,
  userId: string | number,
  requestOptions: RequestOptions = {}
): Promise<User> {
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
    throw new MonstaaError(
      "query",
      `User with user id: ${userId} not found or you lack the necessary privileges to get this user's details.`
    );
  }

  return new User(clientOptions, Number(user.id), user.name, user.email);
}
