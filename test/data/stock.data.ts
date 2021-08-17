import { ProductValues } from '../../app/domains/asset';

export = (seed: number) => ({
  product: ProductValues[seed % ProductValues.length],
  firstUsdPrice: seed,
  lastUsdPrice: seed,
  usdPrice: seed,
  availableAmount: seed,
  originalAmount: seed,
});
