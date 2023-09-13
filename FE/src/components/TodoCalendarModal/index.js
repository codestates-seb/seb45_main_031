import { styled } from "styled-components";
import { Calendar } from "react-calendar";

import ModalBackground from "../ModalBackground";

const TodoCalendarModal = ({ date, changeDate }) => {
  return (
    <>
      <CalendarModal onChange={(e) => changeDate(e)} value={date} />
      <ModalBackground />
    </>
  );
};

export default TodoCalendarModal;

const CalendarModal = styled(Calendar)`
  width: 390px;

  border-radius: 15px;

  position: absolute;
  top: 115px;

  z-index: 100;
`;
