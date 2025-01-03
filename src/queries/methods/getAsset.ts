import { Asset } from "../../classes/Asset";
import { executeGraphQLQuery } from "../../services/mondayService";
import { ClientOptions, RequestOptions } from "../../types/types";
import { GET_ASSET } from "../strings/getAsset";
import { GET_ASSET_TYPE } from "../types/getAsset";

export async function getAsset(
  clientOptions: ClientOptions,
  assetId: string | number,
  requestOptions: RequestOptions = {}
) {
  const query = GET_ASSET;

  const variables = {
    assetId,
  };

  const result = await executeGraphQLQuery<GET_ASSET_TYPE>(
    clientOptions,
    requestOptions,
    query,
    variables
  );

  const asset = result.data.assets[0];

  if (!asset) {
    return null;
  }

  return new Asset(asset.public_url, asset.name, asset.id, asset.file_size);
}
