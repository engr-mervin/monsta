import { BaseResponse, MBoardWithGroupsWithItems, MBoardWithGroupsWithItemsWithCells } from "./mondayTypes";

export type GetItemsByGroup = BaseResponse<MBoardWithGroupsWithItems>;
export type GetItemsByGroupWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;

