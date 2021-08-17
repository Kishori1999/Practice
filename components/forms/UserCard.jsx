import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import Blockies from "react-blockies";
import token, { devices } from "../../styles/token";
import { formatAddress } from "../../helpers";
import { useWeb3Modal } from "../../hooks/useWeb3Modal";

const UserCardDiv = styled.div`
  position: relative;
  padding: 2em 0.4em 1.8em;
  display: flex;
  flex-flow: row nowrap;
  align-content: center;

  @media ${devices.md} {
    padding: 2em 1em 1.8em;
  }

  @media ${devices.lg} {
    padding: 2em 2.5em 1.8em;
  }

  @media ${devices.xl} {
    padding: 2.8em ${token.collections.sideBarWidth} 2.3em;
    margin: 0 1em;
  }
`;
const AvatarText = styled.div`
  color: ${token.palette.light.main};
  display: flex;
  flex-flow: column nowrap;
  align-content: center;
  justify-content: center;
  padding-left: 1.5em;

  @media ${token.collections.filterBreak} {
    padding-left: 1em;
  }
`;

const AvatarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 8em;
  height: 8em;
  min-width: 100px;
  min-height: 100px;
  border-radius: 50%;
  overflow: hidden;
`;

const AvatarUnconnected = styled.div`
  display: flex;
  position: absolute;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: rgba(5, 144, 195, 0.1);
  color: ${token.palette.dark.main};
`;

const Name = styled.span`
  font-size: ${token.fontSizes.h3};
  margin-top: 0.3em;

  @media ${token.collections.filterBreak} {
  }
`;

const Action = styled.div`
  text-transform: uppercase;
  font-size: ${token.fontSizes.accented};
  margin-top: 0.5em;
  letter-spacing: 0.0675em;
  cursor: pointer;

  @media ${token.collections.filterBreak} {
    font-size: ${token.fontSizes.base};
  }
`;

const Icon = styled.span`
  margin-right: 0.5em;
  color: ${token.palette.blue.main};
`;

const UserCard = ({ address }) => {
  const { web3Modal, loadWeb3Modal, logoutOfWeb3Modal } = useWeb3Modal();
  const isConnected = web3Modal && web3Modal.cachedProvider;

  let connectButtonText;
  let icon;
  let connectOnClick;

  if (isConnected) {
    connectOnClick = logoutOfWeb3Modal;
    connectButtonText = "LOG OUT";
    icon = faSignOutAlt;
  } else {
    connectOnClick = loadWeb3Modal;
    connectButtonText = "CONNECT";
    icon = faSignInAlt;
  }

  return (
    <UserCardDiv>
      <AvatarContainer>
        {isConnected ? (
          <Blockies
            seed={address.toLowerCase()}
            size={8}
            // scale={props.fontSize ? props.fontSize / 7 : 4}
            scale={16}
          />
        ) : (
          <AvatarUnconnected>?</AvatarUnconnected>
        )}
        {/*
      <Image layout="fill" src="/imgs/collections/priest-avatar.png" />
      */}
      </AvatarContainer>
      <AvatarText>
        <Name>{isConnected ? formatAddress(address, "short") : ""}</Name>
        <Action onClick={connectOnClick}>
          <Icon>
            <FontAwesomeIcon width={16} icon={icon} />
          </Icon>
          {connectButtonText}
        </Action>
      </AvatarText>
    </UserCardDiv>
  );
};

export default UserCard;
