import { styled } from "styled-components";

import { CLOSE_TEXT } from "../../data/constants";

const Date = ({ date, closeCalender }) => {
  return (
    <>
      <DateWrapper>
        <DateText>{date}</DateText>
        <CloseButton onClick={() => closeCalender()}>{CLOSE_TEXT}</CloseButton>
      </DateWrapper>
    </>
  );
};

export default Date;

const DateWrapper = styled.section`
  width: 100%;

  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

const DateText = styled.div`
  font-size: 1.2rem;
  color: #ffb039;

  margin-left: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;

  color: #949597;

  border: 1px solid #d0d0d0;
  border-radius: 15px;
  margin: 10px 10px 5px 0px;

  &:hover {
    background-color: #d0d0d0;
  }
`;
