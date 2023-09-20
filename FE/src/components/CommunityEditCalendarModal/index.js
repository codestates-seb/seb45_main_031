import { styled } from "styled-components";
import { Calendar } from "react-calendar";

import getDateFormat from "../../utils/getDateFormat";

import TodoGroup from "./TodoGroup";
import Date from "./Date";

import "react-calendar/dist/Calendar.css";
import ModalBackground from "../ModalBackground";

const CommunityEditCalendarModal = ({
  getTodoList,
  closeCalender,
  todoList,
  date,
}) => {
  return (
    <>
      <CalenderWrapper>
        <Date date={date} closeCalender={closeCalender} />
        <CalenderSection
          onChange={(event) => {
            getTodoList(getDateFormat(event));
          }}
        />
        <TodoGroup todoList={todoList} />
      </CalenderWrapper>
      <ModalBackground />
    </>
  );
};

export default CommunityEditCalendarModal;

const CalenderWrapper = styled.body`
  width: 90%;
  max-width: 390px;
  max-height: 75%;

  background-color: #ffffff;

  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;

  position: absolute;
  top: 80px;

  z-index: 100;

  overflow: auto;
`;

const CalenderSection = styled(Calendar)`
  width: 390px;

  border: 1px solid #ffffff;
`;
