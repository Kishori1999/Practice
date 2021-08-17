import { useCallback, useEffect, useState } from "react";
import { Link } from "@imtbl/imx-link-sdk";
import { IMX_LINK } from "../../constants";

const immutableStorageKey = "immutable-linked-address";

export function useImmutableX(walletAddress) {
  const [loading, setLoading] = useState(true);
  const [linking, setLinking] = useState(false);
  const [linkedAddress, setLinkedAddress] = useState(null);
  const [linkError, setLinkError] = useState(null);

  useEffect(() => {
    if (window !== undefined && walletAddress) {
      const storageLinkedAddress = localStorage.getItem(immutableStorageKey);
      setLinkedAddress(storageLinkedAddress === walletAddress.toLowerCase() ? storageLinkedAddress : null);
      setLoading(false);
    }
  }, [walletAddress]);

  const linkWallet = useCallback(async () => {
    if (!walletAddress) {
      throw new Error("Wallet could not be connected without valid address");
    }
    try {
      setLinking(true);
      const link = new Link(IMX_LINK);
      const { address } = await link.setup({});

      localStorage.setItem(immutableStorageKey, address);
      setLinkedAddress(address);
    } catch (e) {
      setLinkError(e.message);
    } finally {
      setLinking(false);
    }
  }, [walletAddress]);

  const unlinkWallet = () => {
    localStorage.setItem(immutableStorageKey, null);
    setLinkedAddress(null);
  };

  return {
    loading,
    linking,
    linkError,
    linkWallet,
    linkedAddress,
    clearLinkError: () => setLinkError(null),
    unlinkWallet,
  };
}
