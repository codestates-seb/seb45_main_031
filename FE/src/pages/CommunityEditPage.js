import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { Calendar } from "react-calendar";
import ReactQuill from "react-quill";
import axios from "axios";

import "react-calendar/dist/Calendar.css";
import "react-quill/dist/quill.snow.css";

import getDateFormat from "../utils/getDateFormat";
import { tags } from "../data/tags";
import {
  URL,
  CANCEL_TEXT,
  COMMUNITY_EDIT_CALENDAR_LABEL,
  COMMUNITY_EDIT_CONTENT_LABEL,
  COMMUNITY_EDIT_TAG_LABEL,
  COMMUNITY_EDIT_TIPS,
  COMMUNITY_EDIT_TITLE,
  POST_TEXT,
  TIP_TITLE,
  DEFAULT_FILTER_LIST,
  DEFAULT_FILTER,
} from "../data/constants";

//삭제 될 데이터
const memberId = 1;

const CommunityEditPage = () => {
  const navigate = useNavigate();

  const [date, setDate] = useState(getDateFormat());
  const [isOpenModalBack, setIsOpenModalBack] = useState(false);
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [tagId, setTagId] = useState("");
  const [tagName, setTagName] = useState(DEFAULT_FILTER);
  const [tagList, setTagList] = useState(DEFAULT_FILTER_LIST);
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState([]);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    try {
      getTodoList(date);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const openCalender = () => {
    setIsOpenModalBack(true);
    setIsOpenCalender(true);
  };

  const closeCalender = () => {
    setIsOpenModalBack(false);
    setIsOpenCalender(false);
  };

  // const changeDate = (value) => {
  //   try {
  //     const newDate = getDateFormat(value);
  //     setDate(newDate);
  //     getTodoList(newDate);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const getTodoList = (value) => {
    try {
      setDate(value);
      axios.get(`${URL}/todos/${memberId}?date=${value}`).then((res) => {
        const data = res.data.data.todoResponses;
        setMeta(data);
        setTodoList(data);
        let newTagList = tagList;
        data.map((todo) => {
          const tagName = todo.tagResponse.tagName;
          const value = newTagList.filter((filter) => filter === tagName);
          if (value.length === 0) newTagList = [...newTagList, tagName];
        });
        setTagList(newTagList);
      });
    } catch (error) {
      console.error(error);
    }
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
      setTagName(value);

      let newTodoList = [];
      if (value === "전체") {
        newTodoList = meta;
      } else {
        meta.map((todo) => {
          if (todo.tagResponse.tagName === value)
            newTodoList = [...newTodoList, todo];
        });
      }

      setTodoList(newTodoList);
      tagModalClose();
    } catch (error) {
      console.error(error);
    }
  };

  const postFeed = () => {
    try {
      const newFeed = {
        memberId,
        todoList,
        content,
        feedTagDtos: [
          {
            tagId,
          },
        ],
      };
      console.log(newFeed);
      axios.post(`${URL}/feeds`, newFeed).then((res) => console.log(res));
      navigate(`/community`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommunityEditBody>
        {isOpenModalBack && <ModalBackground />}
        {isOpenCalender && (
          <CalendarModal
            getTodoList={getTodoList}
            // changeDate={changeDate}
            closeCalender={closeCalender}
            date={date}
            todoList={todoList}
          />
        )}
        {isOpenTagModal && (
          <TagModal
            tagList={tagList}
            TagModalClose={tagModalClose}
            ChangeTag={changeTag}
          />
        )}
        <EditContainer>
          <Title />
          <Tips />
          <Post
            date={date}
            openCalender={openCalender}
            tagName={tagName}
            tagModalOpen={tagModalOpen}
            content={content}
            setContent={setContent}
            navigate={navigate}
            postFeed={postFeed}
          />
        </EditContainer>
      </CommunityEditBody>
    </>
  );
};

export default CommunityEditPage;

const CommunityEditBody = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
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

const EditContainer = styled.div`
  width: 430px;
  height: 100%;

  background-color: #ececec;

  padding-top: 120px;
  padding-bottom: 95px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;

  overflow: scroll;
`;

const CalendarModal = ({
  getTodoList,
  // changeDate,
  closeCalender,
  todoList,
  date,
}) => {
  return (
    <CalenderBody>
      <HeadSection>
        <DateText>{date}</DateText>
        <CloseButton onClick={() => closeCalender()}>X</CloseButton>
      </HeadSection>
      <CalenderSection
        onChange={(e) => {
          // changeDate(e);
          getTodoList(getDateFormat(e));
        }}
      />
      <TodoSection>
        {todoList.length === 0
          ? "할 일 목록이 없습니다."
          : todoList.map((todo) => <Todo todo={todo} key={todo.todoId} />)}
      </TodoSection>
    </CalenderBody>
  );
};

const CalenderBody = styled.body`
  width: 390px;
  height: 650px;

  background-color: #ffffff;

  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: start;

  position: absolute;
  top: 115px;

  z-index: 100;
`;

const HeadSection = styled.section`
  width: 100%;

  padding: 10px;

  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
`;

const DateText = styled.div`
  height: 100%;

  font-size: 1.3rem;
  color: #ffb039;

  margin-left: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const CloseButton = styled.button`
  width: 30px;
  height: 30px;

  color: #949597;

  border: 1px solid #d0d0d0;
  border-radius: 15px;
  margin: 10px 10px 5px 0px;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const CalenderSection = styled(Calendar)`
  width: 390px;
`;

const TodoSection = styled.ul`
  width: 390px;
  height: 300px;

  margin-top: 10px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;

  overflow: scroll;
`;

const Todo = ({ todo }) => {
  return (
    <TodoBody>
      <TagDiv>{todo.tagResponse.tagName}</TagDiv>
      <TitleDiv>{todo.content}</TitleDiv>
      <EmojiDiv>{todo.complete === "DONE" ? todo.todoEmoji : ""}</EmojiDiv>
    </TodoBody>
  );
};

const TodoBody = styled.li`
  width: 90%;
  height: 70px;

  margin-top: 20px;
  border: 1px solid #d0d0d0;
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

const TagModal = ({ tagList, TagModalClose, ChangeTag }) => {
  return (
    <>
      <TagModalBody>
        <TagExitButton onClick={() => TagModalClose()}>X</TagExitButton>
        <TagGroup>
          {tagList.map((tag) => (
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

const Title = () => {
  return (
    <TitleSection>
      <TitleText>{COMMUNITY_EDIT_TITLE}</TitleText>
    </TitleSection>
  );
};

const TitleSection = styled.section`
  width: 390px;

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
          {COMMUNITY_EDIT_TIPS.map((tip, idx) => (
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
  height: 190px;

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
  date,
  openCalender,
  tagName,
  tagModalOpen,
  content,
  setContent,
  navigate,
  postFeed,
}) => {
  return (
    <>
      <PostBody>
        <AsideSection
          date={date}
          openCalender={openCalender}
          tagName={tagName}
          tagModalOpen={tagModalOpen}
          content={content}
          setContent={setContent}
        />
        <ButtonSection navigate={navigate} postFeed={postFeed} />
      </PostBody>
    </>
  );
};

const PostBody = styled.section`
  width: 390px;

  margin-top: 15px;
  padding: 25px;
  border-radius: 15px;

  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const AsideSection = ({
  date,
  openCalender,
  tagName,
  tagModalOpen,
  content,
  setContent,
}) => {
  return (
    <>
      <Aside className="Calendar">
        <Label for="CalendarButton">{COMMUNITY_EDIT_CALENDAR_LABEL}</Label>
        <AsideButton id="CalendarButton" onClick={() => openCalender()}>
          {date}
        </AsideButton>
      </Aside>
      <Aside className="Tag">
        <Label for="TagButton">{COMMUNITY_EDIT_TAG_LABEL}</Label>
        <AsideButton id="TagButton" onClick={() => tagModalOpen()}>
          {tagName}
        </AsideButton>
      </Aside>
      <Aside>
        <Label for="Content">{COMMUNITY_EDIT_CONTENT_LABEL}</Label>
        <TextWriteForm theme="snow" value={content} onChange={setContent} />
      </Aside>
    </>
  );
};

const Aside = styled.aside`
  width: 100%;

  margin-bottom: 25px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
`;

const Label = styled.label`
  font-weight: bold;
`;

const AsideButton = styled.button`
  width: 100%;
  height: 50px;

  font-size: 1rem;
  color: #949597;

  padding-left: 25px;
  border: 1px solid #949597;
  border-radius: 15px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const TextWriteForm = styled(ReactQuill)`
  height: 250px;
  margin-bottom: 30px;
`;

const ButtonSection = ({ navigate, postFeed }) => {
  return (
    <ButtonGroup>
      <Button
        bgColor="#ECECEC"
        hoverColor="#D0D0D0"
        onClick={() => navigate("/community")}
      >
        {CANCEL_TEXT}
      </Button>
      <Button bgColor="#ffe866" hoverColor="#ffd900" onClick={() => postFeed()}>
        {POST_TEXT}
      </Button>
    </ButtonGroup>
  );
};

const ButtonGroup = styled.div`
  margin-top: 20px;

  display: flex;
  flex-direction: row;
  align-items: center;
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
