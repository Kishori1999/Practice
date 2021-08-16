import React, { useState } from "react";
import { JsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { formatEther } from "@ethersproject/units";
import { Button, Col, Row } from "antd";
import {
  useBalance,
  useContractLoader,
  useExchangePrice,
  useGasPrice,
  useResourceFetcher,
  useUserProvider,
} from "../hooks";
import { Transactor } from "../helpers";
import { INFURA_ID, NETWORKS } from "../constants";

// Styles
import GlobalStyle from "../src/styles/GlobalStyle";
import Layout from "../src/components/Layout";
import { WindowDimensionsProvider } from "../src/hooks/useWindowDimensions";
import { Web3ModalProvider } from "../src/hooks/useWeb3Modal";

// TODO: Delete me before going live
import { Account, Faucet, GasGauge, Ramp } from "../components";

const targetNetwork = NETWORKS[process.env.NEXT_PUBLIC_DEFAULT_NETWORK || "localhost"];
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1340";

const isLocalNetwork = targetNetwork.name === "localhost";

const DEBUG = false;

// providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

const mainnetProvider = new JsonRpcProvider("https://mainnet.infura.io/v3/" + INFURA_ID);
const localProviderUrl = targetNetwork.rpcUrl;
const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
const localProvider = localProviderUrlFromEnv.includes("wss")
  ? new WebSocketProvider(localProviderUrlFromEnv)
  : new JsonRpcProvider(localProviderUrlFromEnv);

// 🔭 block explorer URL
const blockExplorer = targetNetwork.blockExplorer;

function MyApp({ Component, pageProps, router }) {
  // Hooks from: https://www.npmjs.com/package/eth-hooks
  const [injectedProvider, setInjectedProvider] = useState();
  // Get price of ETH from Uniswap:
  const price = useExchangePrice(targetNetwork, mainnetProvider);
  // Get gas price from EtherGasStation
  const gasPrice = useGasPrice(targetNetwork, "fast"); // 1000000000 for xdai
  // Use injected provider from Metamask if present, otherwise, generate a burner wallet.
  const userProvider = useUserProvider(isLocalNetwork, injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  // The transactor wraps transactions and provides notifications
  const tx = Transactor(userProvider, gasPrice);

  // Get account balance:
  const yourLocalBalance = useBalance(localProvider, address);
  if (DEBUG) console.log("💵 yourLocalBalance", yourLocalBalance ? formatEther(yourLocalBalance) : "...");

  // Load in your local contract and read a value from it:
  const readContracts = useContractLoader(localProvider);
  if (DEBUG) console.log("📝 readContracts", readContracts);

  // To write to contracts use the userProvider:
  const writeContracts = useContractLoader(userProvider);
  if (DEBUG) console.log("🔐 writeContracts", writeContracts);

  const allocatedOrders = useResourceFetcher(`${backendUrl}/api/admin/allocated-orders`, true, undefined, 5000);
  const customers = useResourceFetcher(`${backendUrl}/api/admin/customers`, true, undefined, 5000);
  // TODO: Delete me before going live
  const renderAccount = () => {
    if (process.browser) {
      return (
        <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 10 }}>
          <Account
            address={address}
            localProvider={localProvider}
            userProvider={userProvider}
            mainnetProvider={mainnetProvider}
            price={price}
            blockExplorer={blockExplorer}
          />
        </div>
      );
    }
    return null;
  };

  const isSummoning = router.pathname.startsWith("/summonings") || router.pathname.startsWith("/share");
  const isStore = router.pathname.startsWith("/store");
  return (
    <>
      <GlobalStyle lockedLandscape={isSummoning} />
      <Web3ModalProvider setInjectedProvider={setInjectedProvider}>
        <WindowDimensionsProvider>
          <Layout
            autoHideHeader={!isStore}
            showCart={isStore}
            address={address}
            setInjectedProvider={setInjectedProvider}
          >
            <Component
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...pageProps}
              allocatedOrders={allocatedOrders || []}
              address={address}
              backendUrl={backendUrl}
              customers={customers}
              userProvider={userProvider}
              mainnetProvider={mainnetProvider}
              localProvider={localProvider}
              yourLocalBalance={yourLocalBalance}
              price={price}
              tx={tx}
              writeContracts={writeContracts}
              readContracts={readContracts}
            />
          </Layout>
        </WindowDimensionsProvider>
        {
          // * TODO: Delete me before going live
        }
        {isLocalNetwork && (
          <>
            <div>{renderAccount()}</div>
            <div style={{ position: "fixed", textAlign: "left", left: 0, bottom: 20, padding: 10 }}>
              <Row align="middle" gutter={[4, 4]}>
                <Col span={8}>
                  <Ramp price={price} address={address} />
                </Col>
                <Col span={8} style={{ textAlign: "center", opacity: 0.8 }}>
                  <GasGauge gasPrice={gasPrice} />
                </Col>
                <Col span={8} style={{ textAlign: "center", opacity: 1 }}>
                  <Button
                    onClick={() => {
                      window.open("https://t.me/joinchat/xxxxxxxxxxxxxx");
                    }}
                    size="large"
                    shape="round"
                  >
                    <span style={{ marginRight: 8 }} role="img" aria-label="support">
                      💬
                    </span>
                    Support
                  </Button>
                </Col>
              </Row>

              <Row align="middle" gutter={[4, 4]}>
                <Col span={24}>
                  {localProvider &&
                  localProvider.connection &&
                  localProvider.connection.url &&
                  localProvider.connection.url.indexOf("localhost") >= 0 &&
                  !process.env.REACT_APP_PROVIDER &&
                  price > 1 ? (
                    <Faucet localProvider={localProvider} price={price} ensProvider={mainnetProvider} />
                  ) : (
                    ""
                  )}
                </Col>
              </Row>
            </div>
          </>
        )}
        {
          // */
        }
      </Web3ModalProvider>
    </>
  );
}

export default MyApp;
