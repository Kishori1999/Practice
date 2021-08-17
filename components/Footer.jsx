import React from "react";
import styled from "styled-components";
import Image from "next/image";
import { faFacebookF, faTwitter, faDiscord } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import token, { devices } from "../styles/token";
import DoubleBorderComponent from "./DoubleBorder";
import MdBreakline from "./MdBreakline";
import SlideUpWhenVisible from "./animations/SlideUpWhenVisible";
import { Link } from "../../components";

const StyledFooter = styled.footer`
  position: relative;
  background: ${token.palette.dark.main};
  padding: ${token.spaces.md};
  @media ${devices.md} {
    padding-bottom: 35px;
  }
`;

const Content = styled.div`
  position: relative;
  display: flex;
  color: ${token.palette.light.main};
  flex-flow: column nowrap;
  align-items: center;
  padding: 6em 0 30vh 0;

  @media ${devices.md} {
    padding: 3em 0 2.3em;
  }
`;

const HeroesImage = styled.div`
  position: absolute;
  bottom: 0;
  height: 40vh;
  width: 70%;
  user-select: none;
  pointer-events: none;

  @media ${devices.md} {
    height: 36vh;
    width: 50%;
  }

  @media ${devices.xl} {
    height: 67vh;
    max-height: 800px;
  }
`;

const LeftImage = styled(HeroesImage)`
  left: 0;
  @media ${devices.xl} {
    height: 70vh;
  }
`;
const RightImage = styled(HeroesImage)`
  right: 0;
  @media ${devices.xl} {
    height: 66vh;
  }
`;

const Privacy = styled.div`
  text-align: center;
  font-size: ${token.fontSizes.big};

  @media ${devices.md} {
    opacity: 0.5;
    font-size: ${token.fontSizes.xs};
  }
`;

const Socials = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  min-width: 150px;
  margin: 1em auto 3.5em;

  @media ${devices.md} {
    margin-top: 0;
    max-width: initial;
  }
`;

const SocialLink = styled.a`
  font-size: 1.5rem;
  margin: 0 2rem;
  @media ${devices.md} {
    font-size: 1rem;
    margin: 2em;
  }
`;

const SocialIcon = ({ icon, href }) => {
  return (
    <SocialLink target="_blank" href={href}>
      <FontAwesomeIcon icon={icon} size="2x" color="#16a0cc" width={2} />
    </SocialLink>
  );
};

const CallOut = styled.div`
  display: flex;
  flex-flow: column nowrap;
  text-align: center;
  align-content: center;
  margin: 1.5em 0 2em;

  div:nth-child(1) {
    font-family: ${token.fontFamily.secondary};
    font-size: 2.2rem;
    font-weight: 700;
    margin-top: 1em;
    margin-bottom: 0.1em;
    @media ${devices.md} {
      font-size: ${token.fontSizes.h4};
    }
    letter-spacing: 1px;
  }

  div:nth-child(2) {
    font-size: ${token.fontSizes.big};
    @media ${devices.md} {
      font-size: ${token.fontSizes.base};
    }
  }
`;

const DoubleBorder = styled(DoubleBorderComponent)`
  border-color: ${token.palette.orange.main};

  ::before {
    border-color: ${token.palette.orange.main};
  }

  @media ${devices.md} {
    border-color: rgb(73, 48, 39);

    ::before {
      border-color: rgb(73, 48, 39);
    }
  }
`;

const NotMobile = styled.span`
  display: none;
  @media ${devices.md} {
    display: inline-block;
  }
`;

const Footer = () => {
  return (
    <SlideUpWhenVisible>
      <StyledFooter>
        <DoubleBorder distance="0.6em">
          <Content>
            <Image height={40} width={180} src="/imgs/gog-logo.png" />
            <CallOut>
              <div>JOIN THE MOVEMENT!</div>
              <div>#WeAreGuardians</div>
            </CallOut>
            <Socials>
              <SocialIcon href="https://www.facebook.com/guildofguardians" icon={faFacebookF} />
              <SocialIcon href="https://twitter.com/GuildOfGuardian" icon={faTwitter} />
              <SocialIcon href="https://discord.gg/UdejGr9Wg7" icon={faDiscord} />
            </Socials>
            <Privacy>
              <Link href="/terms-and-conditions">
                <a>TERMS & CONDITIONS</a>
              </Link>
              <NotMobile>&nbsp;/&nbsp;</NotMobile>
              <MdBreakline />
              <Link href="/privacy">
                <a>PRIVACY POLICY</a>
              </Link>
            </Privacy>
          </Content>
        </DoubleBorder>
        <LeftImage>
          <Image layout="fill" objectFit="contain" objectPosition="left bottom" src="/imgs/footer/heroes.png" />
        </LeftImage>
        <RightImage>
          <Image layout="fill" objectFit="contain" objectPosition="right bottom" src="/imgs/footer/undeads.png" />
        </RightImage>
      </StyledFooter>
    </SlideUpWhenVisible>
  );
};

export default Footer;
