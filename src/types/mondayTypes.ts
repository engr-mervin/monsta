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
