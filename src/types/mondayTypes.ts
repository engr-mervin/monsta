//GROUP
interface MGroup {
  id: string;
  title: string;
}


interface MGroupWithItems {
  id: string;
  title: string;
  items_page: {
    items: MItem[];
  };
}

interface MGroupWithItemsWithCells {
  id: string;
  title: string;
  items_page: {
    items: MItemWithCells[];
  };
}


export interface MCell {
  id: string;
  value: string;
  text: string | null;
  type: string;
}

//ITEM
export interface MItem {
  id: string;
  name: string;
}


export interface MItemWithCells {
  id: string;
  name: string;
  column_values: MCell[];
}

//BOARD
interface MBoardWithGroups {
  boards: [
    {
      id: string;
      groups: MGroup[];
    }
  ];
}

interface MBoardWithGroupsWithItems {
  boards: [
    {
      id: string;
      groups: MGroupWithItems[];
    }
  ];
}

export interface MBoardWithGroupsWithItemsWithCells {
  boards: [
    {
      id: string;
      groups: MGroupWithItemsWithCells[];
    }
  ];
}

export type GetGroupsByBoard = BaseResponse<MBoardWithGroups>;
export type GetGroupsByBoardWithItems = BaseResponse<MBoardWithGroupsWithItems>;
export type GetGroupsByBoardWithItemsWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;

export type GetItemsByGroup = BaseResponse<MBoardWithGroupsWithItems>;
export type GetItemsByGroupWithCells = BaseResponse<MBoardWithGroupsWithItemsWithCells>;

export type BaseResponse<T> = {
  data: T;
  account_id: number;
};
