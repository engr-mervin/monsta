import {
  BaseBoard,
  BaseCell,
  BaseGroup,
  BaseItem,
  BaseResponse,
} from "../../types/mondayTypes";

export type GET_BOARD_LEVEL_BOARD_TYPE = BaseResponse<{
    boards: BaseBoard[];
  }>;
export type GET_BOARD_LEVEL_GROUP_TYPE = BaseResponse<{
  boards: BaseBoard<BaseGroup[]>[];
}>;
export type GET_BOARD_LEVEL_ITEM_TYPE = BaseResponse<{
  boards: BaseBoard<BaseGroup<BaseItem[]>[]>[];
}>;
export type GET_BOARD_LEVEL_CELL_TYPE = BaseResponse<{
  boards: BaseBoard<BaseGroup<BaseItem<BaseCell[]>[]>[]>[];
}>;
