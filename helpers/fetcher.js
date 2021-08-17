import axios from "axios";
import { AssetCategory, backendUrl } from "../constants";

export async function fetchMetadata() {
  try {
    const { data: metadata } = await axios.get(`${backendUrl}/api/metadata`);
    return metadata;
  } catch (err) {
    return {
      [AssetCategory.Hero]: [],
      [AssetCategory.Pet]: [],
      [AssetCategory.Token]: [],
    };
  }
}
