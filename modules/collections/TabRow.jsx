import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import token, { devices } from "../../styles/token";
import DropdownSelect from "../../components/forms/DropdownSelect";

const bottomPadding = "1.6em";
const StyledButton = styled(Button)`
  font-size: ${token.fontSizes.xs};
  letter-spacing: 0.1em;
  background: ${({ active }) => (active ? "" : token.palette.dark.main)};
  border: 1px solid transparent;
  color: ${token.palette.light.main};
  padding-top: 1.65em;
  width: 13em;
  padding-bottom: ${({ active }) =>
    active ? `calc(${bottomPadding} + ${token.collections.searchPadding})` : bottomPadding};
  box-shadow: none;
  height: ${({ active }) =>
    active ? `calc(${token.collections.barHeight} + ${token.collections.searchPadding})` : token.collections.barHeight};

  :active,
  :focus {
    border: 1px solid transparent;
  }

  @media ${devices.sm} {
    width: 13em;
  }
`;

const Count = styled.span`
  color: ${({ active }) => (active ? token.palette.light.main : token.palette.blue.main)};
`;

const TabButton = ({ name, count, active, onClick }) => (
  <StyledButton onClick={onClick} active={active}>
    {name}
    <Count active={active}> ({count})</Count>
  </StyledButton>
);

const TabRowContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  width: 100%;
  padding-bottom: 7em;
  height: calc(${token.collections.barHeight} + ${token.collections.searchPadding});

  @media ${token.collections.filterBreak} {
    width: auto;
    margin-top: ${token.collections.searchPadding};
    padding-bottom: 0;
  }
`;

const ShowOnlyDesktopFilterBreak = styled.div`
  display: none;
  width: 100%;
  @media ${token.collections.filterBreak} {
    display: block;
  }
`;

const ShowOnlyMobileFilterBreak = styled.div`
  width: 100%;
  @media ${token.collections.filterBreak} {
    display: none;
  }
`;

const TabSelect = styled(DropdownSelect)`
  --dropdown-bg: ${token.gradients.button.main};
  --dropdown-padding: 1.1em 1em 0.9em 1.3em;
  --dropdown-width: 100%;
  --dropdown-font-size: ${token.fontSizes.big};
  --dropdown-text-align: center;

  @media ${token.collections.filterBreak} {
    --dropdown-bg: ${token.palette.light.main};
    --dropdown-width: 13em;
  }
`;

const StyledBlockContainer = styled.span`
  text-transform: uppercase;
  letter-spacing: ${token.collections.letterSpacing};
  font-weight: 600;
`;

const StyledBlock = ({ label, count, active }) => (
  <StyledBlockContainer>
    {label} <Count active={active}>({count})</Count>
  </StyledBlockContainer>
);

const TabRow = ({ onTabChange, tabs }) => {
  const active = tabs.find(t => t.active) || tabs[0];
  const headerContent = <StyledBlock label={active.label} count={active.count} active />;

  const options = tabs
    .filter(o => !o.active)
    .map(t => ({
      label: <StyledBlock label={t.label} count={t.count} />,
      value: t.value,
    }));

  return (
    <TabRowContainer>
      <ShowOnlyMobileFilterBreak>
        <TabSelect
          headerContent={headerContent}
          options={options}
          onSelect={o => onTabChange(o.value)}
          selected={active}
        />
      </ShowOnlyMobileFilterBreak>
      <ShowOnlyDesktopFilterBreak>
        {tabs.map(t => (
          <TabButton
            key={t.value}
            onClick={() => onTabChange(t.value)}
            name={t.label.toUpperCase()}
            count={t.count}
            active={t.active}
          />
        ))}
      </ShowOnlyDesktopFilterBreak>
    </TabRowContainer>
  );
};

export default TabRow;
