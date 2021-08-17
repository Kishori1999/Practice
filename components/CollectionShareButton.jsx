import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import token, { devices } from "../styles/token";
import ActionCallButton from "./ActionCallButton";

const CopyButton = styled(ActionCallButton)`
  padding: 0;
  width: 100%;
  height: 5rem;
  @media ${devices.md} {
    height: 4rem;
    width: 100%;
  }
`;

const CollectionShareButton = ({ link }) => {
  return (
    <CopyButton
      onClick={() => {
        navigator.clipboard.writeText(link);
      }}
    >
      SHARE COLLECTION
      <FontAwesomeIcon size="1x" color={token.palette.light.main} icon={faCopy} />
    </CopyButton>
  );
};

export default CollectionShareButton;
