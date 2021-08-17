import React from "react";
import Link from "../Link";

const Token = ({ token }) => {
  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: 200,
        height: 200,
        border: "1px solid #000",
      }}
    >
      <h2>
        <Link href={`details/${token.url}`}>
          <a>{token.name}</a>
        </Link>
      </h2>
    </div>
  );
};

export default Token;
