import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import "react-calendar/dist/Calendar.css"; // css import

import getDateFormat from "../utils/getDateFormat";
import { tags } from "../data/tags";
import {
  URL,
  TIP_TITLE,
  TODO_MODIFY_TITLE,
  TODO_TIPS,
} from "../data/constants";
import TagModal from "../components/TagModal";
import countContentLength from "../utils/countContentLength";
import EditEmojiModal from "../components/EditEmojiModal";
import EditTipContents from "../components/EditTipContents";
import TodoEditPost from "../components/TodoEditPost";
import TodoCalendarModal from "../components/TodoCalendarModal";
import ErrorModal from "../components/ErrorModal";

const TodoModifyPage = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("localUser"));
  const accessToken = localUser.accessToken;

  const [isOpenEmojiModal, setIsOpenEmojiModal] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [todoEmoji, setTodoEmoji] = useState("");
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState("");
  const [todoTag, setTodoTag] = useState("");
  const [date, setDate] = useState(getDateFormat());
  const [errorMessage, setErrorMessage] = useState("");
  const [inputCount, setInputCount] = useState(0);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${URL}/todos/single/${todoId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setTodoTag(data.tagResponse.tagName);
      setTagId(tags[data.tagResponse.tagName]);
      setContent(data.content);
      setInputCount(countContentLength(data.content));
      setTodoEmoji(data.todoEmoji);
    } catch (error) {
      console.error(error);
    }
  };

  const isEmojiModal = () => {
    setIsOpenEmojiModal(!isOpenEmojiModal);
  };

  const isTagModal = () => {
    setIsOpenTagModal(!isOpenTagModal);
  };

  const isCalendar = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const isErrorModal = (message) => {
    setErrorMessage(message);
    setIsOpenErrorModal(!isOpenErrorModal);
  };

  const changeTodoEmoji = (value) => {
    setTodoEmoji(value.emoji);
  };

  const changeName = (value) => {
    setContent(value);
    setInputCount(countContentLength(value));
  };

  const changeTag = (value) => {
    setTagId(tags[value]);
    setTodoTag(value);

    isTagModal();
  };

  function changeDate(value) {
    setDate(value);

    isCalendar();
  }

  const patchTodo = async () => {
    try {
      if (content === "") {
        return isErrorModal("할 일 이름은 필수 항목 입니다.");
      }
      if (inputCount > 60) {
        return isErrorModal("할 일 이름의 최대 글자수를 초과하였습니다.");
      }
      if (tagId === "") {
        return isErrorModal("태그는 필수 항목 입니다.");
      }

      const newDate = getDateFormat(date);
      const newData = {
        content,
        todoEmoji,
        tagId,
        date: newDate,
      };

      await axios.patch(`${URL}/todos/${todoId}`, newData, {
        headers: { Authorization: `Bearer ${accessToken}` },
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
            closeErrorModal={isErrorModal}
          />
        )}
        {isOpenEmojiModal && (
          <EditEmojiModal
            todoEmoji={todoEmoji}
            emojiModalOpen={isEmojiModal}
            emojiModalClose={isEmojiModal}
            changeTodoEmoji={changeTodoEmoji}
          />
        )}
        {isOpenCalender && (
          <TodoCalendarModal changeDate={changeDate} date={date} />
        )}
        {isOpenTagModal && (
          <TagModal
            tags={Object.keys(tags)}
            tagModalClose={isTagModal}
            changeTag={changeTag}
          />
        )}
        <TodoEditSection>
          <EditTipContents
            TITLE={TODO_MODIFY_TITLE}
            TIP_TITLE={TIP_TITLE}
            TIPS={TODO_TIPS}
          />
          <TodoEditPost
            emojiModalOpen={isEmojiModal}
            changeName={changeName}
            tagModalOpen={isTagModal}
            todoEmoji={todoEmoji}
            date={date}
            calendarOpen={isCalendar}
            content={content}
            todoTag={todoTag}
            inputCount={inputCount}
            postTodo={patchTodo}
            navigate={navigate}
          />
        </TodoEditSection>
      </TodoEditWrapper>
    </>
  );
};

export default TodoModifyPage;

const TodoEditWrapper = styled.body`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoEditSection = styled.section`
  width: 100%;
  max-width: 430px;

  background-color: #ececec;

  padding-top: 80px;
  padding-bottom: 180px;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: auto;
`;
