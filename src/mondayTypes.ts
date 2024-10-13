interface Group {
  id: string;
  title: string;
}

export interface BoardsGroups {
  boards: [
    {
      id: string;
      groups: Group[];
    }
  ];
}

export type GetGroupsByBoard = BaseResponse<BoardsGroups>;

export type BaseResponse<T> = {
  data: T;
  account_id: number;
};
