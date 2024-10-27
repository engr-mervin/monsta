export const GET_CELLS_BY_ITEM_LEVEL_CELL = `
    query($itemId: [String!] $cellId: [String!]){
        items (ids: $itemId) {
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
    }`;

export const GET_CELLS_BY_ITEM_LEVEL_CELL_ALL = `
    query($itemId: [String!]){
        items (ids: $itemId) {
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
    }`;
