export enum QueryLevel {
  Workspace = "workspace", //workspace metadata
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

export type QueryRequestOptions =
  | QueryWorkspaceRequestOptions
  | QueryBoardRequestOptions
  | QueryGroupRequestOptions
  | QueryItemRequestOptions
  | QueryCellRequestOptions;

export interface QueryWorkspaceRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Workspace;
}
export interface QueryBoardRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Board;
}
export interface QueryGroupRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Group;
}
export type QueryItemRequestOptions =
  | QueryItemSubitemItemRequestOptions
  | QueryItemSubitemCellRequestOptions
  | QueryItemNoSubitemRequestOptions;
export interface QueryItemSubitemItemRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Item;
  subitemLevel: QueryLevel.Item;
}

export interface QueryItemSubitemCellRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Item;
  subitemLevel: QueryLevel.Cell;
  subitemColumns?: string[];
}

export interface QueryItemNoSubitemRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Item;
  subitemLevel: "none";
}

export type QueryCellRequestOptions =
  | QueryCellSubitemItemRequestOptions
  | QueryCellSubitemCellRequestOptions
  | QueryCellNoSubitemRequestOptions;
export interface QueryCellSubitemItemRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Cell;
  columns?: string[];
  subitemLevel: QueryLevel.Item;
}

export interface QueryCellSubitemCellRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Cell;
  columns?: string[];
  subitemLevel: QueryLevel.Cell;
  subitemColumns?: string[];
}

export interface QueryCellNoSubitemRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Cell;
  columns?: string[];
  subitemLevel: "none";
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
  itemId: number | string;
}

export interface Item_SubitemQuery {
  itemId: number | string;
}
