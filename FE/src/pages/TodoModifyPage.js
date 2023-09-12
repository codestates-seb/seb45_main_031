import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Calendar } from "react-calendar";

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
import ModalBackground from "../components/ModalBackground";
import countContentLength from "../utils/countContentLength";
import EditEmojiModal from "../components/EditEmojiModal";
import EditTipContents from "../components/EditTipContents";
import TodoEditPost from "../components/TodoEditPost";

const TodoModifyPage = () => {
  const { todoId } = useParams();
  const navigate = useNavigate();
  const localUser = JSON.parse(localStorage.getItem("localUser"));
  const accessToken = localUser.accessToken;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
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

  const changeTag = (value) => {
    setTagId(tags[value]);
    setTodoTag(value);

    tagModalClose();
  };

  const calendarOpen = () => {
    setIsOpenCalender(true);
    setIsOpenModalBack(true);
  };

  function changeDate(value) {
    setDate(value);

    setIsOpenCalender(false);
    setIsOpenModalBack(false);
  }

  const openErrorModal = (message) => {
    setErrorMessage(message);
    setIsOpenErrorModal(true);
    setIsOpenModalBack(true);
  };

  const closeErrorModal = () => {
    setErrorMessage("");
    setIsOpenErrorModal(false);
    setIsOpenModalBack(false);
  };

  const patchTodo = async () => {
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
      <TodoEditBody>
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
          <CalendarModal onChange={(event) => changeDate(event)} value={date} />
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
            TITLE={TODO_MODIFY_TITLE}
            TIP_TITLE={TIP_TITLE}
            TIPS={TODO_TIPS}
          />
          <TodoEditPost
            emojiModalOpen={emojiModalOpen}
            changeName={changeName}
            tagModalOpen={tagModalOpen}
            todoEmoji={todoEmoji}
            date={date}
            calendarOpen={calendarOpen}
            content={content}
            todoTag={todoTag}
            inputCount={inputCount}
            postTodo={patchTodo}
            navigate={navigate}
          />
        </TodoEditSection>
      </TodoEditBody>
    </>
  );
};

export default TodoModifyPage;

const TodoEditBody = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorModal = styled.div`
  width: 390px;
  height: 150px;

  border-radius: 15px;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: absolute;
  top: 350px;

  z-index: 100;
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
