import React from "react";
import styled, { css } from "styled-components";
import { ButtonStyles } from "./Button";
import token, { devices } from "../styles/token";
import ClipBorder from "./ClipBorder";

const CallButtonStyles = css`
  ${ButtonStyles};

  position: relative;
  padding: 2em 5.5em;
  font-weight: 400;
  letter-spacing: 2px;
  font-size: ${token.fontSizes.base};

  @media ${devices.md} {
    font-size: ${token.fontSizes.xs};
  }
`;

const CallButton = styled.button`
  ${CallButtonStyles}
`;

const CallButtonLink = styled.a`
  ${CallButtonStyles};
  display: inline-block;
`;

const ActionCallButtonLink = ({ children, className, ...props }) => (
  <CallButtonLink className={className} {...props}>
    {children}
    <ClipBorder />
  </CallButtonLink>
);

// Using class because Next.js link component acts weirdly with functional ones
//
// eslint-disable-next-line react/prefer-stateless-function
class ActionCallButtonLinkClass extends React.Component {
  render() {
    return (
      <CallButtonLink className={this.props.className} {...this.props}>
        {this.props.children}
        <ClipBorder />
      </CallButtonLink>
    );
  }
}

const ActionCallButton = ({ children, href, className, ...props }) => {
  return (
    <CallButton className={className} {...props}>
      {children}
      <ClipBorder />
    </CallButton>
  );
};

export default ActionCallButton;
export { ActionCallButtonLink, CallButtonStyles, ActionCallButtonLinkClass };
