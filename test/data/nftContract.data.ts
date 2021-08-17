import { AssetCategoryValues } from '../../app/domains/asset';

export = (seed: number) => ({
  assetCategory: AssetCategoryValues[seed % AssetCategoryValues.length],
  metadataId: seed,
  contractAddress: `${seed}`,
});
