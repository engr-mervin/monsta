export const GET_SUBITEMS_BY_ITEM_LEVEL_SUBITEM = `
    query ($itemId: [ID!]) {
        items (ids: $itemId) {
            subitems {
                board {
                    id
                }
                group {
                    id
                }
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
`;

export const GET_SUBITEMS_BY_ITEM_LEVEL_CELL_ALL = `
    query ($itemId: [ID!]) {
        items (ids: $itemId) {
            subitems {
                board {
                    id
                }
                group {
                    id
                }
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
`;

export const GET_SUBITEMS_BY_ITEM_LEVEL_CELL = `
    query ($itemId: [ID!], $cellId: [String!]) {
        items (ids: $itemId) {
            subitems {
                board {
                    id
                }
                group {
                    id
                }
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
`;