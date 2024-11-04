export const GET_BOARD_LEVEL_BOARD = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        name
      }
    }`;

export const GET_BOARD_LEVEL_GROUP = `
query($boardId: [ID!]){
  boards(ids: $boardId) {
    id
    name
    groups {
      id
      title
    }
  }
}`;

export const GET_BOARD_LEVEL_ITEM = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        name
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

export const GET_BOARD_LEVEL_CELL = `
    query($boardId: [ID!], $cellId: [String!]){
      boards(ids: $boardId) {
        id
        name
        groups {
                id
                title
                items_page {
                    items {
                        id
                        name
                        column_values(ids: $cellId) {
                            column {
                                title
                            }
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

export const GET_BOARD_LEVEL_CELL_ALL = `
query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        name
        groups {
                id
                title
                items_page {
                    items {
                        id
                        name
                        column_values {
                            column {
                                title
                            }
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
