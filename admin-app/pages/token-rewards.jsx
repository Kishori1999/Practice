import React from "react";
import TokenRewardsPage from "../src/modules/token-rewards/TokenRewardsPage";

export default function TokenRewards(props) {
  const { allocatedOrders, customers } = props;

  return <TokenRewardsPage allocatedOrders={allocatedOrders} customers={customers} />;
}
