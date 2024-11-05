import {
  BaseBoard,
  BaseCell,
  BaseGroup,
  BaseItem,
  BaseItemWithSubitem,
  BaseResponse,
  BaseWorkspace,
  ItemWithParentIDs,
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

export type GET_WORKSPACE_LEVEL_ITEM_NO_SUBITEM_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup<BaseItem[]>[]>[];
}>;

export type GET_WORKSPACE_LEVEL_ITEM_SUBITEMS_LEVEL_CELL_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<
    BaseGroup<
      BaseItemWithSubitem<undefined, ItemWithParentIDs<BaseCell[]>[]>[]
    >[]
  >[];
}>;

export type GET_WORKSPACE_LEVEL_ITEM_SUBITEMS_LEVEL_ITEM_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<
    BaseGroup<BaseItemWithSubitem<undefined, ItemWithParentIDs[]>[]>[]
  >[];
}>;

export type GET_WORKSPACE_LEVEL_CELL_NO_SUBITEM_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup<BaseItem<BaseCell[]>[]>[]>[];
}>;


export type GET_WORKSPACE_LEVEL_CELL_SUBITEM_ITEM_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup<BaseItemWithSubitem<BaseCell[], ItemWithParentIDs[]>[]>[]>[];
}>;


export type GET_WORKSPACE_LEVEL_CELL_SUBITEM_CELL_TYPE = BaseResponse<{
  workspaces: BaseWorkspace[];
  boards: BaseBoard<BaseGroup<BaseItemWithSubitem<BaseCell[], ItemWithParentIDs<BaseCell[]>[]>[]>[]>[];
}>;
