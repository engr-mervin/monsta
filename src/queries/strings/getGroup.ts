export const GET_GROUP = `
  query($boardId: [ID!], $groupId: [String!], $includeGroups: Boolean!, $includeItems: Boolean!,
  $includeColumns: Boolean!, $cellId: [String!], $subitemCellId: [String!],
  $includeCells: Boolean!, $includeSubitems: Boolean!, $includeSubitemCells: Boolean!) {
    boards(ids: $boardId) {
      id
      name
      items_page @include(if: $includeItems) {
        items {
          id
          name
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
      groups(ids: $groupId) @include(if: $includeGroups) {
        id
        title
      }
      columns @include(if: $includeColumns) {
        id
        title
        type
      }
    }
  }`;