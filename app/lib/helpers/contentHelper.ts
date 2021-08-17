import { Chroma } from '../../domains/solTypes';
import { ipfsBaseUrl } from '../../metadataProvider';

function getChromaName(chroma) {
  const chromaName = Object.keys(Chroma).find((key) => Chroma[key] === chroma);
  if (!chromaName) {
    throw new Error(`Wrong chroma: ${chroma}`);
  }
  return chromaName;
}

function getAssetPostfix(chroma) {
  return chroma === Chroma.Normal ? 'Base' : getChromaName(chroma);
}

export function getHeroAnimationUrl(ipfsFolder: string, baseName: string, chroma) {
  const assetPostfix = getAssetPostfix(chroma);
  return `${ipfsBaseUrl}/${ipfsFolder}/CollectionAsset_Hero_${baseName}_${assetPostfix}.m3u8`;
}

export function getPetAnimationUrl(ipfsFolder: string, baseName: string) {
  return `${ipfsBaseUrl}/${ipfsFolder}/CollectionAsset_Pet_${baseName}.m3u8`;
}
