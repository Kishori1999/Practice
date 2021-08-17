import app from 'app';
import { Contract, getDefaultProvider } from 'ethers';

const {
  config: {
    contracts: {
      GuildOfGuardiansPreSale: {
        abi: contractInterface,
        address: contractAddress,
      },
    },
    networkUrl,
  },
} = app;

class EthNetworkService {
  private _provider?: ReturnType<typeof getDefaultProvider>;

  private _guildOfGuardiansPreSaleContract?: Contract;

  get guildOfGuardiansPreSaleContract() {
    if (!this._guildOfGuardiansPreSaleContract) {
      this._guildOfGuardiansPreSaleContract = new Contract(
        contractAddress,
        contractInterface,
        this.provider,
      );
    }
    return this._guildOfGuardiansPreSaleContract;
  }

  get provider() {
    if (!this._provider) {
      this._provider = getDefaultProvider(networkUrl);
    }
    return this._provider;
  }
}

export default new EthNetworkService();
