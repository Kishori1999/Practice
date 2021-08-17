import React from "react";
import styled from "styled-components";
import Image from "next/image";
import HeroBanner from "../../components/HeroBanner";
import token, { devices } from "../../styles/token";
import PageHeading from "../../components/PageHeading";
import PageNavigation from "../../components/PageNavigation";
import FaqSection from "../../components/FaqSection";
import LeftFooterShards from "../../components/shards/LeftFooterShards";
import WhiteShards from "../../components/shards/WhiteBottomLeftShards";
import HeroParallax from "../../components/animations/HeroParallax";

const Media = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  right: 0;
  bottom: 0;
`;

const Grid = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  @media ${devices.md} {
    grid-template-columns: auto 1fr;

`;

const paddingTop = 2.5;
const Content = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 0 1em 12em;
  width: 100%;

  @media ${devices.xs} {
    padding: 0 2em 12em;
  }

  @media ${devices.md} {
    padding: 0 2em 20em;
    padding-right: 38%;
  }
`;
const Container = styled.div`
  position: relative;
  height: 100%;
`;

const WhiteBannerLeftShards = styled(WhiteShards)`
  display: none;
  top: -3em;
  left: 0;
  bottom: auto;
  z-index: 0;
  height: 39em;
  width: 100%;
  pointer-events: none;

  @media ${devices.xl} {
    display: block;
  }
`;

const RightBannerShards = styled.div`
  position: absolute;
  width: 100%;
  height: 18em;
  bottom: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;

  @media ${devices.md} {
    display: none;
  }
`;

const FaqShards = styled.div`
  display: none;
  position: absolute;
  top: -2vw;
  bottom: auto;
  right: 0;
  z-index: 2;
  height: 23em;
  width: 100%;
  pointer-events: none;
  z-index: 0;

  @media ${devices.md} {
    display: block;
  }
`;

const LeftCol = styled.div`
  padding-top: ${paddingTop}em;
  padding-right: 2em;
  padding-left: 2em;
  position: relative;
  z-index: 1;

  @media ${devices.md} {
    padding: ${paddingTop}em 0 0 0;
  }
`;

const parallaxData = [
  {
    start: "self",
    end: "self",
    endOffset: "150vh",
    easing: "easeOut",
    properties: [
      {
        startValue: 0,
        endValue: 4,
        unit: "em",
        property: "translateY",
      },
    ],
  },
];
const Background = (
  <Media>
    <HeroParallax parallaxData={parallaxData}>
      <Image
        layout="fill"
        objectFit="cover"
        objectPosition="center 14%"
        src="/imgs/faq/shield.jpg"
        alt="banner"
        priority
      />
    </HeroParallax>

    <RightBannerShards>
      <Image
        layout="fill"
        objectFit="contain"
        objectPosition="bottom right"
        src="/imgs/shards/white-bottom-right-shards.png"
        priority
      />
    </RightBannerShards>
  </Media>
);

const LinkOut = styled.a`
  color: ${token.palette.blue.dark};
`;

const generalQuestions = [
  {
    question: "What is Guild of Guardians?",
    answer:
      "Guild of Guardians is a mobile RPG where players can turn their gaming passion into assets. It will be a multiplayer, fantasy, action RPG where players build their dream team of ‘Guardians’ and compete in a guild to earn epic, tradeable rewards.",
  },
  {
    question: "Will it be free to play?",
    answer:
      "Yes! Players can play for free and earn heroes and items without spending any money. We are very excited by the ability for players to 'play-to-earn'!",
  },
  {
    question: "How do I play?",
    answer:
      "You can't play Guild of Guardians yet. We are in our first stage of release where players can begin collecting founder heroes, and we're currently working hard to finish completing development of the game.",
  },
  {
    question: "When does the game come out?",
    answer: "We are aiming to release Guild of Guardians on mobile in early 2022.",
  },
  {
    question: "Is it pay-to-win?",
    answer:
      "No. We are designing the game so that it won't be pay-to-win by ensuring that skill and strategy are core elements of the game. In addition, spending money on Guild of Guardians won't come at the expense of other players because the game is not focused on PVP",
  },
  {
    question: "What technology do you use to allow for true digital ownership?",
    answer:
      "We are using blockchain technology to allow you to really own your in-game assets. We are based on the Ethereum network and our in-game assets will be unique ERC-721s (otherwise known as NFTs or non-fungible tokens). We are also building using Immutable X, which is an Ethereum scaling solution designed to be secure, decentralised and scalable.",
  },
  {
    question: "Where can I learn more about the game?",
    answer: (
      <span>
        Great question! Our{" "}
        <LinkOut target="_blank" href="https://discord.com/invite/USVjNrFXSp">
          Discord channel
        </LinkOut>{" "}
        is the best place to start. We’ve got a rapidly growing community there, and we share leaks, updates and
        long-form pieces all the time
      </span>
    ),
  },
  {
    question: "Who is the team behind the game?",
    answer:
      "Guild of Guardians will be published by Immutable and developed by Stepico. Immutable is one of the world’s largest VC-funded blockchain gaming start-ups, backed by investors such as Naspers and Galaxy Digital. Stepico is a mobile games development studio, with a team of 50+ developers and artists who have worked on AAA-quality strategy and RPG games with over 5 million installs.",
  },
];

const presaleQuestions = [
  {
    question: "How do I purchase?",
    answer:
      "You can purchase heroes, pets, and other things in the game in the Store page, for a limited time only. These will be exclusive founder assets that can be played in the game that will never be sold again.",
  },
  {
    question: "Do I get anything from inviting my friends?",
    answer:
      "Yep! If you invite your friends and they purchase heroes you can actually get ETH as a reward if you have used your referral link. Go to our 'Rewards' page to learn more.",
  },
  {
    question: "What is a Wallet?",
    answer: (
      <span>
        A wallet is a secure place to store your digital items. Each wallet has a unique id that links your digital
        assets to you. They are completely free to set up and own. We recommend{" "}
        <LinkOut target="_blank" href="https://metamask.io/">
          {" "}
          Metamask
        </LinkOut>{" "}
        to set up a new wallet. MetaMask is a browser extension that allows you to easily interact with the Ethereum
        network.
      </span>
    ),
  },
  {
    question: "How do I setup a wallet?",
    answer: (
      <span>
        Here is a simple guide:
        <ol>
          <li>
            {" "}
            Head to{" "}
            <LinkOut target="_blank" href="http://metamask.io/">
              MetaMask.io
            </LinkOut>{" "}
          </li>
          <li> Install the plug-in: Install the MetaMask extension for your chosen browser. </li>
          <li> Create a wallet: Follow the prompts to “Create a Wallet”. </li>
          <li> Connect plug-in: Click “Connect” on the top right of the Guild of Guardians website to connect</li>
        </ol>
        That&apos;s it! You are now connected
      </span>
    ),
  },
  {
    question: "How do I get Ether?",
    answer: (
      <span>
        You can purchase ETH from secure cryptocurrency exchanges in your region, such as the{" "}
        <LinkOut target="_blank" href="https://pay.sendwyre.com/">
          Wyre widget
        </LinkOut>{" "}
        in your MetaMask extension, or a website like{" "}
        <LinkOut target="_blank" href="https://www.coinbase.com/">
          Coinbase
        </LinkOut>{" "}
        . Later on you can earn Ether by playing the game and selling assets you have earned.
      </span>
    ),
  },
  {
    question: "How do I send Ether to Metamask?",
    answer:
      "If you purchase Ether directly through MetaMask using the Wyre or the Coinbase widget, your ETH will show up in MetaMask automatically.  If you purchase Ether through an exchange, you will need to copy your MetaMask address and then send the ETH stored on your exchange to that address.",
  },
];
const supportQuestions = [
  {
    question: "I need help!",
    answer: (
      <span>
        We recommend joining our{" "}
        <LinkOut target="_blank" href="https://discord.com/invite/USVjNrFXSp">
          Discord
        </LinkOut>{" "}
        and posting in the #support channel. Alternatively you can email us at support@guildofguardians.com
      </span>
    ),
  },
  {
    question: "How can I reach out about business opportunities?",
    answer: "Email us with inquiries at team@guildofguardians.com",
  },
];

const FAQPage = () => (
  <Container>
    <HeroBanner background={Background} height="25em" borderColor={token.palette.dark.main}>
      <PageHeading>
        FREQUENTLY
        <br /> ASKED QUESTIONS
      </PageHeading>
    </HeroBanner>
    <WhiteBannerLeftShards priority />

    <Grid>
      <FaqShards>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="top right"
          src="/imgs/faq/faq-right-top-shards.png"
          alt="shards"
          priority
        />
      </FaqShards>
      <LeftCol>
        <PageNavigation />
      </LeftCol>
      <Content>
        <FaqSection id="general" name="GENERAL" questions={generalQuestions} />
        <FaqSection id="presale" name="PRESALE" questions={presaleQuestions} />
        <FaqSection id="support" name="SUPPORT" questions={supportQuestions} />
      </Content>
    </Grid>

    <LeftFooterShards />
  </Container>
);

export default FAQPage;
