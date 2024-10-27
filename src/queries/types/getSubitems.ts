import { BaseResponse, MItem, MItemWithCells } from "../../types/mondayTypes";


interface MSubitems {
    items: {
        board: {
            id: string;
        }
        group: {
            id: string;
        }
        subitems: MItem[];
    }[];
}

interface MSubitemsWithCells {
    items: {
        board: {
            id: string;
        }
        group: {
            id: string;
        }
        subitems: MItemWithCells[];
    }[];
}
export type GetSubitemsByItem = BaseResponse<MSubitems>;
export type GetSubitemsByItemWithCells = BaseResponse<MSubitemsWithCells>;

