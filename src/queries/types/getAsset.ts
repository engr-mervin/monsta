export interface GET_ASSET_TYPE {
  data: {
    assets: {
      public_url: string;
      name: string;
      id: string;
      file_size: number;
    }[];
  };
  account_id: number;
}
