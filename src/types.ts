import type { Group, Row } from "./classes.js";

export interface MondayClient {
  getGroupsByBoard: (boardId: string | number, requestOptions?: MondayQueryRequestOptions) => Promise<Group[]>;
  getRowsByGroup: (group: Group, requestOptions?: MondayQueryRequestOptions) => Promise<Row[]>;
}

export enum QueryLevel {
  Group = "group", //Only group metadata
  Item = "item", //Only item ids
  Cell = "cell", //Including cell values
}

export enum SubitemQueryLevel {
  NoSubitem = "none", //Don't include subitems
  Subitem = "item", //Only include subitem ids
  SubitemCell = "cell", //Full subitem + subitem cell values
}

export interface MondayClientOptions extends MondayCommonOptions {
  name: string;
  apiToken: string;
  version: string;
  useCache?: boolean;
  cacheTTL?: number;
}

export interface MondayRequestOptions extends MondayCommonOptions {
  noHooks?: boolean;
}

export type MondayQueryRequestOptions = MondayQueryCellRequestOptions | MondayQueryNotCellRequestOptions;
interface MondayQueryCellRequestOptions extends MondayRequestOptions {
  queryLevel: QueryLevel.Cell;
  columns: string[];
}
interface MondayQueryNotCellRequestOptions extends MondayRequestOptions {
  queryLevel: QueryLevel.Group | QueryLevel.Item;
}

interface MondayCommonOptions {
  onStart?: () => void;
  onSuccess?: <T>(result: T) => void;
  onError?: (error: unknown) => void;
}

export interface RowGroup {
  id: string;
  title: string;
  boardId: number;
}
