import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHome, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

import { Link } from "../../../components";
import TransparentButton from "./TransparentButton";
import token from "../../styles/token";

const InventoryButton = styled(TransparentButton)`
  && {
    letter-spacing: 0.1em;
    position: relative;
    padding: 1.25em 1.5em 1.25em 1em;
    cursor: ${({ clickable }) => (clickable ? "pointer" : "auto")};
    background: ${token.palette.dark.main};
    flex-grow: 1;
    font-weight: bold;
    font-size: 1.25rem;
    margin-left: 0.3em;
    @media ${token.summoning.mobileBreak} {
      font-weight: normal;
      padding: 1.25em 1.3em 1.25em 0.6em;
      font-size: 1rem;
    }

    @media ${token.summoning.menuBreak} {
      padding: 1em 2.4em 1em 1em;
    }
  }
`;

const HomeLink = styled.a`
  margin-right: 1em;
`;

const HomeButton = styled(TransparentButton)`
  && {
    padding: 1.25em 5em 1.25em 1.4em;
    letter-spacing: 0.1em;
    cursor: pointer;
    font-size: 1.25rem;
    background: ${token.palette.dark.main};
    font-weight: bold;
    @media ${token.summoning.mobileBreak} {
      padding: 1.25em 0.6em 1.25em 0.6em;
      font-weight: normal;
      font-size: 1rem;
    }

    @media ${token.summoning.menuBreak} {
      padding: 1em 1.4em;
    }
  }
`;

const Icon = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  bottom: 0;
  right: 0;
  font-size: 1.5rem;

  @media ${token.summoning.mobileBreak} {
    font-size: 1rem;
    right: -0.3em;
  }

  @media ${token.summoning.menuBreak} {
    font-size: 1rem;
    right: -1em;
  }
`;

const HomeIcon = styled.div`
  position: relative;
  margin-right: 1em;
  font-size: 1.3rem;
  @media ${token.summoning.mobileBreak} {
    font-size: 1rem;
    margin-right: 0.75em;
  }
`;

export const InventoryMenu = props => {
  const { onInventoryClick, inventoryOpen, inventoryClickable } = props;

  return (
    <>
      <Link href="/store">
        <HomeLink>
          <HomeButton>
            <HomeIcon>
              <FontAwesomeIcon size="1x" width={16} icon={faHome} />
            </HomeIcon>
            HOME
          </HomeButton>
        </HomeLink>
      </Link>
      <InventoryButton clickable={inventoryClickable} onClick={() => inventoryClickable && onInventoryClick()}>
        MY INVENTORY
        {inventoryClickable && (
          <Icon>
            <FontAwesomeIcon size="1x" width={16} icon={inventoryOpen ? faTimes : faBars} />
          </Icon>
        )}
      </InventoryButton>
    </>
  );
};
