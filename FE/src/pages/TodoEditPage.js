import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "react-calendar/dist/Calendar.css";

import authLoginCheck from "../utils/authLoginCheck";
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
import EditEmojiModal from "../components/EditEmojiModal";
import TodoEditPost from "../components/TodoEditPost";
import EditTipContents from "../components/EditTipContents";
import TodoCalendarModal from "../components/TodoCalendarModal";

const TodoEditPage = () => {
  const isLogin = authLoginCheck();
  if (!isLogin) {
    return window.location.replace("/login");
  }

  const navigate = useNavigate();
  const { accessToken } = JSON.parse(localStorage.getItem("localUser"));

  const [isOpenEmojiModal, setIsOpenEmojiModal] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [todoEmoji, setTodoEmoji] = useState(DEFAULT_TODO_EMOJI);
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState("");
  const [todoTag, setTodoTag] = useState("");
  const [date, setDate] = useState(getDateFormat());
  const [inputCount, setInputCount] = useState(0);

  const isEmojiModal = () => {
    setIsOpenEmojiModal(!isOpenEmojiModal);
  };

  const isTagModal = () => {
    setIsOpenTagModal(!isOpenTagModal);
  };

  const isCalendar = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const changeTodoEmoji = (value) => {
    setTodoEmoji(value.emoji);
  };

  const changeName = (value) => {
    setContent(value);
    setInputCount(countContentLength(value));
  };

  const changeTag = (tagName) => {
    setTagId(tags[tagName]);
    setTodoTag(tagName);

    isTagModal();
  };

  const changeDate = (value) => {
    setDate(value);

    isCalendar();
  };

  const postTodo = async () => {
    try {
      if (content === "") {
        return alert("할 일 이름은 필수 항목 입니다.");
      }
      if (inputCount > 60) {
        return alert("할 일 이름의 최대 글자수를 초과하였습니다.");
      }
      if (tagId === "") {
        return alert("태그는 필수 항목 입니다.");
      }
      if (getDateFormat() > getDateFormat(date)) {
        return alert("오늘보다 빠른 날짜는 선택할 수 없습니다.");
      }

      const newDate = getDateFormat(date);
      const newData = {
        content,
        tagId,
        todoEmoji,
        date: newDate,
      };

      await axios.post(`${URL}/todos`, newData, {
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
            TITLE={TODO_EDIT_TITLE}
            TIP_TITLE={TIP_TITLE}
            TIPS={TODO_TIPS}
          />
          <TodoEditPost
            isEdit={true}
            tagModalOpen={isTagModal}
            emojiModalOpen={isEmojiModal}
            changeName={changeName}
            todoTag={todoTag}
            todoEmoji={todoEmoji}
            content={content}
            date={date}
            calendarOpen={isCalendar}
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
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "HakgyoansimWoojuR";
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
