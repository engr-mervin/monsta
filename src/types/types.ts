import { Group } from "../classes/Group";
import { Item } from "../classes/Item";

export interface MondayClient {
  clientOptions: MondayClientOptions,
  getGroupsByBoard: (boardId: number, requestOptions?: MondayQueryRequestOptions) => Promise<Group[]>;
  getItemsByGroup: (group: Group_RowQuery, requestOptions?: MondayQueryRequestOptions) => Promise<Item[]>;
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
export interface MondayQueryCellRequestOptions extends MondayRequestOptions {
  queryLevel: QueryLevel.Cell;
  columns: string[];
}
export interface MondayQueryNotCellRequestOptions extends MondayRequestOptions {
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


export interface Group_RowQuery {
  groupId: string;
  boardId: number | string;
}