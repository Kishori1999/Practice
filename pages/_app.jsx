import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { StaticJsonRpcProvider, WebSocketProvider } from "@ethersproject/providers";
import { useUserAddress } from "eth-hooks";
import { ParallaxProvider } from "react-scroll-parallax";
import { Button, Col, Row } from "antd";
import { DefaultSeo } from "next-seo";
import { withErrorBoundary } from "@sentry/react";
import * as Sentry from "@sentry/react";
import axios from "axios";
import SEO from "../src/next-seo.config";
import {
  useAllocatedOrderByTxHashFetcher,
  useContractLoader,
  useExchangePrice,
  useGasPrice,
  useResourceFetcher,
  useUserProvider,
} from "../hooks";
import { createTransactionInfo, Transactor } from "../helpers";
import { backendUrl, NETWORKS, sentryDsn, TX_STATUS } from "../constants";
import * as gtag from "../helpers/gtag";

// Styles
import "../src/styles/fonts.css";
import GlobalStyle from "../src/styles/GlobalStyle";
import Layout from "../src/components/Layout";
import { WindowDimensionsProvider } from "../src/hooks/useWindowDimensions";
import { Web3ModalProvider } from "../src/hooks/useWeb3Modal";

// Components
import TransactionInfoBar from "../src/components/TransactionInfoBar";

// TODO: Delete me before going live
import "antd/dist/antd.css";
import { Account, Faucet, GasGauge, Ramp } from "../components";
import "../styles/globals.css";
import { CartProvider } from "../src/hooks/useCart";

Sentry.init({
  dsn: sentryDsn,
});

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status !== 404) {
      Sentry.captureException(error);
    }
    return Promise.reject(error);
  },
);

const DEBUG = false;

let localProvider;

// providers
if (DEBUG) console.log("📡 Connecting to Mainnet Ethereum");

const mainnetUrl = NETWORKS.mainnet.rpcUrl;
const mainnetProvider = mainnetUrl.includes("wss")
  ? new WebSocketProvider(mainnetUrl)
  : new StaticJsonRpcProvider(mainnetUrl);

function MyApp({ Component, pageProps, router }) {
  const nextRouter = useRouter();
  // Hooks from: https://www.npmjs.com/package/eth-hooks
  const [injectedProvider, setInjectedProvider] = useState();

  const networkData = useResourceFetcher(`${backendUrl}/api/network`, true, undefined, 0);

  const targetNetworkName = (networkData && networkData.networkName) || "mainnet";
  const contractMetadata = (networkData && networkData.contracts) || {};
  const isLocalNetwork = targetNetworkName === "localhost";

  const targetNetwork = NETWORKS[targetNetworkName];
  const localProviderUrl = targetNetwork.rpcUrl;
  const localProviderUrlFromEnv = process.env.REACT_APP_PROVIDER ? process.env.REACT_APP_PROVIDER : localProviderUrl;
  if (DEBUG) console.log("🏠 Connecting to provider:", localProviderUrlFromEnv);
  if (!localProvider && networkData) {
    console.log(`Connecting to ${targetNetworkName} network`);
    localProvider = localProviderUrlFromEnv.includes("wss")
      ? new WebSocketProvider(localProviderUrlFromEnv)
      : new StaticJsonRpcProvider(localProviderUrlFromEnv);
  }

  // 🔭 block explorer URL
  const blockExplorer = targetNetwork.blockExplorer;

  // Get price of ETH from Uniswap:
  const price = useExchangePrice(targetNetwork, mainnetProvider);
  // Get gas price from EtherGasStation
  const gasPrice = useGasPrice(targetNetwork, "fast"); // 1000000000 for xdai
  // Use injected provider from Metamask if present, otherwise, generate a burner wallet.
  const userProvider = useUserProvider(isLocalNetwork, injectedProvider, localProvider);
  const address = useUserAddress(userProvider);
  // The transactor wraps transactions and provides notifications
  const tx = Transactor(userProvider, gasPrice);

  // Load in your local contract and read a value from it:
  const readContracts = useContractLoader(localProvider, contractMetadata);
  if (DEBUG) console.log("📝 readContracts", readContracts);

  // To write to contracts use the userProvider:
  const writeContracts = useContractLoader(userProvider, contractMetadata);
  if (DEBUG) console.log("🔐 writeContracts", writeContracts);

  const allocatedOrders = useResourceFetcher(
    `${backendUrl}/api/addresses/${address}/allocated-orders`,
    address,
    address,
  );
  const fetchedStocks = useResourceFetcher(`${backendUrl}/api/stocks`, true);
  const assets = useResourceFetcher(`${backendUrl}/api/addresses/${address}/assets`, address, address);
  const customer = useResourceFetcher(`${backendUrl}/api/addresses/${address}/customers`, address, address);

  const stocks = _.keyBy(fetchedStocks || [], "product");

  const [latestTransaction, setLatestTransaction] = useState(createTransactionInfo(false, null));
  const lastAllocatedOrder = useAllocatedOrderByTxHashFetcher(backendUrl, address, 6000);

  useEffect(() => {
    if (!lastAllocatedOrder) return;
    let lastTx = localStorage.getItem("lastTx");
    if (lastTx) {
      lastTx = JSON.parse(localStorage.getItem("lastTx"));
      const ts = Date.now() - lastTx.timestamp;
      if (ts > 3600000) {
        localStorage.removeItem("lastTx");
      } else {
        const link = `https://etherscan.io/tx/${lastAllocatedOrder.transactionHash}`;
        const txStatus =
          lastAllocatedOrder.secondDiceRoll != null && lastAllocatedOrder.error === null
            ? TX_STATUS.DONE
            : TX_STATUS.PROCESSING;
        setLatestTransaction(createTransactionInfo(txStatus, link));
      }
    } else {
      setLatestTransaction(false, null);
    }
  }, [lastAllocatedOrder]);

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    nextRouter.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      nextRouter.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [nextRouter.events]);

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
          <CartProvider
            customer={customer}
            gasPrice={gasPrice}
            price={price}
            setLatestTransaction={setLatestTransaction}
            stocks={stocks}
            writeContracts={writeContracts}
          >
            <ParallaxProvider>
              <DefaultSeo {...SEO} />
              {isSummoning ? (
                <Component
                  {...pageProps}
                  readContracts={readContracts}
                  address={address}
                  assets={assets}
                  customer={customer}
                />
              ) : (
                <Layout
                  autoHideHeader={!isStore}
                  assets={assets}
                  address={address}
                  customer={customer}
                  setInjectedProvider={setInjectedProvider}
                  showCart={isStore}
                  stocks={stocks}
                >
                  <Component
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...pageProps}
                    allocatedOrders={allocatedOrders}
                    address={address}
                    assets={assets}
                    customer={customer}
                    stocks={stocks}
                    userProvider={userProvider}
                    mainnetProvider={mainnetProvider}
                    localProvider={localProvider}
                    price={price}
                    tx={tx}
                    writeContracts={writeContracts}
                    readContracts={readContracts}
                    setLatestTransaction={setLatestTransaction}
                  />
                  <TransactionInfoBar latestTransaction={latestTransaction} />
                </Layout>
              )}
            </ParallaxProvider>
          </CartProvider>
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

export default withErrorBoundary(MyApp);
