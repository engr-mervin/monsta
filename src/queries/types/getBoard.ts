export interface GET_BOARD_TYPE {
  data: {
    boards: {
      id: string;
      name: string;
      groups?: {
        id: string;
        title: string;
        items_page?: {
          items: {
            id: string;
            name: string;
            subitems?: {
              id: string;
              board: {
                id: string;
              };
              group: {
                id: string;
              };
              name: string;
              column_values?: {
                column: {
                  title: string;
                };
                id: string;
                value: string;
                text: string | null;
                type: string;
              }[];
            }[];
            column_values?: {
              column: {
                title: string;
              };
              id: string;
              value: string;
              text: string | null;
              type: string;
            }[];
          }[];
        };
      }[];
      columns?: {
        id: string,
        title: string,
        type: string
      }[]
    }[];
  };
  account_id: number;
}
