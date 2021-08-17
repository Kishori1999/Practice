import React from "react";
import { ethers } from "ethers";
import { NextSeo } from "next-seo";
import RewardsPage from "../src/modules/rewards/RewardsPage";
import { useContractReader, useResourceFetcher } from "../hooks";
import { backendUrl } from "../constants";

export default function Rewards({ address, customer, readContracts, writeContracts }) {
  const milestones = useResourceFetcher(`${backendUrl}/api/milestones`, true, undefined, 5000);
  const referrerBonuses = ethers.utils.formatEther(
    useContractReader(readContracts, "GuildOfGuardiansPreSale", "referrerBonuses", [address]) || 0,
  );

  const tokenBalance = ethers.utils.formatEther(
    useContractReader(readContracts, "GuardiansToken", "balanceOf", [address]) || 0,
  );

  const referralUrl = process.browser && address ? `${window.location.origin}?refcode=${address}` : "";

  return (
    <>
      <NextSeo title="Guild of Guardians - rewards" />
      <RewardsPage
        address={address}
        customer={customer}
        milestones={milestones}
        referralUrl={referralUrl}
        referrerBonuses={referrerBonuses}
        tokenBalance={tokenBalance}
        writeContracts={writeContracts}
      />
    </>
  );
}
