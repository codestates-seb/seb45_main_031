import { styled } from "styled-components";

import CloseButton from "../CloseButton";

const Date = ({ date, closeCalender }) => {
  return (
    <>
      <DateWrapper>
        <DateText>{date}</DateText>
        <CloseButton isModal={closeCalender} />
      </DateWrapper>
    </>
  );
};

export default Date;

const DateWrapper = styled.section`
  width: 100%;

  padding-top: 10px;
  padding-left: 20px;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

const DateText = styled.div`
  width: 100%;
  height: 50px;

  font-size: 1.2rem;
  color: #949597;

  display: flex;
  align-items: center;
  justify-content: start;
`;
