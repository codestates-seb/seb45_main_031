import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { styled } from "styled-components";
import axios from "axios";
import { Calendar } from "react-calendar";

import {
  URL,
  CHART_TEXT,
  DATE_BUTTON_TEXT,
  DEFAULT_FILTER,
  DEFAULT_FILTER_LIST,
  DEFAULT_PERCENT,
  EXIT_TEXT,
  TODO_MODAL_BUTTON_TEXT,
} from "../data/constants";
import getDateFormat from "../utils/getDateFormat";

import "react-calendar/dist/Calendar.css"; // css import

import trophyLevel1 from "../assets/images/trophyLevel1.png";
import TodoCard from "../components/TodoCard";
import ModalBackground from "../components/ModalBackground";

//삭제 할 더미 데이터
const membersId = 2;
const accessToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjoyLCJ1c2VybmFtZSI6ImFiY2QxMjM0QGdtYWlsLmNvbSIsInN1YiI6ImFiY2QxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTY5NDM5MzI0MywiZXhwIjoxNjk0Mzk1MDQzfQ.j2Slc3u1W6ZDIKPpqgZVUFL53k3MJ_3PUSPoAQAaHjY";
// const refreshToken =
//   "eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6Miwic3ViIjoiYWJjZDEyMzRAZ21haWwuY29tIiwiaWF0IjoxNjk0MzkzMjQzLCJleHAiOjE2OTQ0MTg0NDN9.9wIbm9LGv7lrR0AwIlOHjDDxjPgvaWy5CShhapgih9A";

const TodoPage = () => {
  const navigate = useNavigate();
  const { today } = useParams();

  const [date, setDate] = useState(getDateFormat(today));
  const [meta, setMeta] = useState({
    completeCount: 0,
    todoCount: 0,
    todoResponses: [],
  });
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [filterList, setFilterList] = useState(DEFAULT_FILTER_LIST);
  const [filter, setFilter] = useState(DEFAULT_FILTER);
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTodoModal, setIsOpenTodoModal] = useState(false);
  const [percent, setPercent] = useState(DEFAULT_PERCENT);

  useEffect(() => {
    try {
      getTodoList(date);
    } catch (error) {
      console.error(error);
    }
  }, []);

  // 달성량 계산 및 적용 함수
  const calculatePercent = (numerator, denominator) => {
    if (denominator === 0) return setPercent(0);
    const newPercent = Math.round((numerator / denominator) * 100);
    setPercent(newPercent);
  };

  //할 일 목록 데이터 api
  const getTodoList = (date) => {
    try {
      axios
        .get(`${URL}/todos/${membersId}`, {
          params: { date },
          headers: { Authorization: accessToken },
        })
        .then((res) => {
          const data = res.data.data;
          setMeta(data);
          setTodos(data.todoResponses);
          calculatePercent(data.completeCount, data.todoCount);
          let newFilterList = filterList;
          data.todoResponses.map((todo) => {
            const tagName = todo.tagResponse.tagName;
            const value = newFilterList.filter((filter) => filter === tagName);
            if (value.length === 0) newFilterList = [...newFilterList, tagName];
          });
          setFilterList(newFilterList);
        });
    } catch (error) {
      console.error(error);
    }
  };

  //필터 버튼을 눌러 할 일 목록을 필터링 합니다.
  const filtering = (value) => {
    try {
      setFilter(value);
      if (value === DEFAULT_FILTER) {
        setTodos(meta.todoResponses);
      } else {
        const newTodo = meta.todoResponses.filter(
          (data) => data.tagResponse.tagName === value,
        );
        setTodos(newTodo);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //캘린더 모달을 엽니다.
  const openCalender = () => {
    setIsOpenModalBack(true);
    setIsOpenCalender(true);
  };

  //날짜를 바꿔 해당 일자의 할 일 목록을 불러옵니다.
  const changeDate = (value) => {
    try {
      const newDate = getDateFormat(value);
      setDate(newDate);
      window.location.replace(`/todo/${newDate}`);

      setIsOpenCalender(!isOpenCalender);
      setIsOpenModalBack(!isOpenModalBack);
    } catch (error) {
      console.error(error);
    }
  };

  //할 일을 눌러 모달창을 엽니다.
  const changeTodo = (value) => {
    try {
      setTodo(value);
      setIsOpenModalBack(!isOpenModalBack);
      setIsOpenTodoModal(!isOpenTodoModal);
    } catch (error) {
      console.error(error);
    }
  };

  // x버튼을 눌러 모달창을 닫습니다.
  const exitTodoModal = () => {
    try {
      setTodo({});
      setIsOpenModalBack(!isOpenModalBack);
      setIsOpenTodoModal(!isOpenTodoModal);
    } catch (error) {
      console.error(error);
    }
  };

  //할 일 완료 / 취소 버튼
  const changeComplete = (todoId, complete) => {
    try {
      axios
        .patch(
          `${URL}/todos/complete/${todoId}`,
          {
            complete: complete === "DONE" ? "NONE" : "DONE",
          },
          {
            headers: { Authorization: accessToken },
          },
        )
        .then(() => getTodoList(date));

      exitTodoModal(date);
    } catch (error) {
      console.error(error);
    }
  };

  //할 일 삭제 버튼
  const deleteTodo = (todoId) => {
    try {
      axios
        .delete(`${URL}/todos/${todoId}`, {
          headers: { Authorization: accessToken },
        })
        .then(() => getTodoList(date));

      exitTodoModal();
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
            ExitTodoModal={exitTodoModal}
            ChangeComplete={changeComplete}
            navigate={navigate}
            DeleteTodo={deleteTodo}
          />
        )}
        <UserInterface
          date={date}
          OpenCalender={openCalender}
          calenderDisplay={isOpenCalender}
          percent={percent}
          filterList={filterList}
          Filtering={filtering}
          filter={filter}
        />
        <TodoList todos={todos} ChangeTodo={changeTodo} />
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

//TodoModalComponent ===================================
const TodoModal = ({
  todo,
  ExitTodoModal,
  ChangeComplete,
  navigate,
  DeleteTodo,
}) => {
  return (
    <>
      <TodoModalBody>
        <ExitComponent ExitTodoModal={ExitTodoModal} />
        <Todo todo={todo} />
        <TodoModalButtons
          todo={todo}
          ChangeComplete={ChangeComplete}
          navigate={navigate}
          DeleteTodo={DeleteTodo}
        />
      </TodoModalBody>
    </>
  );
};

const TodoModalBody = styled.div`
  width: 340px;

  border: 1px solid #fff7cc;
  border-radius: 15px;

  background-color: #ffffff;

  padding: 20px;

  position: absolute;
  top: 30%;

  z-index: 100;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Exit = ({ ExitTodoModal }) => {
  return (
    <ExitBody>
      <ExitButton
        onClick={() => {
          ExitTodoModal();
        }}
      >
        {EXIT_TEXT}
      </ExitButton>
    </ExitBody>
  );
};

const ExitComponent = styled(Exit)`
  width: 300px;
  height: 20px;

  margin-bottom: 10px;

  display: flex;
  align-items: end;
  justify-content: end;
`;

const ExitBody = styled.div`
  width: 100%;

  margin-top: -5px;
  margin-bottom: 10px;

  display: flex;
  justify-content: end;
`;

const ExitButton = styled.button`
  width: 30px;
  height: 30px;

  border: 1px solid #ffb039;
  border-radius: 50%;

  &:hover {
    background-color: #ffb039;
  }
`;

const Todo = ({ todo }) => {
  return (
    <>
      <TodoSection>
        <ElDiv>
          <TagDiv>{todo.tagResponse.tagName}</TagDiv>
          <TitleDiv>{todo.content}</TitleDiv>
        </ElDiv>
        <EmojiDiv>{todo.complete === "DONE" ? todo.todoEmoji : ""}</EmojiDiv>
      </TodoSection>
    </>
  );
};

const TodoSection = styled.section`
  width: 300px;
  height: 150px;

  margin-bottom: 30px;
  border: 1px solid #ffd900;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: end;
`;

const ElDiv = styled.div`
  width: 300px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TagDiv = styled.span`
  width: 70px;
  height: 40px;

  background: #ececec;

  margin: 15px;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TitleDiv = styled.p`
  width: 200px;

  font-size: 0.9erm;
`;

const EmojiDiv = styled.div`
  width: 40px;
  height: 40px;

  margin: 15px;
  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TodoModalButtons = ({ todo, ChangeComplete, navigate, DeleteTodo }) => {
  return (
    <>
      <TodoModalButton
        onClick={() => {
          ChangeComplete(todo.todoId, todo.complete);
        }}
      >
        {todo.complete === "DONE"
          ? TODO_MODAL_BUTTON_TEXT[1]
          : TODO_MODAL_BUTTON_TEXT[0]}
      </TodoModalButton>
      <TodoModalButton onClick={() => navigate(`/todo/modify/${todo.todoId}`)}>
        {TODO_MODAL_BUTTON_TEXT[2]}
      </TodoModalButton>
      <TodoModalButton onClick={() => DeleteTodo(todo.todoId)}>
        {TODO_MODAL_BUTTON_TEXT[3]}
      </TodoModalButton>
    </>
  );
};

const TodoModalButton = styled.button`
  width: 250px;
  height: 35px;
  font-size: 0.85rem;

  margin: 10px;
  border-radius: 15px;

  background-color: #ececec;

  &:hover {
    background-color: #d0d0d0;
  }
`;

//ElementComponent ===================================
const UserInterface = ({
  date,
  OpenCalender,
  calenderDisplay,
  percent,
  filterList,
  Filtering,
  filter,
}) => {
  return (
    <>
      <InterfaceContainer>
        <Date
          date={date}
          OpenCalender={OpenCalender}
          calenderDisplay={calenderDisplay}
        />
        <User percent={percent} />
        <Filter filterList={filterList} Filtering={Filtering} filter={filter} />
      </InterfaceContainer>
    </>
  );
};

const InterfaceContainer = styled.div`
  width: 430px;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Date = ({ date, OpenCalender, calenderDisplay }) => {
  return (
    <>
      <DateSection>
        <DateP>{getDateFormat(date)}</DateP>
        <DateButton
          onClick={() => {
            OpenCalender();
          }}
        >
          {calenderDisplay ? DATE_BUTTON_TEXT[1] : DATE_BUTTON_TEXT[0]}
        </DateButton>
      </DateSection>
    </>
  );
};

const DateSection = styled.section`
  width: 100%;
  height: 40px;

  padding: 120px 20px 20px 20px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DateP = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DateButton = styled.button`
  color: #949597;

  &:hover {
    color: #676767;
  }
`;

const User = ({ percent }) => {
  return (
    <>
      <UserSection>
        <TrophyImg src={trophyLevel1} />
        <Chart percent={percent} />
      </UserSection>
    </>
  );
};

const UserSection = styled.section`
  width: 100%;
  height: 150px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;

  align-items: center;
  justify-content: center;
`;

const TrophyImg = styled.img`
  width: 120px;
  height: 120px;

  margin: 10px;
`;

const Chart = ({ percent }) => {
  return (
    <>
      <ChartSection>
        <BarChart>
          <ProgressBar percent={percent} />
        </BarChart>
        <PercentDiv>
          <ChartText>{CHART_TEXT}</ChartText>
          <Percent>{`${percent} %`}</Percent>
        </PercentDiv>
      </ChartSection>
    </>
  );
};

const ChartSection = styled.section`
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BarChart = styled.div`
  width: 230px;
  height: 30px;

  background-color: #d0d0d0;

  border-radius: 15px;

  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.percent + "%"};
  height: 30px;

  background-color: #ffe866;

  border-radius: 15px;

  animation: progressBar 0.5s ease-out;
  transition: all 0.5s ease-out;

  @keyframes progressBar {
    0% {
      width: 0%;
    }
    100% {
      width: ${(props) => props.percent + "%"};
    }
  }
`;

const PercentDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ChartText = styled.p`
  font-size: 0.9rem;
  color: #949597;

  margin: 5px;
`;

const Percent = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  color: #ffb039;

  margin: 5px;
`;

const Filter = ({ filterList, Filtering, filter }) => {
  return (
    <>
      <FilterSection>
        {filterList.map((f, idx) => (
          <FilterButton
            key={idx}
            onClick={() => Filtering(f)}
            filter={filter}
            value={f}
          >
            {f}
          </FilterButton>
        ))}
      </FilterSection>
    </>
  );
};

const FilterSection = styled.section`
  width: 100%;
  height: 50px;

  background-color: #ffffff;

  overflow-x: scroll;
  white-space: nowrap;
`;

const FilterButton = styled.button`
  font-size: 0.85rem;
  background-color: ${(props) =>
    props.filter === props.value ? "#ffe866" : "#ececec"};

  border-radius: 15px;

  margin-top: 3px;
  margin-left: 10px;
  padding: 10px 20px 10px 20px;
`;

//ListComponent ===================================
const TodoList = ({ todos, ChangeTodo }) => {
  return (
    <>
      <ListContainer>
        <Todos>
          {todos.map((value, idx) => (
            <TodoCard
              key={idx}
              value={value}
              todoPage={true}
              ChangeTodo={ChangeTodo}
            />
          ))}
        </Todos>
      </ListContainer>
    </>
  );
};

const ListContainer = styled.div`
  width: 430px;
  height: 100%;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
`;

const Todos = styled.ul`
  width: 390px;

  margin-bottom: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;
