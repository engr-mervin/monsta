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

export type QueryRequestOptions = QueryWorkspaceRequestOptions | QueryBoardRequestOptions | QueryGroupRequestOptions | QueryItemRequestOptions | QueryCellRequestOptions;

export interface QueryWorkspaceRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Workspace;
}
export interface QueryBoardRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Board;
}
export interface QueryGroupRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Group;
}
export interface QueryItemRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Item;
  includeSubitems?: boolean;
  subitemLevel?: QueryLevel;
}
export interface QueryCellRequestOptions extends RequestOptions {
  queryLevel: QueryLevel.Cell;
  columns?: string[];
  includeSubitems?: boolean;
  subitemLevel?: QueryLevel;
  subitemColumns?: string[];
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