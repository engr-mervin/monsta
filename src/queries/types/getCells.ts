import { BaseResponse, MCell } from "../../types/mondayTypes";


interface MItemWithCells {
    items: {
        id: string;
        name: string;
        column_values: MCell[]
    }[]
}

export type GetCellsByItemWithCells = BaseResponse<MItemWithCells>;

