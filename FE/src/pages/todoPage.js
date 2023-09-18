import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";

import TodoModal from "../components/TodoModal";
import UserShell from "../components/UserShell";
import TodoList from "../components/TodoList";

import getDateFormat from "../utils/getDateFormat";

import {
  URL,
  DEFAULT_FILTER,
  DEFAULT_FILTER_LIST,
  DEFAULT_PERCENT,
} from "../data/constants";

import "react-calendar/dist/Calendar.css";
import TodoCalendarModal from "../components/TodoCalendarModal";

const TodoPage = () => {
  const { today } = useParams();

  const { memberId, accessToken } = JSON.parse(
    localStorage.getItem("localUser"),
  );

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
  const [percent, setPercent] = useState(DEFAULT_PERCENT);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTodoModal, setIsOpenTodoModal] = useState(false);

  useEffect(() => {
    getTodoList(date);
  }, []);

  const isCalender = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const isTodoModal = () => {
    setTodo({});
    setIsOpenTodoModal(!isOpenTodoModal);
  };

  const changeDate = (date) => {
    const newDate = getDateFormat(date);
    setDate(newDate);
    window.location.replace(`/todo/${newDate}`);

    isCalender();
  };

  const calculatePercent = (numerator, denominator) => {
    if (denominator === 0) return setPercent(0);

    const newPercent = Math.round((numerator / denominator) * 100);

    setPercent(newPercent);
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

  const changeTodo = (todoInformation) => {
    setTodo(todoInformation);
    setIsOpenTodoModal(!isOpenTodoModal);
  };

  const changeComplete = async (todoId, complete) => {
    if (date > getDateFormat()) {
      return alert("오늘보다 늦은 날짜의 할일을 완료할 수 없습니다.");
    }

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

      isTodoModal();
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

      isTodoModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoWrapper>
        {isOpenCalender && (
          <TodoCalendarModal date={date} changeDate={changeDate} />
        )}
        {isOpenTodoModal && (
          <TodoModal
            todo={todo}
            isTodoModal={isTodoModal}
            changeComplete={changeComplete}
            deleteTodo={deleteTodo}
          />
        )}
        <UserShell
          date={date}
          openCalender={isCalender}
          isOpenCalender={isOpenCalender}
          percent={percent}
          filterList={filterList}
          filtering={filtering}
          filter={filter}
        />
        <TodoList todoGroup={todoGroup} changeTodo={changeTodo} />
      </TodoWrapper>
    </>
  );
};

export default TodoPage;

const TodoWrapper = styled.body`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
