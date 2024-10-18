export const GET_GROUPS_BY_BOARD_LEVEL_GROUP = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        groups {
          id
          title
        }
      }
    }`;

export const GET_GROUPS_BY_BOARD_LEVEL_ITEM = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        groups {
            id
            title
            items_page {
                items {
                    id
                    name
                }
            }
        }
      }
    }`;

export const GET_GROUPS_BY_BOARD_LEVEL_CELL = `
    query($boardId: [ID!], $cellId: [String!]){
      boards(ids: $boardId) {
        id
        groups {
                id
                title
                items_page {
                    items {
                        id
                        name
                        column_values(ids: $cellId) {
                            id
                            value
                            text
                            type
                        }
                    }
                }
            }
      }
    }`;

export const GET_GROUPS_BY_BOARD_LEVEL_CELL_ALL = `
query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        groups {
                id
                title
                items_page {
                    items {
                        id
                        name
                        column_values {
                            id
                            value
                            text
                            type
                        }
                    }
                }
            }
      }
    }`;
