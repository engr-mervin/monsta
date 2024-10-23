export const GET_BOARDS_BY_WORKSPACE_LEVEL_BOARD = `
    query($workspaceId: [ID!]){
      boards(workspace_ids: $workspaceId) {
        id
        name
      }
    }`;

export const GET_BOARDS_BY_WORKSPACE_LEVEL_GROUP = `
    query($workspaceId: [ID!]){
      boards(workspace_ids: $workspaceId) {
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

export const GET_BOARDS_BY_WORKSPACE_LEVEL_ITEM = `
    query($workspaceId: [ID!]){
      boards(workspace_ids: $workspaceId) {
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
      }
    }`;

export const GET_BOARDS_BY_WORKSPACE_LEVEL_CELL = `
    query($workspaceId: [ID!]){
      boards(workspace_ids: $workspaceId) {
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
      }
    }`;
