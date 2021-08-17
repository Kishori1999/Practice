import { utils } from 'ethers';
import { ChromaValues, ProductValues, RarityValues } from '../../app/domains/asset';

export = (seed: number) => ({
  transactionHash: utils.id(`${seed}`),
  indexInOrder: seed,
  internal: {
    potentialMythic: false,
  },
  product: ProductValues[seed % ProductValues.length],
  rarity: RarityValues[seed % RarityValues.length],
  type: seed,
  chroma: ChromaValues[seed % ChromaValues.length],
});
