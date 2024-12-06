export interface GET_WORKSPACE_TYPE {
  data: {
    workspaces: {
      id: string;
      name: string;
    }[];
    boards?: {
      id: string;
      name: string;
      items_page?: {
        items: {
          id: string;
          name: string;
          group: {
            id: string;
          }
          column_values?: {
            column: {
              title: string
            }
            id: string;
            text: null | string;
            type: string;
            value: string;
          }[]
          subitems?: {
            id: string;
            name: string;
            board: {
              id: string;
            }
            group: {
              id: string;
            }
            column_values?: {
              column: {
                title: string
              }
              id: string;
              text: null | string;
              type: string;
              value: string;
            }[]
          }[]
        }[]
      }
      groups?: {
        id: string;
        title: string;
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