import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

//캘린더 라이브러리
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";

//삭제 할 더미 데이터들
import { todoList } from "../data/dummy";
import trophyLevel1 from "../assets/images/trophyLevel1.png";

//사용 텍스트 변수들 (유지보수를 편하게 하기 위하여 상단에서 변수로 선언하여 관리 )
const dateButtonText = ["달력보기", "달력닫기"];
const todoModalButtonText = ["할 일 완료", "완료 취소", "수정하기", "삭제하기"];
const chartText = "오늘의 성취";
const defaultFilterList = ["전체"];
const defaultFilter = "전체";
// const defaultDate = new Date();
const defaultDate = "2023-08-25";
const defaultPercent = 0;
const ExitText = "X";

export default function TodoPage() {
  const navigate = useNavigate();

  const [date, setDate] = useState(defaultDate);
  //삭제 될 더미데이터
  const dummyTodo = todoList.todos.filter((t) => t.date === date);
  const [allData, setAllData] = useState(dummyTodo);
  //
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState(allData);
  const [filterList, setFilterList] = useState(defaultFilterList);
  const [filter, setFilter] = useState(defaultFilter);
  const [modalBackDisplay, setModalBackDisplay] = useState(false);
  const [calenderDisplay, setCalenderDisplay] = useState(false);
  const [todoModalDisplay, setTodoModalDisplay] = useState(false);
  const [percent, setPercent] = useState(defaultPercent);

  // 달성량 계산 및 적용 함수
  function PercentData(part, whole) {
    const newPercent = Math.round((part / whole) * 100);
    setPercent(newPercent);
  }

  //새로운 정보를 불러올 때
  // 1. 데이터 정리
  // 2. 달성 퍼센트 계산
  // 3. 필터 분류
  useEffect(() => {
    try {
      //api연결 시 데이터 수정
      setTodos(allData);
      PercentData(todoList.completeCount, todoList.todoCount);

      todos.map((t) => {
        const value = filterList.filter((f) => f === t.tag);
        if (value.length === 0) setFilterList([...filterList, t.tag]);
      });
    } catch (error) {
      console.error(error);
    }
  }, [filterList]);

  //할 일 목록 데이터 api
  function TodoListApi() {
    try {
      // 데이터를 불러 올 api 필요
      console.log("데이터를 불러옵니다.");
    } catch (error) {
      console.error(error);
    }
  }

  //필터 버튼을 눌러 할 일 목록을 필터링 합니다.
  function Filtering(value) {
    try {
      setFilter(value);
      if (value === defaultFilter) {
        setTodos(allData);
      } else {
        const newTodo = allData.filter((d) => d.tag === value);
        setTodos(newTodo);
      }
    } catch (error) {
      console.error(error);
    }
  }

  //날짜를 바꿔 해당 일자의 할 일 목록을 불러옵니다.
  function ChangeDate(value) {
    try {
      const newDate = moment(value).format("YYYY-MM-DD");
      setDate(newDate);

      //백엔드와 연결되면 로직을 바꿔야하는 부분
      const newAllData = todoList.todos.filter((t) => t.date === newDate);
      setFilterList(defaultFilterList);
      newAllData.map((t) => {
        const value = filterList.filter((f) => f === t.tag);
        if (value.length === 0) setFilterList([...filterList, t.tag]);
      });
      setAllData(newAllData);
      setTodos([...newAllData]);
      //달성량에 들어가는 변수 수정 필요
      PercentData(todoList.completeCount, todoList.todoCount);

      setCalenderDisplay(!calenderDisplay);
      setModalBackDisplay(!modalBackDisplay);
    } catch (error) {
      console.error(error);
    }
  }

  //할 일을 눌러 모달창을 엽니다.
  function ChangeTodo(value) {
    try {
      setTodo(value);
      setModalBackDisplay(!modalBackDisplay);
      setTodoModalDisplay(!todoModalDisplay);
    } catch (error) {
      console.error(error);
    }
  }

  // x버튼을 눌러 모달창을 닫습니다.
  function ExitTodoModal() {
    try {
      setTodo({});
      setModalBackDisplay(!modalBackDisplay);
      setTodoModalDisplay(!todoModalDisplay);
    } catch (error) {
      console.error(error);
    }
  }

  //할 일 완료 / 취소 버튼
  function ChangeComplete() {
    try {
      //할 일의 complete이 변하는 로직 구현 필요
      console.log("complete change");
      //데이터가 변하면 api 재호출
      TodoListApi();

      ExitTodoModal();
    } catch (error) {
      console.error(error);
    }
  }

  //할 일 삭제 버튼
  function DeleteTodo(value) {
    try {
      //삭제 api 구현 필요
      console.log(value.todoId);
      //데이터가 변하면 api 재호출
      TodoListApi();

      ExitTodoModal();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <TodoBody>
        {modalBackDisplay && <ModalBackground />}
        {calenderDisplay && (
          <CalendarModal onChange={(e) => ChangeDate(e)} value={date} />
        )}
        {todoModalDisplay && (
          <TodoModal>
            <Exit>
              <button
                onClick={() => {
                  ExitTodoModal();
                }}
              >
                {ExitText}
              </button>
            </Exit>
            <TodoSection>
              <ElDiv>
                <TagDiv>{todo.tag}</TagDiv>
                <TitleDiv>{todo.title}</TitleDiv>
              </ElDiv>
              <EmojiDiv>{todo.complete ? todo.emoji : ""}</EmojiDiv>
            </TodoSection>
            <TodoModalButton
              onClick={() => {
                ChangeComplete();
              }}
            >
              {todo.complete ? todoModalButtonText[1] : todoModalButtonText[0]}
            </TodoModalButton>
            <TodoModalButton onClick={() => navigate("/todo/modify")}>
              {todoModalButtonText[2]}
            </TodoModalButton>
            <TodoModalButton onClick={() => DeleteTodo(todo)}>
              {todoModalButtonText[3]}
            </TodoModalButton>
          </TodoModal>
        )}
        <ElementContainer>
          <DateSection>
            <DateP>{moment(date).format("YYYY년 MM월 DD일")}</DateP>
            <DateButton
              onClick={() => {
                setModalBackDisplay(!modalBackDisplay);
                setCalenderDisplay(!calenderDisplay);
              }}
            >
              {calenderDisplay ? dateButtonText[1] : dateButtonText[0]}
            </DateButton>
          </DateSection>
          <UserSection>
            <TrophyImg src={trophyLevel1} />
            <ChartSection>
              <BarChart />
              <PercentDiv>
                <ChartText>{chartText}</ChartText>
                <Percent>{`${percent} %`}</Percent>
              </PercentDiv>
            </ChartSection>
          </UserSection>
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
        </ElementContainer>
        <ListContainer>
          <TodoList>
            {todos.map((t) => (
              <>
                <TodoLi onClick={() => ChangeTodo(t)}>
                  <TagDiv>{t.tag}</TagDiv>
                  <TitleDiv>{t.title}</TitleDiv>
                  <EmojiDiv>{t.complete ? t.emoji : ""}</EmojiDiv>
                </TodoLi>
              </>
            ))}
          </TodoList>
        </ListContainer>
      </TodoBody>
    </>
  );
}

const TodoBody = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ElementContainer = styled.div`
  width: 430px;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ListContainer = styled.div`
  width: 430px;
  height: 100%;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: scroll;
`;

const DateSection = styled.section`
  width: 100%;
  height: 40px;

  padding: 95px 20px 20px 20px;

  background-color: #ffffff;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  z-index: 11;
`;

const DateP = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
`;

const DateButton = styled.button`
  color: #949597;

  &: hover {
    color: #676767;
  }
`;

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

const ChartSection = styled.section`
  height: 60%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const BarChart = styled.div`
  width: 230px;
  height: 30px;

  background-color: #ffe866;

  border-radius: 15px;
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

const FilterSection = styled.section`
  width: 100%;
  height: 50px;

  background-color: #ffffff;

  overflow: scroll;
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

const TodoList = styled.ul`
  width: 390px;

  margin-bottom: 90px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TodoLi = styled.li`
  width: 390px;
  height: 70px;

  margin-top: 20px;
  border-radius: 15px;

  background-color: #ffffff;

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

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  background: rgb(0, 0, 0, 0.5);

  z-index: 10;
`;

const CalendarModal = styled(Calendar)`
  width: 390px;

  border-radius: 15px;

  position: absolute;
  top: 115px;

  z-index: 100;
`;

const TodoModal = styled.div`
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

const Exit = styled.div`
  width: 300px;
  height: 20px;

  margin-bottom: 10px;

  display: flex;
  justify-content: end;
`;

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

const TodoModalButton = styled.button`
  width: 250px;
  height: 35px;
  font-size: 0.85rem;

  margin: 10px;
  border-radius: 15px;

  background-color: #ececec;

  &: hover {
    background-color: #d0d0d0;
  }
`;
