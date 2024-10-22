import { BaseResponse, MBoardWithGroups, MBoardWithGroupsWithItems, MBoardWithGroupsWithItemsWithCells } from "../../types/mondayTypes";

export type GetGroupsByBoard = BaseResponse<MBoardWithGroups>;
export type GetGroupsByBoardWithItems = BaseResponse<MBoardWithGroupsWithItems>;
export type GetGroupsByBoardWithItemsWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;
