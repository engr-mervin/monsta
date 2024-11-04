export const GET_ITEM_LEVEL_ITEM = `
    query($itemId: [ID!] $cellId: [String!]){
        items (ids: $itemId) {
            id
            name
            group {
                id
            }
            board {
                id
            }
        }
    }`;

export const GET_ITEM_LEVEL_CELL = `
    query($itemId: [ID!] $cellId: [String!]){
        items (ids: $itemId) {
            id
            name
            group {
                id
            }
            board {
                id
            }
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

export const GET_ITEM_LEVEL_CELL_ALL = `
    query($itemId: [ID!]){
        items (ids: $itemId) {
            id
            name
            group {
                id
            }
            board {
                id
            }
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
