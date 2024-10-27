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
  column: {
    title: string;
  };
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
export interface MBoard {
  boards: [
    { 
      id: string; 
      name: string 
    }
  ];
}
export interface MBoardWithGroups {
  boards: [
    {
      id: string;
      name: string;
      groups: MGroup[];
    }
  ];
}

export interface MBoardWithGroupsWithItems {
  boards: [
    {
      id: string;
      name: string;
      groups: MGroupWithItems[];
    }
  ];
}

export interface MBoardWithGroupsWithItemsWithCells {
  boards: [
    {
      id: string;
      name: string;
      groups: MGroupWithItemsWithCells[];
    }
  ];
}

export type BaseResponse<T> = {
  data: T;
  account_id: number;
};
