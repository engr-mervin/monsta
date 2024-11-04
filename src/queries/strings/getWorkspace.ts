export const GET_WORKSPACE_LEVEL_WORKSPACE = `
    query($workspaceId: [ID!]){
      workspaces(ids: $workspaceId){
        id
        name
      }
    }`;

export const GET_WORKSPACE_LEVEL_BOARD = `
  query($workspaceId: [ID!]){
    workspaces(ids: $workspaceId){
      id
      name
    }
    boards(workspace_ids: $workspaceId) {
      id
      name
    }
  }`;

export const GET_WORKSPACE_LEVEL_GROUP = `
    query($workspaceId: [ID!]){
      workspaces(ids: $workspaceId){
        id
        name
      }
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

export const GET_WORKSPACE_LEVEL_ITEM = `
    query($workspaceId: [ID!]){
      workspaces(ids: $workspaceId){
        id
        name
      }
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

export const GET_WORKSPACE_LEVEL_CELL = `
    query($workspaceId: [ID!]){
      workspaces(ids: $workspaceId){
        id
        name
      }
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
