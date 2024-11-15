export const GET_USER = `query($userId: [ID!]) {
    users (ids: $userId) {
        email
        name
        id
        account {
            name
            id
        }
    }
}`;
