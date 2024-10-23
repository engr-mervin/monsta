import { BaseResponse, MBoard, MBoardWithGroups, MBoardWithGroupsWithItems, MBoardWithGroupsWithItemsWithCells } from "../../types/mondayTypes";

export type getBoardsByWorkSpace = BaseResponse<MBoard>;
export type getBoardsByWorkSpaceWithGroups = BaseResponse<MBoardWithGroups>;
export type getBoardsByWorkSpaceWithGroupsWithItems = BaseResponse<MBoardWithGroupsWithItems>;
export type getBoardsByWorkSpaceWithGroupsWithItemsWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;
