import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import { Calendar } from "react-calendar";
import axios from "axios";

import TodoModal from "../components/TodoModal";
import UserShell from "../components/UserShell";
import TodoList from "../components/TodoList";
import ModalBackground from "../components/ModalBackground";

import getDateFormat from "../utils/getDateFormat";

import {
  URL,
  DEFAULT_FILTER,
  DEFAULT_FILTER_LIST,
  DEFAULT_PERCENT,
} from "../data/constants";

import "react-calendar/dist/Calendar.css";

//삭제 될 로그인 파트 ==================================================
axios
  .post(`${URL}/auth/login`, {
    email: "abcd1234@gmail.com",
    password: "abcd1234",
  })
  .then((res) => {
    const localUser = {
      email: res.data.email,
      memberId: res.data.memberId,
      nickname: res.data.nickname,
      exp: res.data.exp,
      level: res.data.level,
      image: res.data.image,
      accessToken: res.headers.authorization,
      refresh: res.headers.refresh,
    };
    localStorage.setItem("localUser", JSON.stringify(localUser));
  });
//삭제 될 로그인 파트 ==================================================

const TodoPage = () => {
  const { today } = useParams();

  const localUser = JSON.parse(localStorage.getItem("localUser"));
  const memberId = localUser.memberId;
  const accessToken = localUser.accessToken;

  const [date, setDate] = useState(getDateFormat(today));
  const [meta, setMeta] = useState({
    completeCount: 0,
    todoCount: 0,
    todoResponses: [],
  });
  const [todo, setTodo] = useState({});
  const [todoGroup, setTodoGroup] = useState([]);
  const [filterList, setFilterList] = useState(DEFAULT_FILTER_LIST);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTodoModal, setIsOpenTodoModal] = useState(false);
  const [percent, setPercent] = useState(DEFAULT_PERCENT);

  useEffect(() => {
    getTodoList(date);
  }, []);

  const calculatePercent = (numerator, denominator) => {
    if (denominator === 0) return setPercent(0);

    const newPercent = Math.round((numerator / denominator) * 100);

    setPercent(newPercent);
  };

  const getTodoList = async (date) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${URL}/todos/${memberId}`, {
        params: { date },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const tagNames = data.todoResponses.map((todo) => {
        return todo.tagResponse.tagName;
      });

      const uniqueTagNames = tagNames.reduce(
        (result, tagName) =>
          result.includes(tagName) ? result : [...result, tagName],
        [DEFAULT_FILTER],
      );

      setMeta(data);
      setFilterList(uniqueTagNames);
      setTodoGroup(data.todoResponses);
      calculatePercent(data.completeCount, data.todoCount);
    } catch (error) {
      console.error(error);
    }
  };

  const filtering = (filter) => {
    setFilter(filter);

    if (filter === DEFAULT_FILTER) {
      setTodoGroup(meta.todoResponses);
    } else {
      const newTodo = meta.todoResponses.filter(
        (data) => data.tagResponse.tagName === filter,
      );
      setTodoGroup(newTodo);
    }
  };

  const openCalender = () => {
    setIsOpenModalBack(true);
    setIsOpenCalender(true);
  };

  const changeDate = (date) => {
    const newDate = getDateFormat(date);
    setDate(newDate);
    window.location.replace(`/todo/${newDate}`);

    setIsOpenCalender(!isOpenCalender);
    setIsOpenModalBack(!isOpenModalBack);
  };

  const changeTodo = (todoInformation) => {
    setTodo(todoInformation);
    setIsOpenModalBack(!isOpenModalBack);
    setIsOpenTodoModal(!isOpenTodoModal);
  };

  const closeTodoModal = () => {
    setTodo({});
    setIsOpenModalBack(!isOpenModalBack);
    setIsOpenTodoModal(!isOpenTodoModal);
  };

  const changeComplete = async (todoId, complete) => {
    try {
      await axios.patch(
        `${URL}/todos/complete/${todoId}`,
        {
          complete: complete === "DONE" ? "NONE" : "DONE",
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      getTodoList(date);

      closeTodoModal(date);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTodo = async (todoId) => {
    try {
      await axios.delete(`${URL}/todos/${todoId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      getTodoList(date);

      closeTodoModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoBody>
        {isOpenModalBack && <ModalBackground />}
        {isOpenCalender && (
          <CalendarModal onChange={(e) => changeDate(e)} value={date} />
        )}
        {isOpenTodoModal && (
          <TodoModal
            todo={todo}
            closeTodoModal={closeTodoModal}
            changeComplete={changeComplete}
            deleteTodo={deleteTodo}
          />
        )}
        <UserShell
          date={date}
          openCalender={openCalender}
          isOpenCalender={isOpenCalender}
          percent={percent}
          filterList={filterList}
          filtering={filtering}
          filter={filter}
        />
        <TodoList todoGroup={todoGroup} changeTodo={changeTodo} />
      </TodoBody>
    </>
  );
};

export default TodoPage;

const TodoBody = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CalendarModal = styled(Calendar)`
  width: 390px;

  border-radius: 15px;

  position: absolute;
  top: 115px;

  z-index: 100;
`;
