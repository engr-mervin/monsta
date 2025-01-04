export const WRITE_UPDATE = `mutation ($itemId: ID, $update: String!){
    create_update (item_id: $itemId, body:  $update) {
        id
    }
}`;
