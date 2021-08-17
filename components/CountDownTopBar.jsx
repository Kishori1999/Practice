import React, { useEffect } from "react";
import useCountDown from "react-countdown-hook";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import TopBar from "../../components/TopBar";
import { devices } from "../styles/token";

const Container = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: flex-start;

  @media ${devices.md} {
    justify-content: center;
  }

  @media screen and (max-width: 410px) {
    flex-flow: column nowrap;
    align-items: flex-start;
  }
`;

const LearnMoreLink = styled.a`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);

  &:hover {
    color: #fff;
  }
`;

const LearnMoreLinkText = styled.span`
  padding-bottom: 0;
  line-height: 1.075;
  display: inline-block;
  border-bottom: 1px solid #fff;
`;

const LearnMoreLinkIcon = styled.span`
  margin-right: 0.25rem;
  vertical-align: middle;
  display: none;

  @media ${devices.md} {
    display: inline-block;
  }
`;

const Description = styled.span`
  display: inline-block;
  vertical-align: middle;
  display: none;

  @media ${devices.md} {
    display: block;
  }
`;

const MobileDescription = styled.span`
  display: block;

  @media ${devices.md} {
    display: none;
  }
`;

const Timer = styled.span`
  margin-left: 0.5rem;
  display: inline-block;
  vertical-align: middle;
  font-weight: 600;
`;

const TimerIcon = styled.span`
  margin-right: 0.25rem;
  margin-top: 2px;
  border-bottom: 0;
`;

const startTime = new Date("2021-05-27T10:00:00+10:00");
const now = new Date();
const initialTime = startTime - now;

export const showCountdownTopBar = initialTime > 0;

export default function CountdownTopBar() {
  const [millisecondsLeft, { start }] = useCountDown(initialTime, 1000);
  useEffect(() => {
    if (initialTime > 0) {
      start();
    }
  }, []);

  const timeLeft = {
    days: Math.floor(millisecondsLeft / (1000 * 60 * 60 * 24)),
    hours: Math.floor((millisecondsLeft / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((millisecondsLeft / 1000 / 60) % 60),
    seconds: Math.floor((millisecondsLeft / 1000) % 60),
  };

  return (
    <TopBar>
      <Container>
        <Description>Guild of Guardians Wave 1 Sale will start in:</Description>
        <MobileDescription>Founder Sale starts in:</MobileDescription>
        <Timer>
          {millisecondsLeft > 0 ? (
            <>
              <TimerIcon>
                <FontAwesomeIcon icon={faClock} />
              </TimerIcon>
              {timeLeft.days} : {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
            </>
          ) : (
            <strong>now</strong>
          )}
        </Timer>
        <LearnMoreLink
          href="https://guildofguardians.medium.com/announcing-guild-of-guardians-founder-sale-wave-1-legendary-heroes-guilds-664c37c3d2c0"
          target="_blank"
        >
          <LearnMoreLinkIcon>
            <FontAwesomeIcon icon={faInfoCircle} />
          </LearnMoreLinkIcon>
          <LearnMoreLinkText>Learn More</LearnMoreLinkText>
        </LearnMoreLink>
      </Container>
    </TopBar>
  );
}
