import React, { useState, useEffect, useRef, useCallback } from "react";
import "react-confirm-alert/src/react-confirm-alert.css";
import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import token from "../../styles/token";
import AssetInfoBox from "../summonings/AssetInfoBox";
import ShareBox from "../summonings/ShareBox";
import ActionCallButton from "../../components/ActionCallButton";

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
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 50%);
  pointer-events: none;
`;

const Video = styled.video`
  position: absolute;
  object-fit: cover;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

const PortraitOverlay = styled.div`
  display: none;
  z-index: 1000;
  font-size: 4em;
  color: ${token.palette.light.main};

  @media screen and (min-width: 320px) and (max-width: 767px) and (orientation: portrait) {
    position: fixed;
    display: flex;
    height: 100vh;
    width: 100vw;
    top: 100vw;
    left: 0;
    padding: 1em;
    transform: rotate(-90deg);
    transform-origin: top left;
    background: rgba(${token.palette.dark.mainRGB}, 0.7);

    text-align: center;
    justify-content: center;
    align-items: center;
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

const Center = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PlayButton = styled(ActionCallButton)`
  display: ${({ visible }) => (visible ? "auto" : "none")};
`;

const SharePage = ({ asset }) => {
  const videoRef = useRef(null);
  const [shareVisible, setShareVisible] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  // This is here because chrome doesn't fire "ended" event properly on seek
  // TODO: Why don't we use the state?
  const [, setVideoFinished] = useState(false);
  const assetInfoControls = useAnimation();
  const [playVisible, setPlayVisible] = useState(true);

  const playVideo = useCallback(() => {
    setVideoPlaying(true);
    setVideoFinished(false);
    setPlayVisible(false);
    videoRef.current.play();
  }, [videoRef.current]);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (videoRef.current) {
      const handleVideoEnd = () => {
        setVideoPlaying(false);
        setVideoFinished(true);
        assetInfoControls.start("visible");
      };
      videoRef.current.addEventListener("ended", handleVideoEnd);

      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener("ended", handleVideoEnd);
        }
      };
    }
  }, [videoRef.current, videoPlaying]);

  useEffect(() => {
    videoRef.current.setAttribute("src", asset.animationSummoning);
    videoRef.current.load();
  }, [videoRef.current, asset]);

  let link = "";
  if (typeof window !== "undefined" && asset) {
    link = `${window.location.origin}/share/${asset.url}`;
  }
  return (
    <Container>
      <PortraitOverlay> Turn your device to the landscape</PortraitOverlay>
      <Video ref={videoRef} autoplay preload="auto" />
      <ShareBox link={link} visible={shareVisible} onClose={() => setShareVisible(false)} />
      <ShaderInfo initial="hidden" animate={assetInfoControls} variants={shaderInfoVariants} />
      <Center>
        <PlayButton visible={playVisible} onClick={() => playVideo()}>
          PLAY
        </PlayButton>
      </Center>
      <AssetInfoBox
        initial="hidden"
        animate={assetInfoControls}
        variants={infoBoxVariants}
        asset={asset}
        nextAvailable={false}
        onContinue={() => {}}
        withBuy
        onShare={() => setShareVisible(true)}
      />
    </Container>
  );
};
export default SharePage;
