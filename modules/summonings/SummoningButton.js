import styled from "styled-components";
import ActionCallButton from "../../components/ActionCallButton";

const SummoningButton = styled(ActionCallButton)`
  && {
    font-size: 0.85rem;
    padding: 1.5em 1em;
    letter-spacing: 0.1em;
    line-height: 1em;
    font-weight: 600;
    width: 100%;
    min-width: 16em;
  }
`;

export default SummoningButton;
