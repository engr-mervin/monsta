import { BaseCell, BaseResponse, ItemWithParentIDs } from "../../types/mondayTypes";

export type GET_ITEM_LEVEL_ITEM_TYPE = BaseResponse<{items: ItemWithParentIDs[]}>;
export type GET_ITEM_LEVEL_CELLS_TYPE = BaseResponse<{items: ItemWithParentIDs<BaseCell[]>[]}>;

