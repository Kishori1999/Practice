import React from "react";
import Link from "../Link";

const Hero = ({ hero }) => {
  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: 200,
        height: 200,
        border: "1px solid #d64161",
      }}
    >
      <h2>
        <Link href={`details/${hero.url}`}>
          <a>{hero.name}</a>
        </Link>
      </h2>
      <h3>{hero.tagline}</h3>
      <span>
        {hero.element}
        {" / "}
      </span>
      <span>
        {" / "}
        {hero.rarity}
        {" / "}
      </span>
      <span>
        {" / "}
        {hero.faction}
      </span>
    </div>
  );
};

export default Hero;
