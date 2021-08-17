import React from "react";
import Link from "../Link";

const Pet = ({ pet }) => {
  return (
    <div
      style={{
        padding: 16,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        width: 200,
        height: 200,
        border: "1px solid #6b5b95",
      }}
    >
      <h2>
        <Link href={`details/${pet.url}`}>
          <a>{pet.name}</a>
        </Link>
      </h2>
      <h3>{pet.petClass}</h3>
      <span>{pet.petEffect}</span>
      <span>{pet.petEffect2}</span>
    </div>
  );
};

export default Pet;
