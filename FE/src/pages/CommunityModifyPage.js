import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
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
import CommunityEditCalendarModal from "../components/CommunityEditCalendarModal";
import EditTipContents from "../components/EditTipContents";
import CommunityEditPost from "../components/CommunityEditPost";

const CommunityModifyPage = () => {
  const { feedId } = useParams();
  const navigate = useNavigate();

  const { memberId, accessToken } = JSON.parse(
    localStorage.getItem("localUser"),
  );

  const [date, setDate] = useState(getDateFormat());
  const [isOpenCalender, setIsOpenCalender] = useState(false);
  const [isOpenTagModal, setIsOpenTagModal] = useState(false);
  const [tagId, setTagId] = useState([]);
  const [tagName, setTagName] = useState(DEFAULT_FILTER);
  const [tagList, setTagList] = useState(DEFAULT_FILTER_LIST);
  const [content, setContent] = useState("");
  const [meta, setMeta] = useState([]);
  const [todoList, setTodoList] = useState([]);

  useEffect(() => {
    getFeed();
  }, []);

  const isCalender = () => {
    setIsOpenCalender(!isOpenCalender);
  };

  const getFeed = async () => {
    try {
      const {
        data: { data },
      } = await axios.get(`${URL}/feeds/${feedId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (data.tagsResponses.length === 1) {
        setTagName(data.tagsResponses[0].tagName);
      }

      setDate(data.todoResponses[0].date);
      setContent(data.content);
      getTodoList(data.todoResponses[0].date);
      setTodoList(data.todoResponses);
    } catch (error) {
      console.error(error);
    }
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

      const newTagId = [];
      tagList.map((tagName) => {
        if (tagName !== DEFAULT_FILTER) {
          newTagId.push({ tagId: tags[tagName] });
        }
      });

      setTagId(newTagId);
      setMeta(todoResponses);
      setTodoList(todoResponses);
      setTagList(uniqueTagNames);
    } catch (error) {
      console.error(error);
    }
  };

  const isTagModal = () => {
    setIsOpenTagModal(!isOpenTagModal);
  };

  const changeTag = (tagName) => {
    if (tagName === DEFAULT_FILTER) {
      const newTagId = [];
      tagList.map((tagName) => {
        if (tagName !== DEFAULT_FILTER) {
          newTagId.push({ tagId: tags[tagName] });
        }
      });

      console.log(newTagId);

      setTagId(newTagId);
      setTagName(DEFAULT_FILTER);
      setTodoList(meta);
    } else {
      const newTodo = meta.filter(
        (todo) => todo.tagResponse.tagName === tagName,
      );

      setTagId([{ tagId: tags[tagName] }]);
      setTagName(tagName);
      setTodoList(newTodo);
    }

    isTagModal();
  };

  const patchFeed = async () => {
    try {
      const feedIdGroup = todoList.map((todo) => {
        return { todoId: todo.todoId };
      });

      const newFeed = {
        content,
        feedTagDtos: tagId,
        feedTodoDtos: feedIdGroup,
      };

      await axios.patch(`${URL}/feeds/${feedId}`, newFeed, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      navigate(`/community`);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommunityEditWrapper>
        {isOpenCalender && (
          <CommunityEditCalendarModal
            getTodoList={getTodoList}
            closeCalender={isCalender}
            date={date}
            todoList={todoList}
          />
        )}
        {isOpenTagModal && (
          <TagModal
            tags={tagList}
            tagModalClose={isTagModal}
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
            openCalender={isCalender}
            tagName={tagName}
            tagModalOpen={isTagModal}
            content={content}
            setContent={setContent}
            navigate={navigate}
            postFeed={patchFeed}
          />
        </EditContainer>
      </CommunityEditWrapper>
    </>
  );
};

export default CommunityModifyPage;

const CommunityEditWrapper = styled.div`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EditContainer = styled.div`
  width: 100%;
  max-width: 430px;

  background-color: #ececec;

  padding-top: 80px;
  padding-bottom: 180px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;

  overflow: scroll;
`;
