import {
  BaseBoard,
  BaseCell,
  BaseGroup,
  BaseItem,
  BaseItemWithSubitem,
  BaseResponse,
  ItemWithParentIDs,
} from "../../types/mondayTypes";

export type GET_GROUP_LEVEL_GROUP_TYPE = BaseResponse<{
  boards: BaseBoard<BaseGroup[]>[];
}>;
export type GET_GROUP_LEVEL_ITEM_NO_SUBITEM_TYPE = BaseResponse<{
  boards: BaseBoard<BaseGroup<BaseItem[]>[]>[];
}>;
export type GET_GROUP_LEVEL_ITEM_SUBITEM_ITEM_TYPE = BaseResponse<{
  boards: BaseBoard<
    BaseGroup<BaseItemWithSubitem<undefined, ItemWithParentIDs[]>[]>[]
  >[];
}>;
export type GET_GROUP_LEVEL_ITEM_SUBITEM_CELL_TYPE = BaseResponse<{
  boards: BaseBoard<
    BaseGroup<
      BaseItemWithSubitem<undefined, ItemWithParentIDs<BaseCell[]>[]>[]
    >[]
  >[];
}>;
export type GET_GROUP_LEVEL_CELL_NO_SUBITEM_TYPE = BaseResponse<{
  boards: BaseBoard<BaseGroup<BaseItem<BaseCell[]>[]>[]>[];
}>;

export type GET_GROUP_LEVEL_CELL_SUBITEM_ITEM_TYPE = BaseResponse<{
  boards: BaseBoard<
    BaseGroup<BaseItemWithSubitem<BaseCell[], ItemWithParentIDs[]>[]>[]
  >[];
}>;
export type GET_GROUP_LEVEL_CELL_SUBITEM_CELL_TYPE = BaseResponse<{
  boards: BaseBoard<
    BaseGroup<BaseItemWithSubitem<BaseCell[], ItemWithParentIDs<BaseCell[]>[]>[]>[]
  >[];
}>;
