import type { MondayClientOptions, MondayRequestOptions } from "../types/types.js";

export async function executeGraphQLQuery<T>(
  clientOptions: MondayClientOptions,
  requestOptions: MondayRequestOptions,
  query: string,
  variables: Record<string, unknown>
): Promise<T> {
  if (typeof requestOptions.onStart === "function") {
    requestOptions.onStart();
  } else if (!requestOptions.noHooks && typeof clientOptions.onStart === "function") {
    clientOptions.onStart();
  }
  try {
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
    if (typeof requestOptions.onSuccess === "function") {
      requestOptions.onSuccess(result);
    } else if (!requestOptions.noHooks && typeof clientOptions.onSuccess === "function") {
      clientOptions.onSuccess(result);
    }
    return result;
  } catch (error: unknown) {
    if (typeof requestOptions.onError === "function") {
      requestOptions.onError(error);
    } else if (!requestOptions.noHooks && typeof clientOptions.onError === "function") {
      clientOptions.onError(error);
    }
    throw error;
  }
}
