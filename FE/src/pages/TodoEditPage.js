import { useState } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { Calendar } from "react-calendar";

import "react-calendar/dist/Calendar.css"; // css import

import getDateFormat from "../utils/getDateFormat";
import { tags } from "../data/tags";
import {
  URL,
  CALENDAR_LABEL,
  CANCEL_TEXT,
  NAME_HOLDER,
  NAME_LABEL,
  POST_TEXT,
  TAG_LABEL,
  TIPS,
  TIP_TITLE,
  TITLE,
  TODO_EMOJI_LABEL,
  DEFAULT_TODO_EMOJI,
} from "../data/constants";
import TagModal from "../components/TagModal";
import ModalBackground from "../components/ModalBackground";
import ErrorModal from "../components/ErrorModal";

//삭제 될 데이터
const memberId = 1;

const TodoEditPage = () => {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);
  const [todoEmoji, setTodoEmoji] = useState(DEFAULT_TODO_EMOJI);
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState("");
  const [todoTag, setTodoTag] = useState("");
  const [date, setDate] = useState(getDateFormat());
  const [errorMessage, setErrorMessage] = useState("");
  const [inputCount, setInputCount] = useState(0);

  const emojiModalOpen = () => {
    try {
      setIsOpenModal(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  const emojiModalClose = () => {
    try {
      setIsOpenModal(false);
      setIsOpenModalBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  const changeTodoEmoji = (value) => {
    setTodoEmoji(value.emoji);
  };

  const changeName = (value) => {
    console.log(value);
    setContent(value);
    setInputCount(
      value.replace(/[\0-\x7f]|([0-\u07ff]|(.))/g, "$&$1$2").length,
    );
  };

  const tagModalOpen = () => {
    try {
      setIsOpenTagModal(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  const tagModalClose = () => {
    try {
      setIsOpenTagModal(false);
      setIsOpenModalBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  const changeTag = (value) => {
    try {
      setTagId(tags[value]);
      setTodoTag(value);

      tagModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const calendarOpen = () => {
    try {
      setIsOpenCalender(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  const changeDate = (value) => {
    try {
      setDate(value);

      setIsOpenCalender(false);
      setIsOpenModalBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  const openErrorModal = (message) => {
    try {
      setErrorMessage(message);
      setIsOpenErrorModal(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  const closeErrorModal = () => {
    setErrorMessage("");
    setIsOpenErrorModal(false);
    setIsOpenModalBack(false);
  };

  const postTodo = () => {
    try {
      if (content === "")
        return openErrorModal("할 일 이름은 필수 항목 입니다.");
      if (inputCount > 60)
        return openErrorModal("할 일 이름의 최대 글자수를 초과하였습니다.");
      if (tagId === "") return openErrorModal("태그는 필수 항목 입니다.");
      if (getDateFormat() > getDateFormat(date))
        return openErrorModal("오늘보다 빠른 날짜는 선택할 수 없습니다.");

      const newDate = getDateFormat(date);
      const newData = {
        memberId,
        content,
        tagId,
        todoEmoji,
        date: newDate,
      };
      axios.post(`${URL}/todos`, newData).then((res) => {
        console.log(res);
        navigate(`/todo/${newDate}`);
      });
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
          <TodoEmoji
            todoEmoji={todoEmoji}
            ModalOpen={emojiModalOpen}
            ModalClose={emojiModalClose}
            ChangeTodoEmoji={changeTodoEmoji}
          />
        )}
        {isOpenCalender && (
          <CalendarModal onChange={(e) => changeDate(e)} value={date} />
        )}
        {isOpenTagModal && (
          <TagModal
            tags={tags}
            TagModalClose={tagModalClose}
            ChangeTag={changeTag}
          />
        )}
        {isOpenModalBack && <ModalBackground />}
        <TodoEditSection>
          <Title />
          <Tips />
          <PostSection>
            <Post
              TagModalOpen={tagModalOpen}
              ModalOpen={emojiModalOpen}
              ChangeName={changeName}
              todoTag={todoTag}
              todoEmoji={todoEmoji}
              content={content}
              date={date}
              CalendarOpen={calendarOpen}
              inputCount={inputCount}
            />
            <Buttons PostTodo={postTodo} navigate={navigate} />
          </PostSection>
        </TodoEditSection>
      </TodoEditBody>
    </>
  );
};

export default TodoEditPage;

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

const TodoEmoji = ({ todoEmoji, ModalOpen, ModalClose, ChangeTodoEmoji }) => {
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
};

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

const Title = () => {
  return (
    <>
      <TitleSection>
        <TitleText>{TITLE}</TitleText>
      </TitleSection>
    </>
  );
};

const TitleSection = styled.section`
  width: 390px;
  height: 150px;

  padding: 10px 10px 0px 10px;

  display: flex;
  align-items: end;
  justify-content: start;
`;

const TitleText = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
`;

const Tips = () => {
  return (
    <>
      <TipsSection>
        <TipTitle>{TIP_TITLE}</TipTitle>
        <TipsGroup>
          {TIPS.map((tip, idx) => (
            <>
              <Tip key={idx} value={tip} />
            </>
          ))}
        </TipsGroup>
      </TipsSection>
    </>
  );
};

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

const TipsGroup = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Tip = ({ value }) => {
  return (
    <>
      <li>
        <TipText>{value}</TipText>
      </li>
    </>
  );
};

const TipText = styled.p`
  margin: 5px;
`;

const Post = ({
  TagModalOpen,
  ModalOpen,
  todoEmoji,
  ChangeName,
  todoTag,
  date,
  CalendarOpen,
  content,
  inputCount,
}) => {
  return (
    <>
      <div className="AsideSection">
        <Aside className="NameAside">
          <Label for="NameInput">{NAME_LABEL}</Label>
          <Input
            id="NameInput"
            placeholder={NAME_HOLDER}
            onChange={(e) => ChangeName(e.target.value)}
          />
          <ValidationSection>
            <ValidationText>
              {content === "" && "이름은 필수값 입니다."}
              {inputCount > 60 && "이름의 최대 글자수를 초과하였습니다."}
            </ValidationText>
            <CountInputValue inputCount={inputCount}>
              {inputCount}/60
            </CountInputValue>
          </ValidationSection>
        </Aside>
        <Aside className="TagAside">
          <Label for="TagInput">{TAG_LABEL}</Label>
          <TagDiv onClick={() => TagModalOpen()}>{todoTag}</TagDiv>
          <ValidationSection>
            <ValidationText>
              {todoTag === "" && "태그는 필수값 입니다."}
            </ValidationText>
          </ValidationSection>
        </Aside>
        <Aside>
          <Label>{TODO_EMOJI_LABEL}</Label>
          <TodoEmojiDiv onClick={() => ModalOpen()}>{todoEmoji}</TodoEmojiDiv>
        </Aside>
        <Aside>
          <Label>{CALENDAR_LABEL}</Label>
          <DateDiv onClick={() => CalendarOpen()}>
            {getDateFormat(date)}
          </DateDiv>
          <ValidationText>
            {getDateFormat() > getDateFormat(date) &&
              "오늘 날짜보다 빠른 날짜는 선택할 수 없습니다."}
          </ValidationText>
        </Aside>
      </div>
    </>
  );
};

const ValidationSection = styled.section`
  width: 320px;
  height: 3px;

  margin: 0px 10px;

  display: flex;
  flex-direction: row;
  align-items: bottom;
  justify-content: space-between;
`;

const ValidationText = styled.p`
  font-size: 0.7rem;
  color: #ff3838;
`;

const CountInputValue = styled.p`
  font-size: 0.7rem;
  color: ${(props) => (props.inputCount > 60 ? "#ff3838" : "#949597")};
`;

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

const Buttons = ({ PostTodo, navigate }) => {
  return (
    <>
      <ButtonSection>
        <Button
          bgColor="#ECECEC"
          hoverColor="#D0D0D0"
          onClick={() => navigate("/todo")}
        >
          {CANCEL_TEXT}
        </Button>
        <Button
          bgColor="#ffe866"
          hoverColor="#ffd900"
          onClick={() => PostTodo()}
        >
          {POST_TEXT}
        </Button>
      </ButtonSection>
    </>
  );
};

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
