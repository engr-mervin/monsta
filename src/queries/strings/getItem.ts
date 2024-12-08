export const GET_ITEM = `
query ($itemId: [ID!], $cellId: [String!], $subitemCellId: [String!], $includeCells: Boolean!, $includeSubitems: Boolean!, $includeSubitemCells: Boolean!) {
  items(ids: $itemId) {
    id
    name
    board {
      id
    }
    group {
      id
    }
    column_values(ids: $cellId) @include(if: $includeCells) {
      column {
        title
      }
      text
      type
      value
      id
    }
    subitems @include(if: $includeSubitems) {
      id
      name
      board {
        id
      }
      group {
        id
      }
      column_values(ids: $subitemCellId) @include(if: $includeSubitemCells) {
        column {
          title
        }
        text
        type
        value
        id
      }
    }
  }
}
`;