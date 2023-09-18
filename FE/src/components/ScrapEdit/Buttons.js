import { styled } from "styled-components";

import { CANCEL_TEXT, SCRAP_BUTTON } from "../../data/constants";

const Buttons = ({ postScrapTodo, navigate }) => {
  return (
    <>
      <ButtonSection>
        <Button onClick={() => postScrapTodo()}>{SCRAP_BUTTON}</Button>
        <Button onClick={() => navigate("/community")}>{CANCEL_TEXT}</Button>
      </ButtonSection>
    </>
  );
};

export default Buttons;

const ButtonSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const Button = styled.button`
  width: 150px;

  margin: 10px;
  padding: 10px 15px;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
