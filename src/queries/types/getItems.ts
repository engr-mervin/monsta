import { BaseResponse, MBoardWithGroupsWithItems, MBoardWithGroupsWithItemsWithCells } from "../../types/mondayTypes";

export type GetItemsByGroup = BaseResponse<MBoardWithGroupsWithItems>;
export type GetItemsByGroupWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;

