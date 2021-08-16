/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Menu } from "antd";
import { useRouter } from "next/router";
import Link from "./Link";

const Header = ({ assets }) => {
  const router = useRouter();
  const { query } = router;

  const boxedAssets = assets && assets.filter(asset => asset.boxed);

  return (
    <div>
      <Menu style={{ textAlign: "center" }} mode="horizontal">
        <Menu.Item key="/">
          <Link href={{ pathname: "/", query }}>
            <a>Purchase</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/collections">
          <Link href={{ pathname: "/collections", query }}>
            <a>My Collection</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/summonings">
          <Link href={{ pathname: "/summonings", query }}>
            <a>My Summonings ({boxedAssets && boxedAssets.length})</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/incentives">
          <Link href={{ pathname: "/incentives", query }}>
            <a>Incentives</a>
          </Link>
        </Menu.Item>
        <Menu.Item key="/token-rewards">
          <Link href={{ pathname: "/token-rewards", query }}>
            <a>Token rewards</a>
          </Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Header;
