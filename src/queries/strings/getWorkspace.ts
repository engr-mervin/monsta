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

export const GET_WORKSPACE_LEVEL_ITEM_NO_SUBITEM = `query($workspaceId: [ID!]){
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

export const GET_WORKSPACE_LEVEL_ITEM_SUBITEM_ITEM = `query($workspaceId: [ID!]){
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
                  }
              }
          }
      }
    }
  }`;

export const GET_WORKSPACE_LEVEL_ITEM_SUBITEM_CELL = `query($workspaceId: [ID!] $subitemCellId [String!]){
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
                          subitems {
                            board {
                                id
                            }
                            group {
                                id
                            }
                            id
                            name
                            column_values (ids: $subitemCellId) {
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
                      }
                  }
              }
          }
        }
      }`;

export const GET_WORKSPACE_LEVEL_ITEM_SUBITEM_CELL_ALL = `query($workspaceId: [ID!]){
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
                      }
                  }
              }
          }
        }
      }`;

export const GET_WORKSPACE_LEVEL_CELL_NO_SUBITEM = `query($workspaceId: [ID!] $cellId: [String!]){
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

export const GET_WORKSPACE_LEVEL_CELL_ALL_NO_SUBITEM = `query($workspaceId: [ID!] $cellId: [String!]){
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

export const GET_WORKSPACE_LEVEL_CELL_SUBITEM_ITEM = `query($workspaceId: [ID!] $cellId: [String!]){
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
  }
}`;

export const GET_WORKSPACE_LEVEL_CELL_ALL_SUBITEM_ITEM = `query($workspaceId: [ID!]){
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
            }
        }
    }
  }
}`;

//col, subcol
export const GET_WORKSPACE_LEVEL_CELL_SUBITEM_CELL = `query($workspaceId: [ID!] $cellId:[String!] $subitemCellId: [String!]){
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
                        subitems {
                          board {
                              id
                          }
                          group {
                              id
                          }
                          id
                          name
                          column_values (ids: $subitemCellId) {
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
      }
    }`;

//ALL col, subcol
export const GET_WORKSPACE_LEVEL_CELL_ALL_SUBITEM_CELL = `query($workspaceId: [ID!] $subitemCellId: [String!]){
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
                        subitems {
                          board {
                              id
                          }
                          group {
                              id
                          }
                          id
                          name
                          column_values (ids: $subitemCellId) {
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
      }
    }`;

//col, ALL subcol
export const GET_WORKSPACE_LEVEL_CELL_SUBITEM_CELL_ALL = `query($workspaceId: [ID!] $cellId: [String!]){
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
                  column_values (ids: $cellId){
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

//ALL col, All subcol
export const GET_WORKSPACE_LEVEL_CELL_ALL_SUBITEM_CELL_ALL = `query($workspaceId: [ID!]){
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
