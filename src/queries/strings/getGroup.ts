export const GET_GROUP_LEVEL_GROUP = `
    query($boardId: [ID!], $groupId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
                id
                title
            }
        }
    }`;

export const GET_GROUP_LEVEL_ITEM_NO_SUBITEM = `
    query($boardId: [ID!], $groupId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
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

export const GET_GROUP_LEVEL_ITEM_SUBITEM_ITEM = `
    query($boardId: [ID!], $groupId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
                id
                title
                items_page {
                    items {
                        id
                        name
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
                    }
                }
            }
        }
    }`;

export const GET_GROUP_LEVEL_ITEM_SUBITEM_CELL = `
    query($boardId: [ID!], $groupId: [String!], $subitemCell: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
                id
                title
                items_page {
                    items {
                        id
                        name
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
                    }
                }
            }
        }
    }`;
export const GET_GROUP_LEVEL_ITEM_SUBITEM_CELL_ALL = `
    query($boardId: [ID!], $groupId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
                id
                title
                items_page {
                    items {
                        id
                        name
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
            }
        }
    }`;

export const GET_GROUP_LEVEL_CELL_NO_SUBITEM = `
    query($boardId: [ID!], $groupId: [String!], $cellId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
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

export const GET_GROUP_LEVEL_CELL_ALL_NO_SUBITEM = `
    query($boardId: [ID!], $groupId: [String!]){
        boards(ids: $boardId) {
            id
            groups(ids: $groupId) {
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

export const GET_GROUP_LEVEL_CELL_SUBITEM_ITEM = `
query($boardId: [ID!], $groupId: [String!], $cellId: [String!]){
    boards(ids: $boardId) {
        id
        groups(ids: $groupId) {
            id
            title
            items_page {
                items {
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

export const GET_GROUP_LEVEL_CELL_ALL_SUBITEM_ITEM = `
query($boardId: [ID!], $groupId: [String!]){
    boards(ids: $boardId) {
        id
        groups(ids: $groupId) {
            id
            title
            items_page {
                items {
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

export const GET_GROUP_LEVEL_CELL_SUBITEM_CELL = `
query($boardId: [ID!], $groupId: [String!], $cellId: [String!], $subitemCellId: [String!]){
    boards(ids: $boardId) {
        id
        groups(ids: $groupId) {
            id
            title
            items_page {
                items {
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

export const GET_GROUP_LEVEL_CELL_ALL_SUBITEM_CELL = `
query($boardId: [ID!], $groupId: [String!], $subitemCellId: [String!]){
    boards(ids: $boardId) {
        id
        groups(ids: $groupId) {
            id
            title
            items_page {
                items {
                    subitems {
                        board {
                            id
                        }
                        group {
                            id
                        }
                        id
                        name
                        column_values (ids: $subitemCellId){
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


export const GET_GROUP_LEVEL_CELL_SUBITEM_CELL_ALL = `
query($boardId: [ID!], $groupId: [String!], $cellId: [String!]){
    boards(ids: $boardId) {
        id
        groups(ids: $groupId) {
            id
            title
            items_page {
                items {
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

export const GET_GROUP_LEVEL_CELL_ALL_SUBITEM_CELL_ALL = `
query($boardId: [ID!], $groupId: [String!]){
    boards(ids: $boardId) {
        id
        groups(ids: $groupId) {
            id
            title
            items_page {
                items {
                    subitems {
                        board {
                            id
                        }
                        group {
                            id
                        }
                        id
                        name
                        column_values{
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
