import { Server } from 'http';
import { ActionOptions, Controller as RestifizerController, Scope as RestifizerScope } from 'restifizer';
import { Controller as ControlizerController } from 'controlizer';
import { Document, Model } from 'mongoose';
import { Application } from 'express';
import { Config } from 'config/env/all';
import { Agenda } from 'agenda';
import { Consts } from '../lib/consts';
import { StorageModel } from './storage';
import { AllocatedOrderModel } from './allocatedOrder';
import { AssetModel } from './asset';
import { StockModel } from './stock';
import { NftContractModel } from './nftContract';
import { NftContractRangeModel } from './nftContractRange';

export interface ExtendedActionOptions extends ActionOptions {
}

export interface Scope<M = any> extends RestifizerScope<M> {
}

export type MiddlewareBuilder = (expressApp: Application, app: App) => void;

export interface App {
  init(): Promise<void>;
  registerProvider<T>(name: string, provider: T | (() => T)): T;
  agenda: Agenda & { jobNames: Record<string, string> },
  apiControllers: (typeof ControlizerController)[];
  config: Config;
  consts: Consts;
  // TODO: Extend
  createLog: (module: NodeModule) => Console;
  httpServer: Server;
  expressApp: Application;
  middlewares: MiddlewareBuilder[]
  modelProvider: {
    AllocatedOrder: AllocatedOrderModel,
    Asset: AssetModel,
    Migration: Model<Document>,
    NftContract: NftContractModel,
    NftContractRange: NftContractRangeModel,
    Stock: StockModel,
    Storage: StorageModel,
  },
  restControllers: (typeof RestifizerController)[];
  [key: string]: any;
}
