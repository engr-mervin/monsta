export const GET_ASSET = `
    query($assetID: [ID!]!){
        assets(ids: $assetId){
            public_url
            name
            id
            file_size
        }
    }`;
