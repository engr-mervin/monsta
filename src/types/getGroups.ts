import { BaseResponse, MBoardWithGroups, MBoardWithGroupsWithItems, MBoardWithGroupsWithItemsWithCells } from "./mondayTypes";

export type GetGroupsByBoard = BaseResponse<MBoardWithGroups>;
export type GetGroupsByBoardWithItems = BaseResponse<MBoardWithGroupsWithItems>;
export type GetGroupsByBoardWithItemsWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;
