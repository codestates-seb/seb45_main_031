import { styled } from "styled-components";

import { CANCEL_TEXT, EDIT_TEXT } from "../../data/constants";

const Buttons = ({ navigate, postFeed }) => {
  return (
    <ButtonGroup>
      <Button
        bgColor="#ECECEC"
        hoverColor="#D0D0D0"
        onClick={() => navigate("/community")}
      >
        {CANCEL_TEXT}
      </Button>
      <Button bgColor="#ffe866" hoverColor="#ffd900" onClick={() => postFeed()}>
        {EDIT_TEXT}
      </Button>
    </ButtonGroup>
  );
};

export default Buttons;

const ButtonGroup = styled.div`
  margin-top: 40px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 115px;
  height: 35px;

  font-size: 0.85rem;

  background-color: ${(props) => props.bgColor};

  margin: 10px;
  border-radius: 15px;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;
