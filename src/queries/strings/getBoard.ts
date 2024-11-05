export const GET_BOARD_LEVEL_BOARD = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        name
      }
    }`;

export const GET_BOARD_LEVEL_GROUP = `
query($boardId: [ID!]){
  boards(ids: $boardId) {
    id
    name
    groups {
      id
      title
    }
  }
}`;

export const GET_BOARD_LEVEL_ITEM_NO_SUBITEM = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
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
export const GET_BOARD_LEVEL_ITEM_SUBITEM_ITEM = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
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
    }`;

export const GET_BOARD_LEVEL_ITEM_SUBITEM_CELL = `
    query($boardId: [ID!] $subitemCellId: [String!]){
      boards(ids: $boardId) {
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
    }`;

export const GET_BOARD_LEVEL_ITEM_SUBITEM_CELL_ALL = `
query($boardId: [ID!]){
  boards(ids: $boardId) {
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
}`;

export const GET_BOARD_LEVEL_CELL_NO_SUBITEM = `
    query($boardId: [ID!], $cellId: [String!]){
      boards(ids: $boardId) {
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
    }`;

export const GET_BOARD_LEVEL_CELL_ALL_NO_SUBITEM = `
query($boardId: [ID!]){
  boards(ids: $boardId) {
    id
    name
    groups {
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

export const GET_BOARD_LEVEL_CELL_SUBITEM_ITEM = `
    query($boardId: [ID!], $cellId: [String!]){
      boards(ids: $boardId) {
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

export const GET_BOARD_LEVEL_CELL_ALL_SUBITEM_ITEM = `
query($boardId: [ID!){
  boards(ids: $boardId) {
    id
    name
    groups {
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

//col, subcol
export const GET_BOARD_LEVEL_CELL_SUBITEM_CELL = `
    query($boardId: [ID!], $cellId: [String!], $subitemCellId: [String!]){
      boards(ids: $boardId) {
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
                        subitems{
                          board {
                              id
                          }
                          group {
                              id
                          }
                          id
                          name
                          column_values(ids: $subitemCellId){
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

//all col, no subcol
export const GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL = 
`query($boardId: [ID!], $subitemCellId: [String!]){
  boards(ids: $boardId) {
    id
    name
    groups {
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
                    subitems{
                      board {
                          id
                      }
                      group {
                          id
                      }
                      id
                      name
                      column_values(ids: $subitemCellId){
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
}`

//no col, all subcol
export const GET_BOARD_LEVEL_CELL_SUBITEM_CELL_ALL = `
query($boardId: [ID!], $cellId: [String!]){
  boards(ids: $boardId) {
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
                    subitems{
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
                }
            }
        }
  }
}`;

//all col, all subcol
export const GET_BOARD_LEVEL_CELL_ALL_SUBITEM_CELL_ALL = `
    query($boardId: [ID!]){
      boards(ids: $boardId) {
        id
        name
        groups {
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
                        subitems{
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
                    }
                }
            }
      }
    }`;