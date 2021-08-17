import React from "react";
import Image from "next/image";
import styled from "styled-components";
import token, { devices } from "../../styles/token";
import NamedSection from "../../components/NamedSection";
import ShareBox from "../../components/ShareBox";

const Goblin = styled.div`
  position: absolute;
  width: 63em;
  height: 45em;
  pointer-events: none;
  right: -13em;
  bottom: 0;

  @media ${devices.md} {
    height: 60em;
    right: -5.5em;
  }
`;

const Firesmoke = styled.div`
  position: absolute;
  width: 25em;
  height: 10em;
  pointer-events: none;
  left: -5em;
  top: 15em;

  @media ${devices.md} {
    display: none;
  }
`;

const ShareContent = styled.div`
  position: relative;
  text-align: center;
  color: ${token.palette.light.main};
  z-index: 1;
  padding-bottom: 10em;
`;

const FireParticlseTop = styled.div`
  position: absolute;
  pointer-events: none;
  z-index: 1;
  top: -12em;
  left: -10em;
  height: 25em;
  width: 25em;

  @media ${devices.md} {
    top: -18em;
    left: 36em;
    height: 20em;
    width: 20em;
  }
`;

const Shader = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to top,
    rgba(${token.palette.dark.mainRGB}, 1) 0%,
    rgba(0, 0, 0, 0) 20%,
    rgba(0, 0, 0, 0) 80%,
    rgba(${token.palette.dark.mainRGB}, 1) 90%
  );
  pointer-events: none;
`;

const InviteHeading = styled.h1`
  margin-top: 0;
  line-height: 1.2em;
  letter-spacing: 0;
  z-index: 5;
  font-size: 5rem;
  margin-bottom: 0.3em;
  color: ${token.palette.light.main};

  @media ${devices.md} {
    letter-spacing: -3px;
    margin-bottom: 0.5em;
  }
`;

const FirelightRight = styled.div`
  position: absolute;
  pointer-events: none;
  right: 0;
  bottom: -3.5em;
  height: 64em;
  width: 90em;
`;

const GoblinHider = styled.div`
  position: absolute;
  width: 100%;
  height: 60em;
  pointer-events: none;
  right: 0;
  bottom: 4.2em;

  overflow: hidden;
`;

const FirelightLeft = styled.div`
  display: none;
  @media ${devices.md} {
    display: block;
    position: absolute;
    pointer-events: none;
    z-index: 1;
    left: -1em;
    bottom: 31.5em;
    height: 30em;
    width: 100%;
  }
`;

const MountainShade = styled.div`
  display: none;
  @media ${devices.md} {
    display: block;
    position: absolute;
    pointer-events: none;
    z-index: 1;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }
`;

const ShortArrowLine = styled.div`
  display: block;
  position: relative;
  pointer-events: none;
  z-index: 1;
  height: 3em;
  width: 100%;
  margin-bottom: 8em;
`;
const ShareSection = ({ referralUrl }) => {
  return (
    <NamedSection name="Share to earn" dark topMark="22em">
      <GoblinHider>
        <Goblin>
          <Image
            layout="fill"
            objectFit="contain"
            objectPosition="bottom right"
            src="/imgs/rewards/goblin-priest.png"
          />
        </Goblin>
        <Firesmoke>
          <Image layout="fill" objectFit="contain" objectPosition="bottom right" src="/imgs/rewards/firesmoke.png" />
        </Firesmoke>
      </GoblinHider>
      <MountainShade>
        <Image layout="fill" objectFit="cover" objectPosition="top right" src="/imgs/mountain-shade.png" />
      </MountainShade>
      <FirelightLeft>
        <Image layout="fill" objectFit="contain" objectPosition="bottom left" src="/imgs/rewards/firelight-left.png" />
      </FirelightLeft>
      <FirelightRight>
        <Image
          layout="fill"
          objectFit="contain"
          objectPosition="bottom right"
          src="/imgs/rewards/firelight-right.png"
        />
      </FirelightRight>
      <Shader />

      <FireParticlseTop>
        <Image layout="fill" objectFit="contain" src="/imgs/particles/fire-particles.png" alt="particles" />
      </FireParticlseTop>
      <ShareContent>
        <InviteHeading>
          INVITE FRIENDS
          <br />
          TO EARN REWARDS
        </InviteHeading>
        <ShortArrowLine>
          <Image layout="fill" objectFit="contain" src="/imgs/rewards/arrow-line-short.png" alt="arrow line" />
        </ShortArrowLine>
        <ShareBox referralUrl={referralUrl} />
      </ShareContent>
    </NamedSection>
  );
};

export default ShareSection;
