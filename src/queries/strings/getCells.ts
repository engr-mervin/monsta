export const GET_CELLS_BY_ITEM_LEVEL_CELL = `
    query($boardId: [ID!], $groupId: [String!], $itemId: [String!] $cellId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
                id
                title
                items_page(ids: $itemId) {
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

export const GET_CELLS_BY_ITEM_LEVEL_CELL_ALL = `
    query($boardId: [ID!], $groupId: [String!], $itemId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
                id
                title
                items_page(ids: $itemId) {
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
