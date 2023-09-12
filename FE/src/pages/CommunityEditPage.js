import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import getDateFormat from "../utils/getDateFormat";
import { tags } from "../data/tags";
import {
  URL,
  COMMUNITY_EDIT_TIPS,
  COMMUNITY_EDIT_TITLE,
  TIP_TITLE,
  DEFAULT_FILTER_LIST,
  DEFAULT_FILTER,
} from "../data/constants";
import TagModal from "../components/TagModal";
import ModalBackground from "../components/ModalBackground";
import CommunityEditCalendarModal from "../components/CommunityEditCalendarModal";
import EditTipContents from "../components/EditTipContents";
import CommunityEditPost from "../components/CommunityEditPost";

const CommunityEditPage = () => {
  const navigate = useNavigate();

  const localUser = JSON.parse(localStorage.getItem("localUser"));
  const memberId = localUser.memberId;
  const accessToken = localUser.accessToken;

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
    getTodoList(date);
  }, []);

  const openCalender = () => {
    setIsOpenModalBack(true);
    setIsOpenCalender(true);
  };

  const closeCalender = () => {
    setIsOpenModalBack(false);
    setIsOpenCalender(false);
  };

  const getTodoList = async (date) => {
    try {
      setDate(date);
      const {
        data: {
          data: { todoResponses },
        },
      } = await axios.get(`${URL}/todos/${memberId}?`, {
        params: { date },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const tagNames = todoResponses.map((todo) => {
        return todo.tagResponse.tagName;
      });

      const uniqueTagNames = tagNames.reduce(
        (result, tagName) =>
          result.includes(tagName) ? result : [...result, tagName],
        [DEFAULT_FILTER],
      );

      setMeta(todoResponses);
      setTodoList(todoResponses);
      setTagList(uniqueTagNames);
    } catch (error) {
      console.error(error);
    }
  };

  const tagModalOpen = () => {
    setIsOpenTagModal(true);
    setIsOpenModalBack(true);
  };

  const tagModalClose = () => {
    setIsOpenTagModal(false);
    setIsOpenModalBack(false);
  };

  const changeTag = (tagName) => {
    setTagId(tags[tagName]);
    setTagName(tagName);

    if (tagName === DEFAULT_FILTER) {
      setTodoList(meta);
    } else {
      const newTodo = meta.filter(
        (todo) => todo.tagResponse.tagName === tagName,
      );
      setTodoList(newTodo);
    }

    tagModalClose();
  };

  // 수정 필요
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
      <CommunityEditWrapper>
        {isOpenModalBack && <ModalBackground />}
        {isOpenCalender && (
          <CommunityEditCalendarModal
            getTodoList={getTodoList}
            closeCalender={closeCalender}
            date={date}
            todoList={todoList}
          />
        )}
        {isOpenTagModal && (
          <TagModal
            tags={tagList}
            tagModalClose={tagModalClose}
            changeTag={changeTag}
          />
        )}
        <EditContainer>
          <EditTipContents
            TITLE={COMMUNITY_EDIT_TITLE}
            TIP_TITLE={TIP_TITLE}
            TIPS={COMMUNITY_EDIT_TIPS}
          />
          <CommunityEditPost
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
      </CommunityEditWrapper>
    </>
  );
};

export default CommunityEditPage;

const CommunityEditWrapper = styled.div`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
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
