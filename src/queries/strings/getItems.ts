export const GET_ITEMS_BY_GROUP_LEVEL_ITEM = `
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

export const GET_ITEMS_BY_GROUP_LEVEL_CELL = `
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

export const GET_ITEMS_BY_GROUP_LEVEL_CELL_ALL = `
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
