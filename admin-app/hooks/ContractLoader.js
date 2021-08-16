import { Contract } from "@ethersproject/contracts";
import { useState, useEffect } from "react";

const loadContract = (contractName, signer) => {
  const newContract = new Contract(
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(`../contracts/${contractName}.address.js`),
    // eslint-disable-next-line global-require,import/no-dynamic-require
    require(`../contracts/${contractName}.abi.js`),
    signer,
  );
  try {
    // eslint-disable-next-line global-require,import/no-dynamic-require
    newContract.bytecode = require(`../contracts/${contractName}.bytecode.js`);
  } catch (e) {
    console.log(e);
  }
  return newContract;
};

export default function useContractLoader(providerOrSigner) {
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

          // eslint-disable-next-line global-require,import/no-dynamic-require,import/no-unresolved
          const contractList = require("../contracts/contracts.js");

          const newContracts = contractList.reduce((accumulator, contractName) => {
            accumulator[contractName] = loadContract(contractName, signer);
            return accumulator;
          }, {});
          setContracts(newContracts);
        } catch (e) {
          console.log("ERROR LOADING CONTRACTS!!", e);
        }
      }
    }
    loadContracts();
  }, [providerOrSigner]);
  return contracts;
}
