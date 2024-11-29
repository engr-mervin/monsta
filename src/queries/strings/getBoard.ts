export const GET_BOARD = `
  query($boardId: [ID!], $includeGroups: Boolean!, $includeItems: Boolean!,
  $includeColumns: Boolean!, $cellId: [String!], $subitemCellId: [String!],
  $includeCells: Boolean!, $includeSubitems: Boolean!, $includeSubitemCells: Boolean!){
    boards(ids: $boardId) {
      id
      name
      groups @include(if: $includeGroups){
        id
        title
        items_page @include(if: $includeItems) {
          items {
            id
            name
            column_values(ids: $cellId) @include(if: $includeCells){
              column {
                title
              }
              id
              value
              text
              type
            }
            subitems @include(if: $includeSubitems){
              board {
                columns @include(if: $includeSubitemColumns) {
                  id
                  title
                  type
                }
                id
              }
              group {
                id
              }
              id
              name
              column_values(ids: $subitemCellId) @include(if: $includeSubitemCells) {
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
      columns @include(if: $includeColumns) {
        id
        title
        type
      }
    }
  }`;