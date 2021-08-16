import { useState, useEffect } from "react";
import { ethers } from "ethers";

const useResolveName = (provider, ensName) => {
  const [address, setAddress] = useState(ethers.constants.AddressZero);

  useEffect(() => {
    if (provider) {
      provider.resolveName(ensName).then(resolvedAddress => setAddress(resolvedAddress));
    }
  }, [provider, ensName]);

  return address;
};

export default useResolveName;
