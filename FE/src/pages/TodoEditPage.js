import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Calendar } from "react-calendar";

import "react-calendar/dist/Calendar.css";

import getDateFormat from "../utils/getDateFormat";
import { tags } from "../data/tags";
import {
  URL,
  DEFAULT_TODO_EMOJI,
  TODO_EDIT_TITLE,
  TIP_TITLE,
  TODO_TIPS,
} from "../data/constants";
import countContentLength from "../utils/countContentLength";
import TagModal from "../components/TagModal";
import ModalBackground from "../components/ModalBackground";
import ErrorModal from "../components/ErrorModal";
import EditEmojiModal from "../components/EditEmojiModal";
import TodoEditPost from "../components/TodoEditPost";
import EditTipContents from "../components/EditTipContents";

const TodoEditPage = () => {
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("localUser"));
  const memberId = localUser.memberId;
  const accessToken = localUser.accessToken;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [todoEmoji, setTodoEmoji] = useState(DEFAULT_TODO_EMOJI);
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState("");
  const [todoTag, setTodoTag] = useState("");
  const [date, setDate] = useState(getDateFormat());
  const [errorMessage, setErrorMessage] = useState("");
  const [inputCount, setInputCount] = useState(0);

  const emojiModalOpen = () => {
    setIsOpenModal(true);
    setIsOpenModalBack(true);
  };

  const emojiModalClose = () => {
    setIsOpenModal(false);
    setIsOpenModalBack(false);
  };

  const changeTodoEmoji = (value) => {
    setTodoEmoji(value.emoji);
  };

  const changeName = (value) => {
    setContent(value);
    setInputCount(countContentLength(value));
  };

  const tagModalOpen = () => {
    setIsOpenTagModal(true);
    setIsOpenModalBack(true);
  };

  const tagModalClose = () => {
    setIsOpenTagModal(false);
    setIsOpenModalBack(false);
  };

  const changeTag = (tagName) => {
    setTagId(tags[tagName]);
    setTodoTag(tagName);

    tagModalClose();
  };

  const calendarOpen = () => {
    setIsOpenCalender(true);
    setIsOpenModalBack(true);
  };

  const changeDate = (value) => {
    setDate(value);

    setIsOpenCalender(false);
    setIsOpenModalBack(false);
  };

  const openErrorModal = (message) => {
    try {
      setErrorMessage(message);
      setIsOpenErrorModal(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeErrorModal = () => {
    setErrorMessage("");
    setIsOpenErrorModal(false);
    setIsOpenModalBack(false);
  };

  const postTodo = async () => {
    try {
      if (content === "") {
        return openErrorModal("할 일 이름은 필수 항목 입니다.");
      }
      if (inputCount > 60) {
        return openErrorModal("할 일 이름의 최대 글자수를 초과하였습니다.");
      }
      if (tagId === "") {
        return openErrorModal("태그는 필수 항목 입니다.");
      }
      if (getDateFormat() > getDateFormat(date)) {
        return openErrorModal("오늘보다 빠른 날짜는 선택할 수 없습니다.");
      }

      const newDate = getDateFormat(date);
      const newData = {
        memberId,
        content,
        tagId,
        todoEmoji,
        date: newDate,
      };

      await axios.post(`${URL}/todos`, newData, {
        headers: { Authorization: accessToken },
      });

      navigate(`/todo/${newDate}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoEditWrapper>
        {isOpenErrorModal && (
          <ErrorModal
            errorMessage={errorMessage}
            closeErrorModal={closeErrorModal}
          />
        )}
        {isOpenModal && (
          <EditEmojiModal
            todoEmoji={todoEmoji}
            emojiModalOpen={emojiModalOpen}
            emojiModalClose={emojiModalClose}
            changeTodoEmoji={changeTodoEmoji}
          />
        )}
        {isOpenCalender && (
          <CalendarModal onChange={(e) => changeDate(e)} value={date} />
        )}
        {isOpenTagModal && (
          <TagModal
            tags={Object.keys(tags)}
            tagModalClose={tagModalClose}
            changeTag={changeTag}
          />
        )}
        {isOpenModalBack && <ModalBackground />}
        <TodoEditSection>
          <EditTipContents
            TITLE={TODO_EDIT_TITLE}
            TIP_TITLE={TIP_TITLE}
            TIPS={TODO_TIPS}
          />
          <TodoEditPost
            tagModalOpen={tagModalOpen}
            emojiModalOpen={emojiModalOpen}
            changeName={changeName}
            todoTag={todoTag}
            todoEmoji={todoEmoji}
            content={content}
            date={date}
            calendarOpen={calendarOpen}
            inputCount={inputCount}
            postTodo={postTodo}
            navigate={navigate}
          />
        </TodoEditSection>
      </TodoEditWrapper>
    </>
  );
};

export default TodoEditPage;

const TodoEditWrapper = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarModal = styled(Calendar)`
  width: 390px;

  border-radius: 15px;

  position: absolute;
  top: 300px;

  z-index: 100;
`;

const TodoEditSection = styled.section`
  width: 430px;
  height: 100vh;

  background-color: #ececec;

  padding: 95px 0px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: auto;
`;
