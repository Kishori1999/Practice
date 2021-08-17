import React, { useState } from "react";
import styled from "styled-components";
import MintWallet from "./MintWallet";
// import HardwareWalletModal from "./HardwareWalletModal";
import { useImmutableX } from "../../hooks/useImmutableX";
import ConnectionErrorModal from "./ConnectionErrorModal";
import HowToLinkModal from "./HowToLinkModal";

const Container = styled.div`
  position: relative;
  height: 100%;
`;

const WalletWrapper = styled.div`
  padding: 100px 32px;
  display: grid;
  place-items: center;
  position: relative;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 40%;
    padding-top: 51%;
    background-image: url(/imgs/mint/mint-bg-crystals.png);
    background-size: contain;
    background-position: top left;
    background-repeat: no-repeat;
  }
`;

function MintPage({ address }) {
  const walletAddress = address === "" ? null : address;
  const { loading, linking, linkError, linkWallet, unlinkWallet, clearLinkError, linkedAddress } = useImmutableX(
    walletAddress,
  );
  // const [hwWalletModalVisible, setHwModalVisible] = useState(false);
  const [howToLinkModalVisible, setHowToLinkModalVisible] = useState(false);

  // const handleHardwareWalletClick = () => setHwModalVisible(true);
  const handleHowToLinkClick = () => setHowToLinkModalVisible(true);

  return (
    <Container>
      <WalletWrapper>
        <MintWallet
          loading={loading}
          linking={linking}
          address={walletAddress}
          linkedAddress={linkedAddress}
          /* onHardwareWalletClick={handleHardwareWalletClick} */
          onLinkWalletClick={linkWallet}
          onUnlinkWalletClick={unlinkWallet}
          onHowToLinkClick={handleHowToLinkClick}
        />
        {/* hwWalletModalVisible && <HardwareWalletModal onClose={() => setHwModalVisible(false)} /> */}
        {howToLinkModalVisible && <HowToLinkModal onClose={() => setHowToLinkModalVisible(false)} />}
        {linkError && <ConnectionErrorModal onClose={clearLinkError} error={linkError} />}
      </WalletWrapper>
    </Container>
  );
}

export default MintPage;
