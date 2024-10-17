export const GET_ITEM_BY_GROUP_LEVEL_ITEM = `
    query($id: [ID!], $groupId: [String!]){
        boards(ids: $id) {
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

export const GET_ITEM_BY_GROUP_LEVEL_CELL = `
    query($id: [ID!], $groupId: [String!]){
        boards(ids: $id) {
            id
            groups(ids: $groupId) {
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
