import HTTP_STATUSES from 'http-statuses';
import { Scope } from 'controlizer';
import app from 'app';
import BaseController from 'app/lib/base.controlizer.controller';
import { getMetadata } from 'app/metadataProvider';
import { AssetCategory, AssetDocument, getAssetCategory } from '../../domains/asset';
import { NftResource } from '../../domains/nft';
import { HeroMetadataResource, OneOfMetadata, OneOfMetadataResource } from '../../domains/metadata';
import { getHeroAnimationUrl, getPetAnimationUrl } from '../../lib/helpers/contentHelper';

const {
  modelProvider: {
    Asset,
  },
} = app;

/**
 * @apiGroup Nft
 * @apiName GetOneNft
 * @api {get} /api/nfts/:contract_address/:tokenId Get Metadata for specific asset
 * @apiDescription Returns object of metadata.
 *
 * @apiSuccess {String} tokenId
 * @apiSuccess {Number} rarity
 * @apiSuccess {Number} chroma
 * @apiSuccess {Number} assetCategory
 * @apiSuccess {Number} id
 * @apiSuccess {String} name
 * @apiSuccess {String} tagline
 * @apiSuccess {String} faction
 * @apiSuccess {String} class
 * @apiSuccess {String} element
 */
class NftController extends BaseController {
  constructor(options = {}) {
    Object.assign(options, {
      path: '/api/nfts',
      actions: {
        getOneNft: BaseController.createAction({
          method: 'get',
          path: ':contractAddress/:tokenId',
        }),
      },
    });
    super(options);
  }

  async getOneNft(scope: Scope): Promise<NftResource> {
    const { params: { contractAddress, tokenId } } = scope;
    const asset = await Asset.findOne({
      'nft.contractAddress': contractAddress,
      'nft.tokenId': tokenId,
    });
    if (!asset) {
      throw HTTP_STATUSES.NOT_FOUND.createError('Asset not found');
    }
    const assetCategory = getAssetCategory(asset.product);
    const metadataItem = <HeroMetadataResource>getMetadata(assetCategory, asset);
    if (!metadataItem) {
      throw HTTP_STATUSES.NOT_FOUND.createError('Metadata not found');
    }
    const metadataResource = this.createMetadataResource(assetCategory, metadataItem, asset);
    const { id, ...restMetadataResource } = metadataResource;
    return {
      ...restMetadataResource,
      tokenId,
      contractAddress,
      assetCategory,
      assetId: asset._id,
      rarity: asset.rarity,
      chroma: asset.chroma,
    };
  }

  private createMetadataResource(
    assetCategory: AssetCategory,
    metadata: OneOfMetadata,
    asset: AssetDocument,
  ): OneOfMetadataResource {
    const { ipfsFolder, ...rest } = metadata;
    let animationUrl: string | undefined;
    if (ipfsFolder) {
      if (assetCategory === AssetCategory.Hero) {
        animationUrl = getHeroAnimationUrl(ipfsFolder, rest.name, asset.chroma);
      } else if (assetCategory === AssetCategory.Pet) {
        animationUrl = getPetAnimationUrl(ipfsFolder, rest.name);
      }
    }
    return {
      animationUrl,
      ...rest,
    };
  }
}

export = NftController;
