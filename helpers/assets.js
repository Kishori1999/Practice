import { AssetCategory, Chroma, gatewayUrl, Rarity, thumbnailRoot } from "../constants";

function getChromaName(chroma) {
  const chromaName = Object.keys(Chroma).find(key => Chroma[key] === chroma);
  if (!chromaName) {
    throw new Error(`Wrong chroma: ${chroma}`);
  }
  return chromaName;
}

function getRarityName(rarity) {
  const rarityName = Object.keys(Rarity).find(key => Rarity[key] === rarity);
  if (!rarityName) {
    throw new Error("unknown rarity");
  }
  return rarityName;
}

function getAssetPostfix(chroma) {
  return chroma === Chroma.Normal ? "Base" : getChromaName(chroma);
}

function getHeroName(baseName, chroma) {
  if (chroma === Chroma.Normal) {
    return baseName;
  }
  const chromaName = getChromaName(chroma);
  return `${chromaName} ${baseName}`;
}

function getHeroAnimationUrl(baseName, chroma) {
  const assetPostfix = getAssetPostfix(chroma);
  return `${gatewayUrl}Content/CollectionAssets/Heroes/${baseName}/CollectionAsset_Hero_${baseName}_${assetPostfix}.mp4`;
}

function getHeroSummoningUrl(baseName, chroma, rarity) {
  const assetPostfix = getAssetPostfix(chroma);
  const rarityName = getRarityName(rarity);
  return `${gatewayUrl}Content/Summoning/Heroes/${baseName}/Summoning_Hero_${rarityName}_to_${baseName}_${assetPostfix}.mp4`;
}

function getHeroThumbnailUrl(baseName, chroma) {
  const assetPostfix = getAssetPostfix(chroma);
  return `${thumbnailRoot}Content/Thumbnails/Heroes/${baseName}/Thumbnail_Hero_${baseName}_${assetPostfix}.png`;
}

function getPetAnimationUrl(baseName) {
  return `${gatewayUrl}Content/CollectionAssets/Pets/${baseName}/CollectionAsset_Pet_${baseName}.mp4`;
}

function getPetSummoningUrl(baseName) {
  return `${gatewayUrl}Content/Summoning/Pets/${baseName}/Summoning_Pet_${baseName}.mp4`;
}

function getPetThumbnailUrl(baseName) {
  return `${thumbnailRoot}Content/Thumbnails/Pets/${baseName}/Thumbnail_Pet_${baseName}.png`;
}

export function enhanceAssets(assets, metadata) {
  const {
    [AssetCategory.Hero]: heroesMetadata,
    [AssetCategory.Pet]: petsMetadata,
    [AssetCategory.Token]: tokensMetadata,
  } = metadata;
  if (!assets) {
    return [];
  }
  return assets.map(
    ({ _id, boxed, chroma, indexInOrder, product, category, rarity, transactionHash, type, createdAt, updatedAt }) => {
      let name = null;
      let faction = null;
      let element = null;
      let animationUrl = null;
      let animationSummoning = null;
      let heroClass = null;
      let tagline = null;
      let petClass = null;
      let petEffect = null;
      let petEffect2 = null;
      let assetFile = null;
      let url = null;
      switch (category) {
        case AssetCategory.Hero: {
          const heroMetadata = heroesMetadata.find(hero => hero.id === type);
          if (!heroMetadata) {
            console.error(`Cannot find heroMetadata for type: ${type}`);
            break;
          }
          const { name: baseName } = heroMetadata;
          name = getHeroName(baseName, chroma);
          animationUrl = getHeroAnimationUrl(baseName, chroma);
          animationSummoning = getHeroSummoningUrl(baseName, chroma, rarity);
          assetFile = getHeroThumbnailUrl(baseName, chroma);
          faction = heroMetadata.faction;
          heroClass = heroMetadata.class;
          tagline = heroMetadata.tagline;
          element = heroMetadata.element;
          break;
        }
        case AssetCategory.Pet: {
          const petMetadata = petsMetadata.find(pet => pet.heroPetType === type && pet.rarity === rarity);
          if (!petMetadata) {
            console.error(`Cannot find petMetadata for type: ${type}`);
            break;
          }
          name = petMetadata.name;
          animationUrl = getPetAnimationUrl(name);
          animationSummoning = getPetSummoningUrl(name);
          assetFile = getPetThumbnailUrl(name);
          petClass = petMetadata.class;
          petEffect = petMetadata.effect;
          petEffect2 = petMetadata.effect2;
          break;
        }
        case AssetCategory.Token: {
          const tokenMetadata = tokensMetadata.find(token => token.id === product);
          if (!tokenMetadata) {
            console.error(`Cannot find tokenMetadata for product: ${product}`);
            break;
          }
          name = tokenMetadata.name;
          assetFile = `/imgs/store/boxes/${tokenMetadata.assetBase}.jpg`;
          break;
        }
        default:
          break;
      }

      if (name) url = `${name.replace(/\s+/g, "-").toLowerCase()}-${_id}`;

      return {
        _id,
        product,
        type,
        rarity,
        chroma,
        indexInOrder,
        transactionHash,
        name,
        url,
        faction,
        element,
        animationUrl,
        animationSummoning,
        unboxed: !boxed,
        heroClass,
        tagline,
        petClass,
        petEffect,
        petEffect2,
        assetFile,
        createdAt: new Date(createdAt),
        updatedAt: new Date(updatedAt),
      };
    },
  );
}
