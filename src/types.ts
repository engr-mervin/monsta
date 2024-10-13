export interface MondayClient {
  getRowsByGroup: (...args: string[]) => string;
}

export interface MondayClientOptions extends MondayRequestOptions {
  name: string;
  apiToken: string;
  version: string;
  useCache?: boolean;
  cacheTTL?: number;
}

export interface MondayRequestOptions {
  onStart?: (...args: unknown[]) => unknown;
  onSuccess?: (...args: unknown[]) => unknown;
  onError?: (...args: unknown[]) => unknown;
}

export interface RowGroup {
  id: string;
  title: string;
  boardId: number;
}
