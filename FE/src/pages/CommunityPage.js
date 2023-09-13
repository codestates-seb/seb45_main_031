import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import FeedCard from "../components/FeedCard";
import ModalBackground from "../components/ModalBackground";
import DeleteConfirmModal from "../components/DeleteConfirmModal";
import ErrorModal from "../components/ErrorModal";

import { URL } from "../data/constants";
import CommentModal from "../components/CommentModal";

const CommunityPage = () => {
  const [ref, inView] = useInView();
  const [page, setPage] = useState({
    page: 1,
    totalPages: 1,
  });
  const [feedList, setFeedList] = useState([]);
  const [feedId, setFeedId] = useState();
  const [commentId, setCommentId] = useState();
  const [commentContent, setCommentContent] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalBack, setIsModalBack] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const [isCommentModal, setIsCommentModal] = useState(false);
  const [isOpenErrorModal, setIsOpenErrorModal] = useState(false);

  const localUser = JSON.parse(localStorage.getItem("localUser"));
  const memberId = localUser.memberId;
  const accessToken = localUser.accessToken;

  useEffect(() => {
    getFeedList(1);
  }, []);

  useEffect(() => {
    if (inView) {
      getFeedList(page.page);
    }
  }, [inView]);

  const getFeedList = async (page) => {
    try {
      const { data } = await axios.get(`${URL}/feeds`, {
        params: { page: page.page, size: 5 },
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const newPage = {
        page: page + 1,
        totalPages: data.pageInfo.totalPages,
      };

      if (page !== 1) {
        const newFeedList = [...feedList, ...data.data];
        setFeedList(newFeedList);
      } else {
        setFeedList(data.data);
      }

      setPage(newPage);
    } catch (error) {
      console.error(error);
    }
  };

  const changeFeed = async (data) => {
    try {
      const responses = await axios.get(`${URL}/feeds/${data.feedId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const newFeedList = feedList.map((feed) =>
        feed.feedId === responses.data.data.feedId ? responses.data.data : feed,
      );

      setFeedList(newFeedList);
    } catch (error) {
      console.error(error);
    }
  };

  const openDeleteModal = (feedId) => {
    setFeedId(feedId);
    setIsModalBack(true);
    setIsDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setIsModalBack(false);
    setIsDeleteModal(false);
  };

  const deleteFeed = async () => {
    try {
      await axios.delete(`${URL}/feeds/${feedId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setFeedId();
      getFeedList(1);
      closeDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const isLike = async (feedId) => {
    try {
      await axios.post(
        `${URL}/feedLikes`,
        {
          memberId,
          feedId,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      getFeedList();
    } catch (error) {
      console.error(error);
    }
  };

  const changeComment = (event) => {
    setCommentContent(event.target.value);
  };

  const openErrorModal = (message) => {
    setErrorMessage(message);

    setIsOpenErrorModal(true);
    setIsModalBack(true);
  };

  const closeErrorModal = () => {
    setErrorMessage("");
    setIsOpenErrorModal(false);
    setIsModalBack(false);
  };

  const createComment = async (feedId, content) => {
    try {
      if (content.length === 0) {
        return openErrorModal("댓글 내용을 입력 해주세요.");
      }

      const newComment = {
        memberId,
        feedId,
        content,
      };

      await axios.post(`${URL}/comments`, newComment, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      changeFeed({ feedId });
    } catch (error) {
      console.error(error);
    }
  };

  const openCommentModal = (feedId, commentId, content) => {
    setFeedId(feedId);
    setCommentId(commentId);
    setCommentContent(content);
    setIsModalBack(true);
    setIsCommentModal(true);
  };

  const closeCommentModal = () => {
    setFeedId();
    setCommentId();
    setCommentContent("");
    setIsModalBack(false);
    setIsCommentModal(false);
  };

  const patchComment = async (commentId, content) => {
    try {
      const {
        data: { data },
      } = await axios.patch(
        `${URL}/comments/${commentId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      changeFeed(data);
      closeCommentModal();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteComment = async (feedId, commentId) => {
    try {
      await axios.delete(`${URL}/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      changeFeed({ feedId });
      closeCommentModal();
    } catch (error) {
      console.error(error);
    }
  };

  const getFeedTodoList = async (feedId) => {
    try {
      const {
        data: { data },
      } = await axios.get(`${URL}/feeds/${feedId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      scrapTodoList(data.todoResponses);
    } catch (error) {
      console.error(error);
    }
  };

  const scrapTodoList = async (todoList) => {
    try {
      const newTodoList = todoList.map((todo) => {
        return { date: todo.date, content: todo.content, tagId: todo.tagId };
      });

      await axios.post(
        `${URL}/todos/todoList`,
        { postList: newTodoList },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      //임시 알럿 모달
      openErrorModal("목록 리스트 가져오기에 성공하였습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <CommunityWrapper>
        {isModalBack && <ModalBackground />}
        {isOpenErrorModal && (
          <ErrorModal
            errorMessage={errorMessage}
            closeErrorModal={closeErrorModal}
          />
        )}
        {isDeleteModal && (
          <DeleteConfirmModal
            closeDeleteModal={closeDeleteModal}
            deleteFeed={deleteFeed}
          />
        )}
        {isCommentModal && (
          <CommentModal
            feedId={feedId}
            commentId={commentId}
            content={commentContent}
            closeCommentModal={closeCommentModal}
            changeComment={changeComment}
            patchComment={patchComment}
            deleteComment={deleteComment}
          />
        )}
        <CommunityContainer>
          <CardGroup>
            {feedList.map((feed) => (
              <>
                <FeedCard
                  feedId={feed.feedId}
                  memberId={feed.memberId}
                  nickname={feed.nickname}
                  createdAt={feed.createdAt}
                  todoList={feed.todoResponses}
                  content={feed.content}
                  likeCount={feed.likeCount}
                  feedLikeInfo={feed.feedLikeInfo}
                  comments={feed.parentResponses}
                  openDeleteModal={openDeleteModal}
                  isLike={isLike}
                  commentContent={commentContent}
                  changeComment={changeComment}
                  createComment={createComment}
                  openCommentModal={openCommentModal}
                  getFeedTodoList={getFeedTodoList}
                />
              </>
            ))}
          </CardGroup>
          {page.page <= page.totalPages && <InfinityScroll ref={ref} />}
        </CommunityContainer>
      </CommunityWrapper>
    </>
  );
};

export default CommunityPage;

const CommunityWrapper = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommunityContainer = styled.div`
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

const CardGroup = styled.ul``;

const InfinityScroll = styled.div`
  width: 100%;

  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-contents: center;
`;
