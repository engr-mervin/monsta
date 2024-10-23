export enum QueryLevel {
  Board = "board", //only board metadata
  Group = "group", //Only group metadata
  Item = "item", //Only item ids
  Cell = "cell", //Including cell values
}

export enum SubitemQueryLevel {
  NoSubitem = "none", //Don't include subitems
  Subitem = "item", //Only include subitem ids
  SubitemCell = "cell", //Full subitem + subitem cell values
}

export interface ClientOptions extends MondayCommonOptions {
  name: string;
  apiToken: string;
  version: string;
  useCache?: boolean;
  cacheTTL?: number;
}

export interface RequestOptions extends MondayCommonOptions {
  noHooks?: boolean;
}

export type QueryRequestOptions = QueryCellRequestOptions | QueryNotCellRequestOptions;
export interface QueryCellRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Cell;
  columns?: string[];
}
export interface QueryNotCellRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Group | QueryLevel.Item | QueryLevel.Board;
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

export interface Item_CellQuery {
  groupId: string;
  boardId: number | string;
  itemId: number | string;
}