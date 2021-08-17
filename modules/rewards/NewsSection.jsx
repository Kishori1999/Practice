import React from "react";
import Image from "next/image";
import styled from "styled-components";
import ActionCallButton from "../../components/ActionCallButton";
import token, { devices } from "../../styles/token";
import MediaCard from "../../components/MediaCard";
import BlackTopRightShardsComponent from "../../components/shards/BlackTopRightShards";

const NewSectionContent = styled.div`
  position: relative;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  text-align: center;
  z-index: 1;

  padding-top: 16em;
  padding-bottom: 12.5em;
`;

const NewsHeader = styled.h3`
  font-weight: bold;
`;

const NewsArticles = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  padding-bottom: 3em;

  & > div:not(:first-child) {
    margin-top: 2em;
  }

  @media screen and (min-width: 855px) {
    flex-flow: row wrap;
    max-width: 100%;

    & > div:not(:first-child) {
      margin-top: 0;
      margin-left: 2em;
    }
  }
`;

const NewsButton = styled(ActionCallButton)`
  margin: 0 auto;
  padding: 2em 3.8em;
`;
const articleAspect = 1.336653386;
const ArticleCardContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  max-width: 100%;
  height: 16em;
  padding: 7.5em 2em 2em;
  text-align: left;

  width: ${22 * articleAspect}em;

  @media ${devices.xs} {
    width: ${24 * articleAspect}em;
  }
  @media ${devices.md} {
    width: ${16 * articleAspect}em;
  }
`;

const ArticleCategory = styled.div`
  color: ${token.palette.blue.main};
  font-weight: bold;
`;

const ArticleTitle = styled.div`
  font-size: ${token.fontSizes.accented};
  color: ${token.palette.light.main};
  font-family: ${token.fontFamily.secondary};
  font-weight: bold;
  padding-bottom: 0.5em;
  margin-top: 0.3em;
  flex-grow: 1;
`;

const ArticleDate = styled.div`
  color: ${token.palette.light.grey};
`;

const ArticleShader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to top, rgba(${token.palette.dark.mainRGB}, 1) 10%, rgba(0, 0, 0, 0) 100%);
  pointer-events: none;
  z-index: -1;
`;

const ArticleCardContainer = styled(MediaCard)`
  cursor: pointer;

  ::before {
    position: absolute;
    content: "";
    box-shadow: 0 0 60px 6px ${token.palette.blue.dark};
    opacity: 0;
    transition: opacity 0.4s ease-out;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  :hover::before {
    opacity: 1;
  }
`;

const ArticleCard = ({ className, imgSrc, date, title, category, children, href, ...props }) => {
  return (
    <ArticleCardContainer className={className} imgSrc={imgSrc} {...props} imgAlt="article background">
      {children}
      <a href={href} target="_blank" rel="noreferrer">
        <ArticleCardContent>
          <ArticleShader />
          <ArticleCategory>{category}</ArticleCategory>
          <ArticleTitle>{title}</ArticleTitle>
          <ArticleDate>{date}</ArticleDate>
        </ArticleCardContent>
      </a>
    </ArticleCardContainer>
  );
};

const Section = styled.div`
  position: relative;
  padding: 0.5em;
`;

const TopLandscapeContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 30em;

  @media ${devices.md} {
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

const BlackTopRightShards = styled(BlackTopRightShardsComponent)`
  display: none;

  @media ${devices.md} {
    display: block;
    top: 6em;
    height: 39em;
  }
`;
const LeftShards = styled.div`
  display: none;

  @media ${devices.md} {
    display: block;
    position: absolute;
    width: 100%;
    height: 48em;
    top: -14em;
    left: 0;
    pointer-events: none;
  }
`;

const LeftShardsMobile = styled.div`
  position: absolute;
  width: 100%;
  height: 30em;
  top: -15em;
  left: 0;
  pointer-events: none;

  @media ${devices.md} {
    display: none;
  }
`;

const BlackRightShardsMobile = styled.div`
  position: absolute;
  height: 20em;
  top: 0;
  right: 0;
  left: 0;
  pointer-events: none;

  @media ${devices.md} {
    display: none;
  }
`;

const NewsSection = () => {
  return (
    <Section>
      <TopLandscapeContainer>
        <BlackTopRightShards />
        <Image layout="fill" src="/imgs/cropped-landscape-top.png" objectPosition="center top" objectFit="cover" />
        <BlackRightShardsMobile>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top right"
            src="/imgs/rewards/rewards-mobile-black-right-shards.png"
          />
        </BlackRightShardsMobile>
        <Shader />
        <LeftShards>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top left"
            src="/imgs/store/landscape-white-left-shards.png"
          />
        </LeftShards>
        <LeftShardsMobile>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="top left"
            src="/imgs/rewards/rewards-white-left-shards.png"
          />
        </LeftShardsMobile>
      </TopLandscapeContainer>
      <NewSectionContent>
        <NewsHeader>MORE WAYS TO EARN </NewsHeader>
        <NewsArticles>
          <ArticleCard
            date="9 May 2021"
            title="Sandbox Partnership"
            category="Earn free metaverse NFTs in Sandbox"
            objectPosition="center top"
            imgSrc="/imgs/store/news-darius.png"
            href="https://guildofguardians.medium.com/guild-of-guardians-and-the-sandbox-partner-to-bring-the-metaverse-to-gaming-nfts-b0aff030d308"
          />
          <ArticleCard
            date="Coming soon"
            title="Coming soon"
            category="Coming soon"
            objectPosition="center top"
            imgSrc="/imgs/store/news-shield.png"
            href="https://guildofguardians.medium.com"
          />
          <ArticleCard
            date="Coming soon"
            title="Coming soon"
            category="Coming soon"
            imgSrc="/imgs/store/news-orc.png"
            href="https://guildofguardians.medium.com"
          />
        </NewsArticles>
        <a target="_blank" rel="noreferrer" href="https://guildofguardians.medium.com/">
          <NewsButton>SEE ALL NEWS</NewsButton>
        </a>
      </NewSectionContent>
    </Section>
  );
};

export default NewsSection;
