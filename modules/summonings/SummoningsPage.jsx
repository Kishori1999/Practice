import React, { useState, useEffect, useRef, useCallback } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import styled from "styled-components";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";
import axios from "axios";
import token, { devices } from "../../styles/token";
import NoPacksOverlay from "./NoPacksOverlay";
import WarningBox from "./WarningBox";
import { Product, FEATURE_IS_COMING_SOON_MODE, backendUrl } from "../../../constants";
import UnboxCard from "./UnboxCard";
import SkipButton from "./SkipButton";
import SummoningButton from "./SummoningButton";
import AssetInfoBox from "./AssetInfoBox";
import ShareBox from "./ShareBox";
import { Link } from "../../../components";
import { InventoryMenu } from "./InventoryMenu";

const Container = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: ${token.palette.dark.main};
`;

const ShaderInfo = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
  z-index: 10;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 60%);

  @media ${token.summoning.mobileBreak} {
    background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 50%);
  }
`;

const leftPadding = "5rem";
const leftPaddingMobile = "2rem";
const SelectionMenu = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: ${token.palette.dark.main};
  color: ${token.palette.light.main};
  flex-flow: column nowrap;
  padding: calc(6.5rem + ${token.summoning.headingOffsetTopMobile}) ${leftPaddingMobile} 6rem;
  overflow-y: auto;
  z-index: 21;

  @media ${devices.sm} {
    right: auto;
    padding: calc(3rem + ${token.summoning.headingOffsetTopMobile}) ${leftPaddingMobile} 6rem;
  }

  @media ${token.summoning.menuBreak} {
    padding: calc(3.5rem + ${token.summoning.headingOffsetTop}) ${leftPadding} 6em;
  }
`;

const SummoningGOGLogo = styled.div`
  background-image: url(/imgs/gog-logo.png);
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  width: 16rem;
  padding-top: 8rem;
  opacity: 0.25;
  display: block;
  margin: 2rem auto 0;
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);

  @media ${token.summoning.menuBreak} {
    margin: 1rem auto 0;
    width: 12rem;
    padding-top: 5rem;
  }
`;

const InventoryShadingOverlay = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(${token.palette.dark.mainRGB}, 0.4);
  opacity: 0;
  z-index: 20;
`;

const PopupShadingOverlay = styled(motion.div)`
  display: flex;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(${token.palette.dark.mainRGB}, 0.7);
  opacity: 0;
  z-index: 30;
`;
const Video = styled.video`
  position: absolute;
  object-fit: contain;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const Poster = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  user-select: none;
  pointer-events: none;
  z-index: -1;
`;

const SelectionMenuHeading = styled(motion.div)`
  && {
    position: fixed;
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    top: ${token.summoning.headingOffsetTopMobile};
    left: ${leftPaddingMobile};
    font-size: 0.91rem;
    letter-spacing: 0.15em;
    font-weight: 600;
    line-height: 1em;
    color: ${token.palette.light.main};
    right: ${leftPaddingMobile};
    min-width: 17.5em;

    @media ${token.summoning.mobileBreak} {
      top: ${token.summoning.headingOffsetTop};
      right: auto;
      left: ${leftPaddingMobile};
      width: ${token.summoning.menuCardSize};
    }

    @media ${token.summoning.menuBreak} {
      left: ${leftPadding};
    }

    :hover::before {
      opacity: ${({ clickable }) => (clickable ? 1 : 0)};
    }
  }
`;

const InvetoryHeading = styled(SelectionMenuHeading)`
  && {
    z-index: 19;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  z-index: 11;
  color: ${token.palette.light.main};
  background-color: ${token.palette.dark.main};
  border: 1px solid ${token.palette.orange.mainWithLightOpacity};
  padding: 2em;

  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%);
`;

const CornerButton = styled.div`
  position: absolute;
  cursor: pointer;
  z-index: 11;

  left: 1em;
  right: 1em;
  bottom: 0;

  @media ${token.summoning.mobileBreak} {
    left: auto;
    right: 2em;
    bottom: 1.8em;
  }

  @media ${devices.md} {
    right: 6em;
    bottom: 4.8em;
  }
`;

const SkipAllButton = styled(SkipButton)`
  && {
    width: 100%;
    padding: 1.8em 3em 1.8em 1.4em;

    @media ${devices.lg} {
      width: 16em;
    }
  }
`;

const PageHeading = styled.h3`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  text-transform: uppercase;
  color: ${token.palette.light.main};
  text-align: center;
  line-height: 1.1em;
  z-index: 30;
  overflow-y: auto;
  padding: 1em 3em;
  font-size: 2rem;
  font-family: ${token.fontFamily.secondary};

  @media ${token.summoning.mobileBreak} {
    font-size: 1.75rem;
  }
`;

const shaderInfoVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
const infoBoxVariants = {
  hidden: {
    opacity: 0,
    translateY: "100%",
    translateX: "-50%",
  },
  visible: {
    opacity: 1,
    translateY: "0em",
    translateX: "-50%",
    transition: {
      duration: 0.8,
    },
  },
};

const inventoryShadingVariants = {
  hidden: {
    opacity: 0,
    display: "none",
    transition: {
      display: {
        delay: 0.3,
        duration: 0,
      },
    },
  },
  visible: {
    opacity: 1,
    display: "block",
    transition: {
      duration: 0.3,
      ease: "easeOut",
      display: {
        duration: 0,
      },
    },
  },
};
const menuVariants = {
  hidden: {
    opacity: 0,
    translateX: "-100%",
  },
  visible: {
    opacity: 1,
    translateX: "0em",
    transition: {
      duration: 0.3,
      ease: "easeOut",
    },
  },
};

const inventoryHeadingVariants = {
  hidden: {
    opacity: 0,
    display: "none",
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
      display: {
        delay: 0.3,
      },
    },
  },
};

const BuyMoreButton = styled(SummoningButton)`
  width: 16em;
`;

const SummoningsPage = ({ enhancedAssets, address }) => {
  const [loaded, setLoaded] = useState(false);
  const [rareHeroes, setRareHeroes] = useState([]);
  const [epicHeroes, setEpicHeroes] = useState([]);
  const [legendaryHeroes, setLegendaryHeroes] = useState([]);
  const [pets, setPets] = useState([]);
  const [currentlyUnboxingProduct, setCurrentlyUnboxingProduct] = useState(null);
  const [currentUnboxed, setCurrentUnboxed] = useState(null);

  const videoRef = useRef(null);
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [warningVisible, setWarningVisible] = useState(false);
  const [shareVisible, setShareVisible] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // This is here because chrome doesn't fire "ended" event properly on seek
  const [videoFinished, setVideoFinished] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const assetInfoControls = useAnimation();

  useEffect(() => {
    if (!enhancedAssets) return;
    if (loaded) return;
    if (enhancedAssets.length > 0) {
      setRareHeroes(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.RareHeroPack));
      setEpicHeroes(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.EpicHeroPack));
      setLegendaryHeroes(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.LegendaryHeroPack));
      setPets(enhancedAssets.filter(asset => !asset.unboxed && asset.product === Product.PetPack));
      setLoaded(true);
    }
  }, [enhancedAssets]);

  const mapProductToAssets = useCallback(
    product => {
      switch (product) {
        case Product.RareHeroPack:
          return rareHeroes;
        case Product.EpicHeroPack:
          return epicHeroes;
        case Product.LegendaryHeroPack:
          return legendaryHeroes;
        case Product.PetPack:
          return pets;
        default:
          return null;
      }
    },
    [rareHeroes, epicHeroes, legendaryHeroes, pets],
  );

  const handleMultipleUnboxing = async () => {
    if (currentlyUnboxingProduct != null) {
      const assets = mapProductToAssets(currentlyUnboxingProduct);
      if (assets.length > 0) {
        try {
          await axios.put(`${backendUrl}/api/addresses/${address}/assets/unbox`, {
            filter: {
              product: currentUnboxed.product,
            },
          });

          switch (currentlyUnboxingProduct) {
            case Product.RareHeroPack:
              setRareHeroes([]);
              break;
            case Product.EpicHeroPack:
              setEpicHeroes([]);
              break;
            case Product.LegendaryHeroPack:
              setLegendaryHeroes([]);
              break;
            case Product.PetPack:
              setPets([]);
              break;
            default:
              break;
          }

          setCurrentlyUnboxingProduct(null);
          setCurrentUnboxed(null);
          setInventoryOpen(true);
        } catch (e) {
          // TODO: propagate error to user
          console.error(e);
        }
      }
    }
  };

  const loadVideo = src => {
    if (videoRef.current) {
      setVideoFinished(false);
      assetInfoControls.start("hidden");
      videoRef.current.setAttribute("src", src);
      videoRef.current.load();
    }
  };

  const unboxAsset = useCallback(
    async product => {
      const assets = mapProductToAssets(product);
      try {
        const asset = assets[0];
        await axios.put(`${backendUrl}/api/assets/${asset._id}/unbox`);
        assets.shift();

        const newAssetState = {
          ...asset,
          unboxed: true,
        };
        setCurrentUnboxed(newAssetState);
        setCurrentlyUnboxingProduct(product);
        loadVideo(asset.animationSummoning);
      } catch (e) {
        // TODO: propagate error to user
        console.error(e);
      }
    },
    [setCurrentUnboxed, rareHeroes, epicHeroes, legendaryHeroes, pets, backendUrl],
  );

  const handleNextUnboxing = () => {
    if (currentlyUnboxingProduct != null) {
      unboxAsset(currentlyUnboxingProduct);
    }
  };

  const [hideBackground, setHideBackground] = useState(false);
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (videoRef.current) {
      const onError = () => {
        setErrorMessage(videoRef.current.error.message);
        setTimeout(() => setErrorMessage(null), 3000);
      };

      const handleVideoEnd = () => {
        setVideoPlaying(false);
        setVideoFinished(true);
        assetInfoControls.start("visible");
      };
      const handleVideoStart = () => {
        if (!videoPlaying && !videoFinished) {
          videoRef.current.play();
          setInventoryOpen(false);
          setVideoFinished(false);
          setVideoPlaying(true);
        }
      };

      if (videoPlaying) {
        setHideBackground(true);
      } else {
        setHideBackground(false);
      }

      videoRef.current.addEventListener("error", onError);
      videoRef.current.addEventListener("canplaythrough", handleVideoStart);
      videoRef.current.addEventListener("ended", handleVideoEnd);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnd);
          videoRef.current.removeEventListener("canplaythrough", handleVideoStart);
          videoRef.current.removeEventListener("error", onError);
        }
      };
    }
  }, [videoRef.current, videoPlaying, videoFinished]);

  const hasPacks =
    (rareHeroes && rareHeroes.length !== 0) ||
    (epicHeroes && epicHeroes.length !== 0) ||
    (legendaryHeroes && legendaryHeroes.length !== 0) ||
    (pets && pets.length !== 0);

  let cornerButton;
  if (!videoPlaying) {
    if (currentUnboxed) {
      if (mapProductToAssets(currentUnboxed.product).length === 0) {
        cornerButton = (
          <>
            {FEATURE_IS_COMING_SOON_MODE ? (
              <BuyMoreButton>COMING SOON</BuyMoreButton>
            ) : (
              <Link href="/store" passHref>
                <a>
                  <BuyMoreButton>BUY MORE</BuyMoreButton>
                </a>
              </Link>
            )}
          </>
        );
      } else {
        cornerButton = <SkipAllButton onClick={() => setWarningVisible(true)} />;
      }
    }
  } else {
    cornerButton = (
      <SkipAllButton
        text="SKIP"
        onClick={() => {
          videoRef.current.pause();
          videoRef.current.currentTime = videoRef.current.duration;
          setVideoPlaying(false);
          assetInfoControls.start("visible");
          setVideoFinished(true);
        }}
      />
    );
  }
  const inventoryClickable = true; // currentUnboxed != null;
  let link = "";
  if (typeof window !== "undefined" && currentUnboxed) {
    link = `${window.location.origin}/share/${currentUnboxed.url}`;
  }
  return (
    <Container>
      <Video ref={videoRef} preload="auto" />
      {!hideBackground && (
        <Poster>
          <Image
            layout="fill"
            src="/imgs/summonings/portal-poster.png"
            objectPosition="center center"
            objectFit="cover"
            alt="asset background"
          />
        </Poster>
      )}

      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

      <ShareBox link={link} visible={shareVisible} onClose={() => setShareVisible(false)} />

      {!hasPacks && !currentUnboxed ? (
        <NoPacksOverlay />
      ) : (
        <>
          <PopupShadingOverlay
            initial="hidden"
            animate={warningVisible || shareVisible ? "visible" : "hidden"}
            variants={inventoryShadingVariants}
          />
          <WarningBox
            onConfirm={() => {
              setWarningVisible(false);
              handleMultipleUnboxing();
            }}
            onClose={() => setWarningVisible(false)}
            visible={warningVisible}
          />

          {currentUnboxed && (
            <>
              <ShaderInfo initial="hidden" animate={assetInfoControls} variants={shaderInfoVariants} />
              <AssetInfoBox
                initial="hidden"
                animate={assetInfoControls}
                variants={infoBoxVariants}
                asset={currentUnboxed}
                nextAvailable={currentUnboxed && mapProductToAssets(currentUnboxed.product).length > 0}
                onContinue={() => handleNextUnboxing()}
                onShare={() => setShareVisible(true)}
                videoFinished={videoFinished}
              />
            </>
          )}

          <InventoryShadingOverlay
            initial="hidden"
            animate={inventoryOpen ? "visible" : "hidden"}
            variants={inventoryShadingVariants}
          />
          <InvetoryHeading
            initial="visible"
            animate={!videoPlaying && hasPacks ? "visible" : "hidden"}
            variants={inventoryHeadingVariants}
          >
            <InventoryMenu
              onInventoryClick={() => setInventoryOpen(!inventoryOpen)}
              inventoryClickable={inventoryClickable}
              inventoryOpen={inventoryOpen}
            />
          </InvetoryHeading>
          <SelectionMenu initial="hidden" animate={inventoryOpen ? "visible" : "hidden"} variants={menuVariants}>
            <PageHeading>Summoning</PageHeading>
            <SelectionMenuHeading>
              <InventoryMenu
                onInventoryClick={() => setInventoryOpen(!inventoryOpen)}
                inventoryClickable={inventoryClickable}
                inventoryOpen={inventoryOpen}
              />
            </SelectionMenuHeading>
            <UnboxCard
              name="LEGENDARY HERO"
              count={legendaryHeroes.length}
              imgSrc="/imgs/summonings/legendary-hero.png"
              onUnbox={() => unboxAsset(Product.LegendaryHeroPack)}
            />
            <UnboxCard
              name="EPIC HERO"
              count={epicHeroes.length}
              imgSrc="/imgs/summonings/epic-hero.png"
              onUnbox={() => unboxAsset(Product.EpicHeroPack)}
            />
            <UnboxCard
              name="RARE HERO"
              count={rareHeroes.length}
              imgSrc="/imgs/summonings/rare-hero.png"
              onUnbox={() => unboxAsset(Product.RareHeroPack)}
            />
            <UnboxCard
              name="PET"
              count={pets.length}
              imgSrc="/imgs/summonings/pet-token.png"
              onUnbox={() => unboxAsset(Product.PetPack)}
            />
            <SummoningGOGLogo />
          </SelectionMenu>

          <CornerButton>{cornerButton}</CornerButton>
        </>
      )}
    </Container>
  );
};
export default SummoningsPage;
