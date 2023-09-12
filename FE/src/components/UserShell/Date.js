import { styled } from "styled-components";

import getDateFormat from "../../utils/getDateFormat";
import { DATE_OPEN_TEXT, DATE_CLOSE_TEXT } from "../../data/constants";

const Date = ({ date, openCalender, isOpenCalender }) => {
  return (
    <>
      <DateSection>
        <DateText>{getDateFormat(date)}</DateText>
        <DateButton
          onClick={() => {
            openCalender();
          }}
        >
          {isOpenCalender ? DATE_CLOSE_TEXT : DATE_OPEN_TEXT}
        </DateButton>
      </DateSection>
    </>
  );
};

export default Date;

const DateSection = styled.section`
  width: 100%;
  height: 40px;

  padding: 120px 20px 20px 20px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateText = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DateButton = styled.button`
  color: #949597;

  &:hover {
    color: #676767;
  }
`;
