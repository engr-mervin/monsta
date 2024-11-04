import {
  BaseBoard,
  BaseCell,
  BaseGroup,
  BaseItem,
  BaseResponse,
  BaseWorkspace,
} from "../../types/mondayTypes";


export type GET_WORKSPACE_LEVEL_WORKSPACE_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
}>;

export type GET_WORKSPACE_LEVEL_BOARD_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard[];
}>;

export type GET_WORKSPACE_LEVEL_GROUP_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup[]>[];
}>;

export type GET_WORKSPACE_LEVEL_ITEM_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup<BaseItem[]>[]>[];
}>;

export type GET_WORKSPACE_LEVEL_CELL_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup<BaseItem<BaseCell[]>[]>[]>[];
}>;
