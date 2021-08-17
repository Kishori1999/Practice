import { Document, Model } from 'mongoose';

export interface TokenRewardDistribution {
  sumStart: number,
  reward: number
}

export interface AllocatedOrderDomain {
  transactionHash: string;
  blockNumber: number;
  owner: string;
  order: number[];
  orderPrice: number;
  prevTotalOrderSum?: number;
  firstDiceRoll: number;
  secondDiceRoll?: number | null;
  error?: string | null;
  assetsCreatedAt?: Date;
  tokenReward?: number;
  tokenRewardDistributions?: TokenRewardDistribution[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AllocatedOrderModel extends Model<AllocatedOrderDocument> {
  createOrFindOneByTransactionHash(
    blockNumber: number,
    transactionHash: string,
    data: Partial<Omit<AllocatedOrderDocument, 'blockNumber' | 'transactionHash'>>,
  ): Promise<boolean>;

  getOrderPriceSum(): Promise<number>;

  getCustomer(address: string, currentSum: number): Promise<Customer | null>;
  getCustomers(currentSum: number): Promise<Customer[]>;
}

export interface AllocatedOrderDocument extends AllocatedOrderDomain, Document {
}

export interface AllocatedOrderResource extends AllocatedOrderDomain {
  _id: string;
}

export interface Customer {
  address: string;
  orderPriceTotal: number;
}
