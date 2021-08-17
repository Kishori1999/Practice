import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import PaginationReact from "react-js-pagination";
import token from "../../styles/token";
import { ButtonStyles } from "../Button";

const widthMobile = "3em";
const width = "4.5em";
const PaginationStyles = styled.div`
  & {
    .pagination {
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      list-style: none;
      padding: 0;
    }

    .item {
      ${ButtonStyles}

      display: flex;
      justify-content: center;
      align-items: center;
      background: ${token.palette.dark.main};
      color: ${token.palette.blue.main};
      border: none;
      font-size: ${token.fontSizes.h4};
      height: ${widthMobile};
      width: ${widthMobile};
      padding: 0;
      margin-right: 1px;
      transition: color 0.5s ease-in-out;

      ::after {
        box-shadow: 0 0 5px 2px ${token.palette.blue.dark};
      }

      &.prevItem:hover,
      &.nextItem:hover {
        background: transparent;
        border: none;

        ::before {
          opacity: 0;
        }
      }

      @media ${token.collections.filterBreak} {
        font-size: ${token.fontSizes.xs};
        height: ${width};
        width: ${width};
      }
    }

    .item-active {
      background: ${token.gradients.button.main};
      color: ${token.palette.light.main};
    }

    .prevItem {
      background: transparent;
    }

    .nextItem {
      background: transparent;
    }
  }
`;

const Arrow = styled.button`
  display: flex;
  background: none;
  border: none;
  justify-content: center;
  align-items: center;
  font-size: ${token.fontSizes.h4};
  height: ${widthMobile};
  width: ${widthMobile};
  color: ${token.palette.blue.main};
  cursor: pointer;

  @media ${token.collections.filterBreak} {
    font-size: ${token.fontSizes.xs};
    height: ${width};
    width: ${width};
  }
`;

const Pagination = ({ activePage, onChange, itemsCountPerPage, totalItemsCount }) => {
  return (
    <PaginationStyles>
      <PaginationReact
        innerClass="pagination"
        itemClass="item"
        activeClass="item-active"
        itemClassPrev="prevItem"
        itemClassNext="nextItem"
        prevPageText={
          <Arrow>
            <FontAwesomeIcon icon={faChevronLeft} />
          </Arrow>
        }
        nextPageText={
          <Arrow>
            <FontAwesomeIcon icon={faChevronRight} />
          </Arrow>
        }
        activePage={activePage}
        itemsCountPerPage={itemsCountPerPage}
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={3}
        onChange={onChange}
        hideFirstLastPages
      />
    </PaginationStyles>
  );
};

export default Pagination;
