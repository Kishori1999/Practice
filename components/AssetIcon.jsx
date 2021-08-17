import React from "react";

export function getIcon(id) {
  return <img src={`/imgs/icons/${id}.svg`} alt="" />;
}

const AssetIcon = ({ id }) => {
  return <img src={`/imgs/icons/${id}.svg`} alt="" />;
};

export default AssetIcon;
