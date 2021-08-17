import React from "react";
import { Button, Divider } from "antd";

export default function IncentivesPage({
  activeMilestoneIdx,
  milestones,
  referrerBonuses,
  tokenBalance,
  totalPurchases,
  writeContracts,
}) {
  const confirmWithdrawBonus = () => {
    writeContracts.GuildOfGuardiansPreSale.withdrawBonus();
  };

  return (
    <div>
      <div
        style={{
          padding: 16,
          width: 600,
          margin: "auto",
          marginTop: 64,
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <Button
          type="primary"
          style={{ margin: "20", align: "centre" }}
          name="withdraw"
          block
          size="large"
          onClick={() => confirmWithdrawBonus()}
        >
          WITHDRAW BONUS
        </Button>
        <Divider />
        <h1>Incentives</h1>
        <Divider />
        Referrer Bonuses (ETH): {referrerBonuses}
        <br />
        TotalPurchases ($): {totalPurchases.toFixed(2)}
        <br />
        TokenBalance: {tokenBalance}
        <Divider />
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Target, $</th>
            </tr>
          </thead>
          <tbody>
            {milestones.map((milestone, idx) => (
              <tr key={milestone} style={{ fontWeight: idx === activeMilestoneIdx ? "bold" : "unset" }}>
                <td>{idx + 1}</td>
                <td>{milestone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
