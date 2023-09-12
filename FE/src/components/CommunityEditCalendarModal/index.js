import { styled } from "styled-components";
import { Calendar } from "react-calendar";

import getDateFormat from "../../utils/getDateFormat";

import TodoGroup from "./TodoGroup";
import Date from "./Date";

import "react-calendar/dist/Calendar.css";

const CommunityEditCalendarModal = ({
  getTodoList,
  closeCalender,
  todoList,
  date,
}) => {
  return (
    <CalenderWrapper>
      <Date date={date} closeCalender={closeCalender} />
      <CalenderSection
        onChange={(event) => {
          getTodoList(getDateFormat(event));
        }}
      />
      <TodoGroup todoList={todoList} />
    </CalenderWrapper>
  );
};

export default CommunityEditCalendarModal;

const CalenderWrapper = styled.body`
  width: 390px;
  height: 650px;

  background-color: #ffffff;

  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;

  position: absolute;
  top: 115px;

  z-index: 100;
`;

const CalenderSection = styled(Calendar)`
  width: 390px;
`;
