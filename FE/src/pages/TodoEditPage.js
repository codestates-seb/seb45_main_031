import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

//이모지 라이브러리
import EmojiPicker from "emoji-picker-react";

//캘린더 라이브러리
import { Calendar } from "react-calendar";
import "react-calendar/dist/Calendar.css"; // css import
import moment from "moment";

//변수 선언
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
const tagHolder = "예시 : 헬스, 스쿼트, 수영 등...";
const emojiLabel = "이모지";
const calendarLabel = "일자";
const postText = "등록하기";
const cancelText = "취소";
const today = new Date();

export default function TodoEditPage() {
  const navigate = useNavigate();

  const [modalDisplay, setModalDisplay] = useState(false);
  const [calenderDisplay, setCalenderDisplay] = useState(false);
  const [modalBackDisplay, setModalBackDisplay] = useState(false);
  const [emoji, setEmoji] = useState("");
  const [todoName, setTodoName] = useState("");
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
  const ChangeEmoji = (value) => {
    setEmoji(value.emoji);
  };

  //할 일 이름 변경
  const ChangeName = (value) => {
    setTodoName(value);
  };

  //태그 변경
  const ChangeTag = (value) => {
    setTodoTag(value);
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
        todoName,
        todoTag,
        emoji,
        date: newDate,
      };
      console.log(newData);
      //데이터 post 완료 후 이동
      navigate("/todo");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoEditBody>
        {modalDisplay && (
          <EmojiComponent
            emoji={emoji}
            ModalOpen={ModalOpen}
            ModalClose={ModalClose}
            ChangeEmoji={ChangeEmoji}
          />
        )}
        {calenderDisplay && (
          <CalendarModal onChange={(e) => ChangeDate(e)} value={date} />
        )}
        {modalBackDisplay && <ModalBackground />}
        <TodoEditSection>
          <TitleComponent />
          <TipsComponent />
          <PostSection>
            <PostComponent
              ModalOpen={ModalOpen}
              ChangeName={ChangeName}
              ChangeTag={ChangeTag}
              emoji={emoji}
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

function EmojiComponent({ emoji, ModalOpen, ModalClose, ChangeEmoji }) {
  return (
    <>
      <EmojiModal>
        <EmojiSection>
          <EmojiDiv onClick={() => ModalOpen()}>{emoji} </EmojiDiv>
          <ExitButton onClick={() => ModalClose()}>X</ExitButton>
        </EmojiSection>
        <EmojiPicker onEmojiClick={(e) => ChangeEmoji(e)} />
      </EmojiModal>
    </>
  );
}

const EmojiModal = styled.div`
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

const EmojiSection = styled.section`
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

  &: hover {
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
  ModalOpen,
  emoji,
  ChangeName,
  ChangeTag,
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
          <Input
            id="TagInput"
            placeholder={tagHolder}
            onChange={(e) => ChangeTag(e.target.value)}
          />
        </Aside>
        <Aside>
          <Label>{emojiLabel}</Label>
          <EmojiDiv onClick={() => ModalOpen()}>{emoji}</EmojiDiv>
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

const Aside = styled.aside`
  width: 340px;

  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const EmojiDiv = styled.div`
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

  &: hover {
    background-color: ${(props) => props.hoverColor};
  }
`;
