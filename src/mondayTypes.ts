interface Group {
  id: string;
  title: string;
}

interface Cell {
  id: string;
  value: string;
  text: string | null;
  type: string;
}

interface Row {
  id: string;
  name: string;
  column_values?: Cell[];
}
interface GroupWithRow {
  id: string;
  title: string;
  items_page?: {
    items: Row[];
  };
}

export interface BoardsGroups {
  boards: [
    {
      id: string;
      groups: Group[];
    }
  ];
}

export interface GroupRows {
  boards: [
    {
      id: string;
      groups: GroupWithRow[];
    }
  ];
}

export type GetGroupsByBoard = BaseResponse<BoardsGroups>;
export type GetRowsByGroup = BaseResponse<GroupRows>;

export type BaseResponse<T> = {
  data: T;
  account_id: number;
};
