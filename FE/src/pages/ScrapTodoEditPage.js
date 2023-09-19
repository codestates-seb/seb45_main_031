import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

import TodoCalendarModal from "../components/TodoCalendarModal";
import TagModal from "../components/TagModal";

import getDateFormat from "../utils/getDateFormat";
import authLoginCheck from "../utils/authLoginCheck";

import {
  DEFAULT_FILTER,
  DEFAULT_FILTER_LIST,
  SCRAP_TO_TODO_TEXT,
  URL,
} from "../data/constants";
import ScrapEdit from "../components/ScrapEdit";

const ScrapTodoEditPage = () => {
  const isLogin = authLoginCheck();
  if (!isLogin) {
    return window.location.replace("/login");
  }

  const navigate = useNavigate();

  const { feedId } = useParams();
  const { accessToken } = JSON.parse(localStorage.getItem("localUser"));

  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [todoTag, setTodoTag] = useState(DEFAULT_FILTER);
  const [date, setDate] = useState(getDateFormat());
  const [tagGroup, setTagGroup] = useState(DEFAULT_FILTER_LIST);
  const [todos, setTodos] = useState([]);
  const [meta, setMeta] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  const getFeed = async () => {
    const {
      data: {
        data: { tagsResponses, todoResponses },
      },
    } = await axios.get(`${URL}/feeds/${feedId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    const newTags = [
      DEFAULT_FILTER,
      ...tagsResponses.map((tag) => tag.tagName),
    ];

    setTagGroup(newTags);
    setTodos(todoResponses);
    setMeta(todoResponses);
  };

  const isTagModal = () => {
    setIsOpenTagModal(!isOpenTagModal);
  };

  const isCalendar = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const changeDate = (value) => {
    setDate(value);

    isCalendar();
  };

  const changeTag = (tagName) => {
    if (tagName === DEFAULT_FILTER) {
      setTodoTag(DEFAULT_FILTER);
      setTodos(meta);
    } else {
      const newTodo = meta.filter((todo) => todo.tagName === tagName);
      setTodoTag(tagName);
      setTodos(newTodo);
    }

    isTagModal();
  };

  const postScrapTodo = async () => {
    try {
      if (getDateFormat(date) < getDateFormat()) {
        return alert("오늘보다 빠른 날짜는 등록할 수 없습니다.");
      }

      const newTodoList = todos.map((todo) => {
        return {
          date: getDateFormat(date),
          content: todo.content,
          todoEmoji: todo.todoEmoji,
          tagId: todo.tagId,
        };
      });

      await axios.post(
        `${URL}/todos/todoList`,
        { postList: newTodoList },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      navigate(`/todo/${date}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <EditWrapper>
        {isOpenCalender && (
          <TodoCalendarModal changeDate={changeDate} date={date} />
        )}
        {isOpenTagModal && (
          <TagModal
            tags={tagGroup}
            tagModalClose={isTagModal}
            changeTag={changeTag}
          />
        )}
        <EditSection>
          <ScrapEdit
            TITLE={SCRAP_TO_TODO_TEXT}
            changeDate={changeDate}
            changeTag={changeTag}
            date={date}
            todoTag={todoTag}
            todos={todos}
            postScrapTodo={postScrapTodo}
            navigate={navigate}
          />
        </EditSection>
      </EditWrapper>
    </>
  );
};

export default ScrapTodoEditPage;

const EditWrapper = styled.body`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "HakgyoansimWoojuR";
`;

const EditSection = styled.section`
  width: 100%;
  max-width: 430px;
  height: 100%;

  background-color: #ffffff;

  padding-top: 80px;
  padding-bottom: 130px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: auto;
`;
