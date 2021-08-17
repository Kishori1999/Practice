import React, { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import LeftFooterShards from "../../components/shards/LeftFooterShards";
import token, { devices } from "../../styles/token";
import BlackTopRightShardsComponent from "../../components/shards/BlackTopRightShards";
import ActionCallButton from "../../components/ActionCallButton";
import { chromaToEditionMap, rarityLabel, rarityToColorMap } from "../../constants";
import { AssetCategory } from "../../../constants";
import AssetAttributes from "../../components/AssetAttributes";
import { Link } from "../../../components";
import { AssetBorder } from "../../components/AssetBorder";

const InfoBlocks = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  border-top: 1px solid ${token.palette.light.lightGrey};
  margin: 0 auto 4.5em;
  z-index: 5;
  text-align: left;

  @media ${devices.md} {
    width: 65%;
  }

  @media ${devices.xl} {
    width: 45%;
  }
`;
const InfoBlock = styled.div`
  display: flex;
  flex-flow: column wrap;
  border-bottom: 1px solid ${token.palette.light.lightGrey};
  margin-top: 1.5em;
  padding-bottom: 1.5em;

  @media ${devices.md} {
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
  }
`;

const InfoSection = styled.section`
  position: relative;
  padding: 25em 2em 8em;
  @media ${devices.md} {
    padding: 20.5em 2em 12.5em;
  }
`;
const HeroSection = styled.section`
  position: relative;
  background: ${token.palette.dark.main};
  color: ${token.palette.light.main};
  padding: 5em 2em 0;
`;

const Name = styled.h1`
  position: relative;
  font-family: ${token.fontFamily.secondary};
  font-size: 4rem;
  font-weight: bold;
  line-height: 1.1em;
  letter-spacing: -0.0675em;
  margin: ${props => (props.hasEdition ? "1em 0 0" : "0")};
  color: ${token.palette.light.main};

  @media ${devices.md} {
    font-size: ${token.fontSizes.h1};
    margin: ${props => (props.hasEdition ? "0.5em 0 0" : "0")};
  }
`;
const Title = styled.div`
  position: relative;
  font-family: ${token.fontFamily.secondary};
  font-size: ${token.fontSizes.h3};
  font-weight: bold;
  @media ${devices.md} {
    font-size: ${token.fontSizes.h4};
  }
`;
const Serial = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid #28b0d5;
  background-color: rgba(40, 176, 213, 0.1);
  padding: 1em 2em;
  margin-top: 3.5em;

  @media ${devices.md} {
    margin-top: 0;
    padding: 0 2em;
  }
`;

const SerialText = styled.div`
  font-size: ${token.fontSizes.xs};
  font-size: ${token.fontSizes.big};

  @media ${devices.md} {
    font-family: ${token.fontFamily.secondary};
  }
`;

const SerialEdition = styled.div`
  font-size: ${token.fontSizes.h3};
  font-weight: bold;

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
  }
`;

/* Not implemented yet
const SerialNumber = styled.span`
  color: ${token.palette.blue.epic};
`
 */

const Account = styled.div`
  margin-top: 1em;
  font-size: 1.55rem;
  @media ${devices.md} {
    margin-top: 3em;
    font-size: ${token.fontSizes.xs};
  }
`;

const AccountOwner = styled.span`
  font-weight: bold;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const Description = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  margin: 7.5em auto 0;
  width: 100%;

  @media ${devices.md} {
    width: 60%;
  }
`;

const DescriptionHeading = styled.h2`
  font-size: ${token.fontSizes.h3};
  font-weight: bold;
  margin: 0 1em;
  color: ${token.palette.light.main};

  @media ${devices.md} {
    font-size: ${token.fontSizes.h4};
  }
`;

const DescriptionInfo = styled.div`
  position: relative;
  top: 0.5em;
  z-index: 5;
  font-size: ${token.fontSizes.h4};

  @media ${devices.md} {
    top: 5em;
    font-size: ${token.fontSizes.base};
  }
`;

const Line = styled.div`
  height: 1px;
  background: ${token.palette.blue.epic};
  flex: 1 0 0;
`;

const TopLandscapeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30em;
  user-select: none;
  pointer-events: none;
`;

const BlackTopRightShards = styled(BlackTopRightShardsComponent)`
  display: none;
  @media ${devices.md} {
    display: block;
    top: 0;
    height: 39em;
  }

  @media ${devices.xl} {
    display: block;
    top: 6em;
    height: 39em;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 5%);
  pointer-events: none;
`;

const ShaderBattlefield = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 0%, rgba(0, 0, 0, 0) 5%);
  pointer-events: none;
`;

const LeftShards = styled.div`
  position: absolute;
  width: 100%;
  height: 55em;
  top: -18em;
  pointer-events: none;
  left: -0.5em;
  @media ${devices.md} {
    height: 48em;
    left: 0;
    top: -14em;
  }
`;

const HeroInfoBlock = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  margin-top: 2em;
  @media ${devices.md} {
    flex-flow: row nowrap;
  }
`;

const BackButton = styled(ActionCallButton)`
  padding: 2em 1.5em;
`;

const Heading = styled.h2`
  font-size: ${token.fontSizes.h4};
  margin: 0;
`;
const BlockStatus = styled.span`
  font-size: ${token.fontSizes.h4};
  @media ${devices.md} {
    font-size: ${token.fontSizes.base};
  }
`;
const HeroAvatar = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  margin-top: 1em;

  :after {
    content: "";
    display: block;
    margin-top: 100%;

    @media ${devices.md} {
      display: none;
    }
  }

  @media ${devices.md} {
    display: flex;
    position: relative;
    margin: 0 auto;
    justify-content: center;
    align-items: center;
    height: 36em;
    width: 36em;
  }
`;

const UpperBorder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: -1.25em;
  user-select: none;
  pointer-events: none;
  color: ${({ color }) => color};
`;

const AvatarBorderText = styled.div`
  display: flex;
  position: absolute;
  height: 6.5%;
  left: 42%;
  right: 42%;

  font-family: ${token.fontFamily.secondary};
  font-size: 0.75em;
  font-weight: bold;
  text-align: center;
  color: #fff;
  text-transform: uppercase;

  justify-content: center;
  align-items: center;
  user-select: text;
  pointer-events: initial;
`;

const UpperBorderText = styled(AvatarBorderText)`
  top: 0.2%;
`;

const LowerBorderText = styled(AvatarBorderText)`
  bottom: 0.1%;
`;

const LowerBorder = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  user-select: none;
  pointer-events: none;
`;

const avatarDesktopWidth = "3em";
const avatarMobileWidth = "4em";
const avatarSmWidth = "3.75em";
const Avatar = styled.div`
  position: absolute;
  //overflow: hidden;
  top: ${avatarSmWidth};
  bottom: ${avatarSmWidth};
  left: ${avatarSmWidth};
  right: ${avatarSmWidth};
  background: ${token.palette.dark.main};

  @media ${devices.sm} {
    top: ${avatarMobileWidth};
    bottom: ${avatarMobileWidth};
    left: ${avatarMobileWidth};
    right: ${avatarMobileWidth};
  }

  @media ${devices.md} {
    top: ${avatarDesktopWidth};
    bottom: ${avatarDesktopWidth};
    left: ${avatarDesktopWidth};
    right: ${avatarDesktopWidth};
  }
`;

const BattlefieldBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 55em;
  pointer-events: none;
  user-select: none;
`;

const AvatarVideo = styled.video`
  width: 100%;
  height: auto;
`;

const Content = styled.div`
  position: relative;
  text-align: center;
`;

const AssetPage = ({ asset }) => {
  const [showControls, setShowControls] = useState();

  // FIXME Not implemented yet, once it's added uncomment this and related
  // const serial = formatNumberWithCommas(asset.edition.serial);
  // const serialTotal = formatNumberWithCommas(asset.edition.total);

  const ownerName = asset.owner;

  const types = (
    <AssetAttributes
      category={asset.category}
      rarity={asset.rarity}
      faction={asset.faction}
      element={asset.element}
      petClass={asset.petClass}
    />
  );
  const editionText = chromaToEditionMap[asset.chroma];

  const isToken = asset.category === AssetCategory.Token;

  return (
    <Content>
      <HeroSection>
        <BattlefieldBackground>
          <Image
            layout="fill"
            src="/imgs/hero-details/battlefield-dark.png"
            objectPosition="left top"
            objectFit="cover"
            quality={100}
          />
          <ShaderBattlefield />
        </BattlefieldBackground>
        <HeroAvatar>
          {!isToken && (
            <UpperBorder color={rarityToColorMap[asset.rarity]}>
              <AssetBorder editionText={editionText} color={rarityToColorMap[asset.rarity]} />
              <UpperBorderText>{rarityLabel[asset.rarity]}</UpperBorderText>
            </UpperBorder>
          )}
          <Avatar>
            {isToken ? (
              <Image layout="fill" objectFit="cover" objectPosition="center center" src={asset.assetFile} alt="" />
            ) : (
              <AvatarVideo
                src={asset.animationUrl}
                controls={showControls}
                onMouseEnter={() => setShowControls(true)}
                onMouseLeave={() => setShowControls(false)}
                autoPlay
                muted
                playsInline
                loop
                preload="auto"
              />
            )}
          </Avatar>
          {!isToken && editionText !== "" && (
            <LowerBorder>
              <LowerBorderText>{editionText}</LowerBorderText>
            </LowerBorder>
          )}
        </HeroAvatar>
        <Name hasEdition={!isToken && editionText !== ""}>{asset.name}</Name>
        {asset.tagline && <Title>{asset.tagline}</Title>}
        {!isToken && (
          <HeroInfoBlock>
            {types}
            <Serial>
              <SerialEdition>
                Coming Soon
                {/*
                <SerialNumber>{serial}</SerialNumber>/{serialTotal}
              */}
              </SerialEdition>
              <SerialText>SERIAL NUMBER</SerialText>
            </Serial>
          </HeroInfoBlock>
        )}
        <Account>
          Account owner: <AccountOwner>{ownerName}</AccountOwner>
        </Account>
        <Description>
          <Line />
          <DescriptionHeading>DESCRIPTION</DescriptionHeading>
          <Line />
        </Description>
        <DescriptionInfo>Coming soon</DescriptionInfo>
      </HeroSection>
      <InfoSection>
        <TopLandscapeContainer>
          <BlackTopRightShards />
          <Image layout="fill" src="/imgs/cropped-landscape-top.png" objectPosition="left top" objectFit="cover" />

          <Shader />
          <LeftShards>
            <Image
              layout="fill"
              objectFit="contain"
              objectPosition="top left"
              src="/imgs/store/landscape-white-left-shards.png"
            />
          </LeftShards>
        </TopLandscapeContainer>

        <InfoBlocks>
          <InfoBlock>
            <Heading>TRANSACTION HISTORY</Heading>
            <BlockStatus>Coming soon</BlockStatus>
          </InfoBlock>

          <InfoBlock>
            <Heading>RECENT SALES</Heading>
            <BlockStatus>Coming soon</BlockStatus>
          </InfoBlock>
        </InfoBlocks>
        <Link href="/collections">
          <a>
            <BackButton>BACK TO COLLECTION</BackButton>
          </a>
        </Link>
      </InfoSection>
      <LeftFooterShards />
    </Content>
  );
};
export default AssetPage;
