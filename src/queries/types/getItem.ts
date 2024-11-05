import { BaseCell, BaseResponse, ItemWithParentIDs, ItemWithSubitemsAndParentIDs } from "../../types/mondayTypes";

export type GET_ITEM_LEVEL_ITEM_NO_SUBITEM_TYPE = BaseResponse<{items: ItemWithParentIDs[]}>;

export type GET_ITEM_LEVEL_ITEM_SUBITEM_ITEM_TYPE = BaseResponse<{items: ItemWithSubitemsAndParentIDs<undefined, ItemWithParentIDs[]>[]}>;
export type GET_ITEM_LEVEL_ITEM_SUBITEM_CELL_TYPE = BaseResponse<{items: ItemWithSubitemsAndParentIDs<undefined, ItemWithParentIDs<BaseCell[]>[]>[]}>;


export type GET_ITEM_LEVEL_CELL_NO_SUBITEM_TYPE = BaseResponse<{items:  ItemWithParentIDs<BaseCell[]>[]}>;

export type GET_ITEM_LEVEL_CELL_SUBITEM_ITEM_TYPE = BaseResponse<{items: ItemWithSubitemsAndParentIDs<BaseCell[], ItemWithParentIDs[]>[]}>;
export type GET_ITEM_LEVEL_CELL_SUBITEM_CELL_TYPE = BaseResponse<{items: ItemWithSubitemsAndParentIDs<BaseCell[], ItemWithParentIDs<BaseCell[]>[]>[]}>;



