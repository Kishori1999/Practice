import { Contract } from "@ethersproject/contracts";
import { useEffect, useState } from "react";

export default function useContractLoader(providerOrSigner, contractMetadata) {
  const [contracts, setContracts] = useState();
  useEffect(() => {
    async function loadContracts() {
      if (typeof providerOrSigner !== "undefined") {
        try {
          // we need to check to see if this providerOrSigner has a signer or not
          let signer;
          let accounts;
          if (providerOrSigner && typeof providerOrSigner.listAccounts === "function") {
            accounts = await providerOrSigner.listAccounts();
          }

          if (accounts && accounts.length > 0) {
            signer = providerOrSigner.getSigner();
          } else {
            signer = providerOrSigner;
          }

          const newContracts = Object.entries(contractMetadata).reduce(
            (accumulator, [contractName, { abi, address }]) => {
              accumulator[contractName] = new Contract(address, abi, signer);
              return accumulator;
            },
            {},
          );
          setContracts(newContracts);
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    }
    loadContracts();
  }, [providerOrSigner, contractMetadata]);
  return contracts;
}
