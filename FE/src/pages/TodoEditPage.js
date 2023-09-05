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
} from "../data/constants";

//삭제 될 데이터
const memberId = 1;

const TodoEditPage = () => {
  const navigate = useNavigate();

  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [todoEmoji, setTodoEmoji] = useState("");
  const [content, setContent] = useState("");
  const [tagId, setTagId] = useState("");
  const [todoTag, setTodoTag] = useState("");
  const [date, setDate] = useState(getDateFormat());

  //이모지 모달창 Open
  const modalOpen = () => {
    try {
      setIsOpenModal(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  //이모지 모달창 Close
  const modalClose = () => {
    try {
      setIsOpenModal(false);
      setIsOpenModalBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  //이모지 변경
  const changeTodoEmoji = (value) => {
    setTodoEmoji(value.emoji);
  };

  //할 일 이름 변경
  const changeName = (value) => {
    setContent(value);
  };

  //태그 모달 Open
  const tagModalOpen = () => {
    try {
      setIsOpenTagModal(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  //태그 모달 Close
  const tagModalClose = () => {
    try {
      setIsOpenTagModal(false);
      setIsOpenModalBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  //태그 변경
  const changeTag = (value) => {
    try {
      setTagId(tags[value]);
      setTodoTag(value);

      tagModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  //달력 모달 Open
  const calendarOpen = () => {
    try {
      setIsOpenCalender(true);
      setIsOpenModalBack(true);
    } catch (error) {
      console.error(error);
    }
  };

  //날짜 수정
  const changeDate = (value) => {
    try {
      setDate(value);

      setIsOpenCalender(false);
      setIsOpenModalBack(false);
    } catch (error) {
      console.error(error);
    }
  };

  //등록 api
  const postTodo = () => {
    try {
      const newDate = getDateFormat(date);
      const newData = {
        memberId,
        content,
        tagId,
        todoEmoji,
        date: newDate,
      };
      axios.post(`${URL}/todos`, newData).then((res) => console.log(res));
      navigate(`/todo/${newDate}`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <TodoEditBody>
        {isOpenModal && (
          <TodoEmoji
            todoEmoji={todoEmoji}
            ModalOpen={modalOpen}
            ModalClose={modalClose}
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
              ModalOpen={modalOpen}
              ChangeName={changeName}
              todoTag={todoTag}
              todoEmoji={todoEmoji}
              date={date}
              CalendarOpen={calendarOpen}
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
          {TIPS.map((t, idx) => (
            <>
              <Tip key={idx} value={t} />
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
        </Aside>
        <Aside className="TagAside">
          <Label for="TagInput">{TAG_LABEL}</Label>
          <TagDiv onClick={() => TagModalOpen()}>{todoTag}</TagDiv>
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
        </Aside>
      </div>
    </>
  );
};

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

const TagModal = ({ tags, TagModalClose, ChangeTag }) => {
  return (
    <>
      <TagModalBody>
        <TagExitButton onClick={() => TagModalClose()}>X</TagExitButton>
        <TagGroup>
          {Object.keys(tags).map((tag) => (
            <>
              <Tag>
                <TagButton onClick={() => ChangeTag(tag)}>{tag}</TagButton>
              </Tag>
            </>
          ))}
        </TagGroup>
      </TagModalBody>
    </>
  );
};

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

const TagGroup = styled.ul`
  width: 100%;
  height: 75%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: auto;
`;

const Tag = styled.li`
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
