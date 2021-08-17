import React, { useState } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import token, { devices } from "../styles/token";

const QA = styled.div`
  display: grid;
  grid-template:
    "question arrow" auto
    "answer filler";
  grid-template-columns: auto 2em;
  padding: 0.2em 0 1.5em;
  border-bottom: 1px solid #c6c8cb;
  overflow: hidden;
  margin-top: 1em;

  @media ${devices.md} {
    padding-top: 1.5em;
    margin-top: 0;
  }
`;

const Question = styled.div`
  grid-area: question;
  font-size: ${token.fontSizes.h4};
  font-weight: 600;
  cursor: pointer;
  transition: all 300ms ease-in-out;
  padding-bottom: ${({ open }) => (open ? "1em" : 0)};

  @media ${devices.md} {
    font-size: ${token.fontSizes.big};
    font-weight: normal;
  }
`;
const Answer = styled.div`
  grid-area: answer;
  transition: all 300ms ease-in-out;
  height: ${({ open }) => (open ? "100%" : "0")};
  opacity: ${({ open }) => (open ? "1" : "0")};
  font-size: ${token.fontSizes.h4};
  line-height: 1.5em;

  @media ${devices.md} {
    font-size: ${token.fontSizes.accented};
  }
`;
const Arrow = styled.div`
  display: flex;
  grid-area: arrow;
  justify-content: center;
  cursor: pointer;
  font-size: 1.5em;
  padding-top: 0.3em;

  @media ${devices.md} {
    font-size: 1em;
    padding-top: 0.7em;
  }
`;

const QaItem = ({ question, answer }) => {
  const [open, setOpen] = useState(false);

  return (
    <QA>
      <Question open={open} onClick={() => setOpen(!open)}>
        {question}
      </Question>
      <Answer open={open}>{answer}</Answer>
      <Arrow onClick={() => setOpen(!open)}>
        <FontAwesomeIcon
          icon={faChevronDown}
          size="1x"
          style={{
            transition: "all 150ms ease-out",
            transform: `rotate(${open ? 0 : 90}deg)`,
          }}
        />
      </Arrow>
    </QA>
  );
};

const Heading = styled.h2`
  color: ${token.palette.dark.main};
  font-size: ${token.fontSizes.h3};
  padding-bottom: 1.35em;
  border-bottom: 1px solid #c6c8cb;
  margin-bottom: 0;
`;

const Section = styled.div`
  width: 100%;
  margin-top: 5.45em;
`;

const FaqSection = ({ id, name, questions }) => {
  const questionsList = questions.map(qa => <QaItem key={qa.question} question={qa.question} answer={qa.answer} />);
  return (
    <Section id={id}>
      <Heading>{name}</Heading>
      {questionsList}
    </Section>
  );
};

export default FaqSection;
