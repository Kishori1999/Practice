import React from "react";
import styled from "styled-components";
import { Box, BoxHeader, BoxTitle, BoxContent } from "../../components/box";
import token, { devices } from "../../styles/token";
import WalletStatus from "./WalletStatus";
import ConnectButton from "../../components/ConnectButton";
import { ButtonStyles } from "../../components/Button";
import { FEATURE_IMX_TRADING_ENABLED, FEATURE_TOKENTROVE_TRADING_ENABLED } from "../../../constants";

const Wrapper = styled.div`
  max-width: 1080px;
  width: 100%;
`;

const Header = styled(BoxHeader)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-flow: row nowrap;
`;

const HeaderRow = styled.div`
  display: flex;
  flex-flow: row nowrap;
  margin-bottom: 12px;
`;

const Subtitle = styled.span`
  margin-right: 68px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.25px;
`;

/*
const HardwareWalletLink = styled.a`
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.25px;

  &:hover {
    color: ${token.palette.orange.main};
  }

  > span {
    vertical-align: middle;
  >
`;
*/

const HardwareWalletInfoIcon = styled.img`
  height: 16px;
  width: 16px;
  margin-right: 4px;
  vertical-align: middle;
`;

const InnerContent = styled.div`
  margin: 2.5rem auto 0;
  max-width: 800px;
  width: 100%;
  text-align: center;
  font-size: 1.25rem;

  @media ${devices.md} {
    font-size: 1rem;
  }

  @media ${devices.xxl} {
    font-size: 0.875rem;
  }

  @media ${devices.xxxl} {
    font-size: 0.75rem;
  }
`;

const InnerBox = styled.div`
  margin-top: 1rem;
  background: #fff;
  box-shadow: 8px 8px 50px rgba(113, 112, 141, 0.5);

  padding: 2rem 1rem;
  box-sizing: border-box;
`;

const InfoText = styled.div`
  margin-top: 1rem;
  color: #fff;
  font-size: 0.825rem;
  padding: 0.625rem 1rem;
  box-sizing: border-box;
  background-color: ${token.palette.dark.main};
  text-align: center;
  font-size: 13px;

  @media ${devices.xxl} {
    font-size: 12px;
  }
`;

const ConnectButtonWrapper = styled.div`
  margin-top: 1rem;
  width: auto;
  display: inline-block;
`;

const WalletIcon = styled.img`
  display: block;
  margin: 0 auto 1rem;

  ${({ small }) =>
    small
      ? `
    width: 7.75rem;
    height: 7.75rem;
  
    @media ${devices.xxl} {
      width: 5.625rem;
      height: 5.625rem;
    }
  `
      : `
    width: 10rem;
    height: 10rem;
  
    @media ${devices.xxl} {
      width: 8rem;
      height: 8rem;
    }
  `}
`;

const Loading = styled.span`
  margin: 3rem 0;
  font-size: 0.625rem;
  text-align: center;
`;

const QuestionsInfo = styled.div`
  display: block;
  width: 100%;
  color: rgba(${token.palette.dark.mainRGB}, 0.5);
  font-size: 11px;
  text-align: center;
  margin-top: 0.75rem;

  @media ${devices.sm} {
    text-align: left;
  }

  @media ${devices.xxl} {
    font-size: 12px;
  }
`;

const Address = styled.span`
  font-weight: bold;
  display: inline-block;
  font-size: 0.825rem;
`;

const PrimaryButton = styled.button`
  ${ButtonStyles}

  border-color: ${token.palette.blue.light};
  min-width: 16em;
  margin: 1.25em 0.75em 0;
  font-size: 0.875em;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.5px;

  &:hover,
  &:focus {
    border-color: ${token.palette.blue.light};
  }

  > img,
  > span {
    vertical-align: middle;
    display: inline-block;
  }

  > img {
    width: 1em;
    margin-left: 0.5em;
  }
`;

const SecondaryButton = styled.button`
  border: 1px solid ${token.palette.orange.main};
  background-color: transparent;
  color: ${token.palette.orange.main};
  margin: 1.25em 0.75em 0 !important;
  font-size: 0.875em;
  text-transform: uppercase;
  font-weight: 400;
  letter-spacing: 0.5px;
  padding: 0.8rem 1.25rem;
  -webkit-appearance: none;
  outline: 0;
  transition: all 0.5s ease-in-out;
  cursor: pointer;

  &:hover {
    background-color: ${token.palette.orange.main};
    color: #fff;
  }
`;

const LoadingIcon = styled.img`
  height: 18px !important;
  width: 18px !important;

  animation-name: spin;
  animation-duration: 1000ms;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  transform-origin: center;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  display: inline-block;
  vertical-align: middle;
`;

const LinkingLabel = styled.span`
  margin-left: 3em;
  margin-right: 2rem;
  display: inline-block;
  vertical-align: middle;
`;

const HowToLink = styled.a`
  display: inline-block;
  margin-top: 0.625em;
  color: ${token.palette.orange.main};
  text-decoration: none;
  border-bottom: 1px solid ${token.palette.orange.main};

  > img {
    margin-right: 0.25em;
    position: relative;
    top: -2px;
  }

  &:hover {
    color: ${token.palette.orange.dark};
    border-bottom-color: ${token.palette.orange.dark};
  }
`;

const AddressButtons = styled.div`
  margin-top: 2em;
  display: flex;
  justify-content: center;
`;

const UnlinkedButton = styled.button`
  background-color: rgba(${token.palette.orange.mainRGB}, 0.1);
  box-sizing: border-box;
  color: ${token.palette.orange.main};
  border: 0;
  text-transform: uppercase;
  font-size: 0.825em;
  margin: 0 0.5em;
  cursor: pointer;

  padding: ${({ narrow }) => (narrow ? `0.725em 0.925em` : `0.725em 1.5em`)};

  ${({ disabled }) =>
    disabled
      ? `
    cursor: default;
    pointer-events: none;
  `
      : ``}
`;

const LinkedButton = styled(UnlinkedButton)`
  background-color: rgba(${token.palette.blue.lightRGB}, 0.1);
  color: ${token.palette.blue.main};
`;

const UnlinkedTrashIcon = styled.img`
  width: 1.25em;
  height: 1.25em;
  display: block;
`;

const LinkedCheckIcon = styled.img`
  width: 1.425em;
  height: 1.125em;
  display: inline-block;
  vertical-align: middle;
`;

const LinkedToLabel = styled.span`
  display: inline-block;
  vertical-align: middle;
  margin: 0 1em;
`;

const ImmutableXIcon = styled.img`
  display: inline-block;
  vertical-align: middle;
`;

const UnlinkedButtonActions = styled.div`
  margin-top: 1em;
`;

const LinkedButtonActions = styled.div`
  margin-bottom: 2.5em;
`;

function MintWallet(props) {
  return (
    <Wrapper>
      <Box>
        <Header>
          <div>
            <BoxTitle>Wallets</BoxTitle>
            <HeaderRow>
              <Subtitle>Learn about wallets</Subtitle>
              {/*
                <HardwareWalletLink onClick={props.onHardwareWalletClick}>
                  <HardwareWalletInfoIcon src="/imgs/icons/icon-info-orange.svg" />
                  <span>Hardware wallet?</span>
                </HardwareWalletLink>
              */}
            </HeaderRow>
          </div>
          <WalletStatus connecting={false} address={props.address} />
        </Header>
        <BoxContent>
          <InnerContent>
            {props.loading ? (
              <Loading>Loading...</Loading>
            ) : (
              <>
                {!props.address ? (
                  <>
                    <WalletIcon src="/imgs/mint/wallet-icon.svg" />
                    <p>No wallet detected. Connect your web wallet to get started.</p>
                    <ConnectButtonWrapper>
                      <ConnectButton address={props.address} variant="light-blue" />
                    </ConnectButtonWrapper>
                    <InfoText>
                      You need to link your wallet to Immutable X before we can mint your NFTs. Minting will occur at
                      the end of the Founder Sale
                    </InfoText>
                  </>
                ) : (
                  <>
                    <InnerBox>
                      <WalletIcon small src="/imgs/mint/wallet-icon.svg" />
                      <Address>{props.address}</Address>
                      <AddressButtons>
                        {props.linkedAddress ? (
                          <>
                            <LinkedButton disabled>
                              <LinkedCheckIcon src="/imgs/mint/check-blue.svg" />
                              <LinkedToLabel>Linked to</LinkedToLabel>
                              <ImmutableXIcon src="/imgs/mint/immutable-x-blue.svg" />
                            </LinkedButton>
                            <UnlinkedButton narrow onClick={props.onUnlinkWalletClick}>
                              <UnlinkedTrashIcon src="/imgs/mint/orange-trash-icon.svg" />
                            </UnlinkedButton>
                          </>
                        ) : (
                          <UnlinkedButton disabled>Unlinked</UnlinkedButton>
                        )}
                      </AddressButtons>
                    </InnerBox>

                    {!props.linkedAddress ? (
                      <UnlinkedButtonActions>
                        <PrimaryButton onClick={props.onLinkWalletClick}>
                          {!props.linking ? (
                            <span>Link a wallet to</span>
                          ) : (
                            <>
                              <LoadingIcon src="/imgs/icons/icon-loading-light.svg" />
                              <LinkingLabel>Linking</LinkingLabel>
                            </>
                          )}
                          <ImmutableXIcon src="/imgs/mint/immutable-x-white.svg" />
                        </PrimaryButton>

                        <div>
                          <HowToLink onClick={props.onHowToLinkClick}>
                            <HardwareWalletInfoIcon src="/imgs/icons/icon-info-orange.svg" />
                            <span>How to link?</span>
                          </HowToLink>
                        </div>
                      </UnlinkedButtonActions>
                    ) : (
                      <>
                        {(FEATURE_IMX_TRADING_ENABLED || FEATURE_TOKENTROVE_TRADING_ENABLED) && (
                          <LinkedButtonActions>
                            {FEATURE_IMX_TRADING_ENABLED && <PrimaryButton>Trade on immutable X</PrimaryButton>}
                            {FEATURE_TOKENTROVE_TRADING_ENABLED && (
                              <SecondaryButton>Trade on tokentrove</SecondaryButton>
                            )}
                          </LinkedButtonActions>
                        )}
                      </>
                    )}
                    <InfoText>
                      {props.linkedAddress
                        ? "Congratulations! You have linked your Ethereum Wallet with Immutable X"
                        : "You need to link your wallet to Immutable X before we can mint your NFTs. Minting will occur at the end of the Founder Sale"}
                    </InfoText>
                  </>
                )}
              </>
            )}
          </InnerContent>
        </BoxContent>
      </Box>
      <QuestionsInfo>If you have any questions, please refer to our blog post or contact support.</QuestionsInfo>
    </Wrapper>
  );
}

export default MintWallet;
