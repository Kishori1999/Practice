import styled from "styled-components";
import token, { devices } from "../../styles/token";

const SectionHeading = styled.li`
  position: relative;
  font-size: ${token.fontSizes.h3};
  margin-top: 2em;
  counter-increment: section;
  font-weight: bold;

  ::before {
    position: relative;
    content: counters(section, ".") ". ";

    @media ${devices.md} {
      position: absolute;
      left: -2em;
    }
  }

  @media ${devices.md} {
    font-size: ${token.fontSizes.h4};
  }
`;

const IntroHeading = styled.h3`
  font-size: ${token.fontSizes.h4};
  margin-top: 2em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.big};
  }
`;

const Anchor = styled.a`
  color: ${token.palette.blue.dark};
`;

const Paragraph = styled.p`
  overflow-wrap: break-word;
  font-size: ${token.fontSizes.h4};
  line-height: 1.8em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.base};
  }
`;

const CommonList = styled.ol`
  margin-top: 0.5em;
  list-style: none outside none;
  counter-reset: sectionitem;
`;

const MainList = styled(CommonList)`
  padding-left: 0;
`;

const List = styled(CommonList)`
  padding-left: 5em;

  ${MainList} > ol > & {
    padding-left: 3em;
  }

  @media ${devices.md} {
    padding-left: 3em;
  }
`;

const ListItem = styled.li`
  position: relative;
  counter-increment: sectionitem;

  font-size: ${token.fontSizes.h4};
  line-height: 1.8em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.base};
  }

  ::before {
    position: absolute;
    left: -2.5em;
    content: counter(section) "." counter(sectionitem);

    @media ${devices.md} {
      font-size: ${token.fontSizes.base};
      top: 0.12em;
      left: -3em;
    }
  }

  ol > ol > ol > &::before {
    content: "(" counter(sectionitem, lower-alpha) ")";
    left: -2em;
  }

  ol > ol > ol > ol > &::before {
    content: "(" counter(sectionitem) ")";
  }
`;

export { ListItem, List, MainList, Paragraph, IntroHeading, SectionHeading, Anchor };
