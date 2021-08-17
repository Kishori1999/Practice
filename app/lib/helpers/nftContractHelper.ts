import _ from 'lodash';
import { NftContractRangeBatch } from '../../domains/nftContractRange';

type Edge = [from: number, to: number];

/**
 * The batches should contain full set of probabilities for the contract. There are 2 rules:
 * 1. Sum of probabilities should be equal 1.
 * 2. Serial numbers should not overlap among different ranges.
 * @param nftContractRangeBatch batch for validating
 */
export function validateBatch(nftContractRangeBatch: NftContractRangeBatch) {
  const { ranges } = nftContractRangeBatch;
  const probabilitySum = _.sumBy(ranges, 'probability');
  if (probabilitySum !== 1) {
    throw new Error('Sum of probabilities should be 1');
  }
  const serialNumberEdges: Edge[] = [];
  /*
    c1 - start of current
    c2 - end of current
    e1 - start of existing
    e2 - end of existing
   */
  ranges.forEach(({ serialNumberFrom: c1, amount }) => {
    const c2 = c1 + amount - 1;
    serialNumberEdges.forEach(([e1, e2]) => {
      if (c1 <= e1 && e1 <= c2) {
        throw new Error('e1 intersects');
      }
      if (c1 <= e2 && e2 <= c2) {
        throw new Error('e2 intersects');
      }
      if (e1 <= c1 && c1 <= e2) {
        throw new Error('c1 intersects');
      }
      if (e1 <= c2 && c2 <= e2) {
        throw new Error('c2 intersects');
      }
    });
    serialNumberEdges.push([c1, c2]);
  });
}
