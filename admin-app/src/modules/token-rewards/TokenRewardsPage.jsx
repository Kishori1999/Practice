import _ from "lodash";
import React from "react";
import { Product } from "../../../constants";

function AllocatedOrder({ allocatedOrder }) {
  const { _id, order, orderPrice, tokenReward } = allocatedOrder;
  const normalizedOrder = order.reduce((result, amount, idx) => {
    if (amount > 0) {
      const heroType = Object.keys(Product)[idx];
      result.push({ heroType, amount });
    }
    return result;
  }, []);
  return (
    <>
      <tr>
        <td>{_id}</td>
        <td align="right">{Number(orderPrice).toFixed(2)}</td>
        <td align="right">{Number(tokenReward).toFixed(2)}</td>
        <td />
        <td />
      </tr>
      {normalizedOrder.map(({ heroType, amount }) => (
        <tr key={heroType}>
          <td />
          <td />
          <td />
          <td>{heroType}</td>
          <td align="right">{amount}</td>
        </tr>
      ))}
    </>
  );
}

function AddressStats({ allocatedOrders, orderPriceTotal, owner, tokenRewardTotal }) {
  return (
    <>
      <tr title={`${owner} - ${orderPriceTotal.toFixed(2)}$`}>
        <td>{owner}</td>
        <td align="right">{orderPriceTotal.toFixed(2)}</td>
        <td align="right">{tokenRewardTotal.toFixed(2)}</td>
        <td />
        <td />
      </tr>
      {allocatedOrders.map(allocatedOrder => (
        <AllocatedOrder key={allocatedOrder._id} allocatedOrder={allocatedOrder} />
      ))}
    </>
  );
}

export default function TokenRewardsPage({ allocatedOrders, customers }) {
  const sortedCustomers = _.sortBy(customers || [], "owner");
  return (
    <div>
      <div
        style={{
          padding: 16,
          margin: "auto",
        }}
      >
        <h3>Purchases</h3>
        <table border={1}>
          <thead>
            <tr>
              <th>Owner address / Order ID</th>
              <th>OrderPrice($)</th>
              <th>TokenReward</th>
              <th>HeroType</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedCustomers.map(({ owner, orderPriceTotal, tokenRewardTotal }) => (
              <AddressStats
                key={owner}
                allocatedOrders={allocatedOrders.filter(allocatedOrder => allocatedOrder.owner === owner)}
                orderPriceTotal={orderPriceTotal}
                owner={owner}
                tokenRewardTotal={tokenRewardTotal}
              />
            ))}
          </tbody>
        </table>
        <br />
      </div>
    </div>
  );
}
