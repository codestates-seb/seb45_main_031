import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//이모지 라이브러리
import EmojiPicker from "emoji-picker-react";

//캘린더 라이브러리
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";

//태그 리스트 불러오기
import { tags } from "../data/tags";

//변수 선언
const memberId = 1;
const url = "http://ec2-3-34-99-175.ap-northeast-2.compute.amazonaws.com:8080";
const title = "할 일 만들기";
const tipTitle = "작성 Tip!";
const tips = [
  "1. 할 일 이름은 명확하게 등록 해볼까요?",
  "2. 태그로 운동 항목을 표시해주세요!",
  "3. 이모지는 할 일 완료 시 표시되는 항목입니다.",
];
const nameLabel = "할 일 이름";
const nameHolder = "예시 : 스쿼트 30회";
const tagLabel = "태그";
// const tagHolder = "예시 : 헬스, 스쿼트, 수영 등...";
const todoEmojiLabel = "이모지";
const calendarLabel = "일자";
const postText = "등록하기";
const cancelText = "취소";
const today = new Date();

export default function TodoEditPage() {
  const navigate = useNavigate();

  const [modalDisplay, setModalDisplay] = useState(false);
  const [calenderDisplay, setCalenderDisplay] = useState(false);
  const [modalBackDisplay, setModalBackDisplay] = useState(false);
  const [tagModalDisplay, setTagModalDisplay] = useState(false);
  const [todoEmoji, setTodoEmoji] = useState("");
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState("");
  const [todoTag, setTodoTag] = useState("");
  const [date, setDate] = useState(today);

  //이모지 모달창 Open
  const ModalOpen = () => {
    try {
      setModalDisplay(true);
      setModalBackDisplay(true);
    } catch (error) {
      console.error(error);
    }
  };

  //이모지 모달창 Close
  const ModalClose = () => {
    try {
      setModalDisplay(false);
      setModalBackDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  //이모지 변경
  const ChangeTodoEmoji = (value) => {
    setTodoEmoji(value.emoji);
  };

  //할 일 이름 변경
  const ChangeName = (value) => {
    setContent(value);
  };

  //태그 모달 Open
  const TagModalOpen = () => {
    try {
      setTagModalDisplay(true);
      setModalBackDisplay(true);
    } catch (error) {
      console.error(error);
    }
  };

  //태그 모달 Close
  const TagModalClose = () => {
    try {
      setTagModalDisplay(false);
      setModalBackDisplay(false);
    } catch (error) {
      console.error(error);
    }
  };

  //태그 변경
  // const ChangeTag = (value) => {
  //   setTodoTag(value);
  // };
  const ChangeTag = (value) => {
    try {
      setTagId(tags[value]);
      setTodoTag(value);

      TagModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  //달력 모달 Open
  const CalendarOpen = () => {
    try {
      setCalenderDisplay(true);
      setModalBackDisplay(true);
    } catch (error) {
      console.error(error);
    }
  };

  //날짜 수정
  function ChangeDate(value) {
    try {
      setDate(value);

      setCalenderDisplay(false);
      setModalBackDisplay(false);
    } catch (error) {
      console.error(error);
    }
  }

  //등록 api
  const PostTodo = () => {
    try {
      const newDate = moment(date).format("YYYY-MM-DD");
      const newData = {
        memberId,
        content,
        tagId,
        todoEmoji,
        date: newDate,
      };
      axios.post(`${url}/todos`, newData).then((res) => console.log(res));

      //데이터 post 완료 후 이동
      navigate(`/todo/${newDate}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoEditBody>
        {modalDisplay && (
          <TodoEmojiComponent
            todoEmoji={todoEmoji}
            ModalOpen={ModalOpen}
            ModalClose={ModalClose}
            ChangeTodoEmoji={ChangeTodoEmoji}
          />
        )}
        {calenderDisplay && (
          <CalendarModal onChange={(e) => ChangeDate(e)} value={date} />
        )}
        {tagModalDisplay && (
          <TagModal
            tags={tags}
            TagModalClose={TagModalClose}
            ChangeTag={ChangeTag}
          />
        )}
        {modalBackDisplay && <ModalBackground />}
        <TodoEditSection>
          <TitleComponent />
          <TipsComponent />
          <PostSection>
            <PostComponent
              TagModalOpen={TagModalOpen}
              ModalOpen={ModalOpen}
              ChangeName={ChangeName}
              todoTag={todoTag}
              todoEmoji={todoEmoji}
              date={date}
              CalendarOpen={CalendarOpen}
            />
            <ButtonsComponent PostTodo={PostTodo} navigate={navigate} />
          </PostSection>
        </TodoEditSection>
      </TodoEditBody>
    </>
  );
}

const TodoEditBody = styled.body`
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

const ModalBackground = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  background: rgb(0, 0, 0, 0.5);

  z-index: 10;
`;

const PostSection = styled.section`
  width: 390px;
  height: 500px;

  background-color: #ffffff;

  margin-top: 10px;
  padding: 30px 20px 30px 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

function TodoEmojiComponent({
  todoEmoji,
  ModalOpen,
  ModalClose,
  ChangeTodoEmoji,
}) {
  return (
    <>
      <TodoEmojiModal>
        <TodoEmojiSection>
          <TodoEmojiDiv onClick={() => ModalOpen()}>{todoEmoji} </TodoEmojiDiv>
          <ExitButton onClick={() => ModalClose()}>X</ExitButton>
        </TodoEmojiSection>
        <EmojiPicker onEmojiClick={(e) => ChangeTodoEmoji(e)} />
      </TodoEmojiModal>
    </>
  );
}

const TodoEmojiModal = styled.div`
  width: 390px;
  height: 500px;

  position: absolute;
  top: 30%;

  z-index: 100;

  background-color: #ffffff;

  padding: 20px;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;
`;

const TodoEmojiSection = styled.section`
  width: 340px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const ExitButton = styled.button`
  width: 30px;
  height: 30px;

  margin-bottom: 30px;
  border: 1px solid #ffb039;
  border-radius: 15px;

  &:hover {
    background-color: #ffb039;
  }
`;

const TodoEditSection = styled.section`
  width: 430px;
  height: 100vh;

  background-color: #ececec;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

function TitleComponent() {
  return (
    <>
      <TitleSection>
        <Title>{title}</Title>
      </TitleSection>
    </>
  );
}

const TitleSection = styled.section`
  width: 390px;
  height: 150px;

  padding: 10px 10px 0px 10px;

  display: flex;
  align-items: end;
  justify-content: start;
`;

const Title = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
`;

function TipsComponent() {
  return (
    <>
      <TipsSection>
        <TipTitle>{tipTitle}</TipTitle>
        <TipsUl>
          {tips.map((t, idx) => (
            <>
              <TipComponent key={idx} value={t} />
            </>
          ))}
        </TipsUl>
      </TipsSection>
    </>
  );
}

const TipsSection = styled.section`
  width: 390px;
  height: 170px;

  background-color: #fff7cc;

  padding: 25px;

  border-radius: 15px;
`;

const TipTitle = styled.h3`
  font-weight: bold;

  margin-bottom: 10px;
`;

const TipsUl = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

function TipComponent({ value }) {
  return (
    <>
      <li>
        <Tip>{value}</Tip>
      </li>
    </>
  );
}

const Tip = styled.p`
  margin: 5px;
`;

function PostComponent({
  TagModalOpen,
  ModalOpen,
  todoEmoji,
  ChangeName,
  todoTag,
  date,
  CalendarOpen,
}) {
  return (
    <>
      <div className="AsideSection">
        <Aside className="NameAside">
          <Label for="NameInput">{nameLabel}</Label>
          <Input
            id="NameInput"
            placeholder={nameHolder}
            onChange={(e) => ChangeName(e.target.value)}
          />
        </Aside>
        <Aside className="TagAside">
          <Label for="TagInput">{tagLabel}</Label>
          {/* <Input
            id="TagInput"
            placeholder={tagHolder}
            onChange={(e) => ChangeTag(e.target.value)}
          /> */}
          <TagDiv onClick={() => TagModalOpen()}>{todoTag}</TagDiv>
        </Aside>
        <Aside>
          <Label>{todoEmojiLabel}</Label>
          <TodoEmojiDiv onClick={() => ModalOpen()}>{todoEmoji}</TodoEmojiDiv>
        </Aside>
        <Aside>
          <Label>{calendarLabel}</Label>
          <DateDiv onClick={() => CalendarOpen()}>
            {moment(date).format("YYYY년 MM월 DD일")}
          </DateDiv>
        </Aside>
      </div>
    </>
  );
}

const Label = styled.label`
  font-weight: bold;
`;

const Input = styled.input`
  width: 340px;
  height: 50px;

  font-size: 1rem;

  padding-left: 20px;

  border: 1px solid #949597;
  border-radius: 15px;
`;

const TagDiv = styled.div`
  width: 340px;
  height: 50px;

  font-size: 1rem;

  padding-left: 20px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: start;
`;

const Aside = styled.aside`
  width: 340px;

  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const TodoEmojiDiv = styled.div`
  width: 50px;
  height: 50px;

  font-size: 35px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const DateDiv = styled.div`
  width: 340px;
  height: 50px;

  font-size: 1rem;

  padding-left: 20px;

  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  align-items: center;
`;

function ButtonsComponent({ PostTodo, navigate }) {
  return (
    <>
      <ButtonSection>
        <Button
          bgColor="#ECECEC"
          hoverColor="#D0D0D0"
          onClick={() => navigate("/todo")}
        >
          {cancelText}
        </Button>
        <Button
          bgColor="#ffe866"
          hoverColor="#ffd900"
          onClick={() => PostTodo()}
        >
          {postText}
        </Button>
      </ButtonSection>
    </>
  );
}

const ButtonSection = styled.section`
  height: 200px;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: center;
`;

const Button = styled.button`
  width: 115px;
  height: 35px;

  font-size: 0.85rem;

  background-color: ${(props) => props.bgColor};

  margin: 10px;
  border-radius: 15px;

  &:hover {
    background-color: ${(props) => props.hoverColor};
  }
`;

function TagModal({ tags, TagModalClose, ChangeTag }) {
  return (
    <>
      <TagModalBody>
        <TagExitButton onClick={() => TagModalClose()}>X</TagExitButton>
        <TagUl>
          {Object.keys(tags).map((tag) => (
            <>
              <TagLi>
                <TagButton onClick={() => ChangeTag(tag)}>{tag}</TagButton>
              </TagLi>
            </>
          ))}
        </TagUl>
      </TagModalBody>
    </>
  );
}

const TagModalBody = styled.div`
  width: 390px;
  height: 400px;

  padding: 15px;

  border-radius: 15px;

  background-color: #ffffff;

  position: absolute;
  top: 300px;

  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;
`;
const TagUl = styled.ul`
  width: 100%;
  height: 75%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: auto;
`;

const TagLi = styled.li`
  width: 250px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const TagButton = styled.button`
  width: 250px;

  margin-bottom: 10px;
  padding: 10px 0px;
  border: 1px solid #949597;
  border-radius: 15px;

  &:hover {
    background-color: #ffe866;
    border: 1px solid #ffe866;
  }
`;

const TagExitButton = styled.button`
  width: 30px;
  height: 30px;

  margin-bottom: 30px;
  border: 1px solid #ffb039;
  border-radius: 15px;

  &:hover {
    background-color: #ffb039;
  }
`;
