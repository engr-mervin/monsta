//GROUP
export interface BaseGroup<I = undefined> {
  id: string;
  title: string;
  items_page: {
    items: I;
  };
}

//WORKSPACE
export interface BaseWorkspace {
  id: string;
  name: string;
}

export interface BaseCell {
  column: {
    title: string;
  };
  id: string;
  value: string;
  text: string | null;
  type: string;
}

//ITEM
export interface BaseItem<C = undefined> {
  id: string;
  name: string;
  column_values: C;
}

export interface BaseItemWithSubitem<C = undefined, D = undefined> {
  subitems: D;
  id: string;
  name: string;
  column_values: C;
}
export interface ItemWithParentIDs<C = undefined> {
  id: string;
  board: {
    id: string;
  };
  group: {
    id: string;
  };
  name: string;
  column_values: C;
}

export interface ItemWithSubitemsAndParentIDs<C = undefined, D = undefined> {
  id: string;
  board: {
    id: string;
  };
  group: {
    id: string;
  };
  name: string;
  column_values: C;
  subitems: D;
}

//BOARD
export interface BaseBoard<G = undefined> {
  id: string;
  name: string;
  groups: G;
}

export type BaseResponse<D> = {
  data: D;
  account_id: number;
};

//USER
export type BaseUser = {
  email: string;
  name: string;
  id: string;
  account: {
    name: string;
    id: string;
  };
};
