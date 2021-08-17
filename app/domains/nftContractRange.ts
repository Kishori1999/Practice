import { Document, FilterQuery, Model } from 'mongoose';

export interface NftContractRangeDomain {
  nftContract: string;
  /**
   * Inclusive
   */
  probabilityFrom: number;
  /**
   * Exclusive
   */
  probabilityTo: number;
  serialNumbers: number[];
}

interface Range {
  probability: number;
  serialNumberFrom: number;
  amount: number;
}

export interface NftContractRangeBatch {
  contractAddress: string;
  ranges: Range[];
}

export interface NftContractRangeModel extends Model<NftContractRangeDocument> {
  popSerialNumber(
    contractAddress: string,
    probability: number,
  ): Promise<number>;

  findOneAndPopSerialNumber(
    filter: FilterQuery<NftContractRangeDocument>,
  ): Promise<NftContractRangeDocument|null>;

  /**
   * Iterates over all not empty ranges, and trying to pop serialNumber.
   * @param nftContractId ID if nft contract to filter by.
   * @return found record, or null if not found
   */
  lookForAlternativeAndPopSerialNumber(
    nftContractId: string,
  ): Promise<NftContractRangeDocument|null>;

  generateBatch(
    nftContractRangeBatch: NftContractRangeBatch,
  ): Promise<void>;
}

export interface NftContractRangeDocument extends NftContractRangeDomain, Document {
}

export interface NftContractRangeResource extends NftContractRangeDomain {
  _id: string;
}
