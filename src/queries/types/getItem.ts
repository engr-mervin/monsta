export interface GET_ITEM_TYPE {
  data: {
    items: {
      id: string;
      name: string;
      board: {
        id: string;
      }
      group: {
        id: string;
      };
      column_values?: {
        column: {
          title: string;
        };
        id: string;
        text: null | string;
        type: string;
        value: string;
      }[];
      subitems?: {
        id: string;
        name: string;
        board: {
          id: string;
        };
        group: {
          id: string;
        };
        column_values?: {
          column: {
            title: string;
          };
          id: string;
          text: null | string;
          type: string;
          value: string;
        }[];
      }[];
    }[];
  };
  account_id: number;
}
