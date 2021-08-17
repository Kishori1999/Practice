import React from "react";
import styled from "styled-components";
import { ButtonStyles } from "./Button";
import { Link } from "../../components";

const BuyButton = styled.a`
  ${ButtonStyles}
`;

const BuyButtonLink = ({ className }) => (
  <Link href="/store" passHref>
    <BuyButton className={className}>BUY NOW</BuyButton>
  </Link>
);

export default BuyButtonLink;
