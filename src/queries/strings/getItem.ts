export const GET_ITEM_LEVEL_ITEM_NO_SUBITEM = `
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
export const GET_ITEM_LEVEL_ITEM_SUBITEM_ITEM = `
    query($itemId: [ID!] $cellId: [String!]){
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
            }
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
export const GET_ITEM_LEVEL_ITEM_SUBITEM_CELL = `
    query($itemId: [ID!], $cellId: [String!], $subitemCellId: [String!]){
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
                column_values(ids: $subitemCellId) {
                    column {
                        title
                    }
                    id
                    value
                    text
                    type
                }
            }
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
export const GET_ITEM_LEVEL_ITEM_SUBITEM_CELL_ALL = `
    query($itemId: [ID!], $cellId: [String!]){
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

export const GET_ITEM_LEVEL_CELL_NO_SUBITEM = `
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

export const GET_ITEM_LEVEL_CELL_ALL_NO_SUBITEM = `
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

export const GET_ITEM_LEVEL_CELL_SUBITEM_ITEM = `
query($itemId: [ID!], $cellId: [String!]){
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
        }
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

export const GET_ITEM_LEVEL_CELL_ALL_SUBITEM_ITEM = `
query($itemId: [ID!]){
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
        }
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

export const GET_ITEM_LEVEL_CELL_SUBITEM_CELL = `
query($itemId: [ID!], $cellId: [String!], $subitemCellId: [String!]){
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
            column_values(ids: $subitemCellId) {
                column {
                    title
                }
                id
                value
                text
                type
            }
        }
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

export const GET_ITEM_LEVEL_CELL_ALL_SUBITEM_CELL = `
query($itemId: [ID!], $subitemCellId: [String!]){
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
            column_values(ids: $subitemCellId) {
                column {
                    title
                }
                id
                value
                text
                type
            }
        }
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
export const GET_ITEM_LEVEL_CELL_SUBITEM_CELL_ALL = `
query($itemId: [ID!], $cellId: [String!]){
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
            column_values(ids: $subitemCellId) {
                column {
                    title
                }
                id
                value
                text
                type
            }
        }
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

export const GET_ITEM_LEVEL_CELL_ALL_SUBITEM_CELL_ALL = `
query($itemId: [ID!]){
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
            column_values(ids: $subitemCellId) {
                column {
                    title
                }
                id
                value
                text
                type
            }
        }
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
