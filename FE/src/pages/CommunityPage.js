import { useState, useEffect } from "react";
import { styled } from "styled-components";
import { useInView } from "react-intersection-observer";
import axios from "axios";

import FeedCard from "../components/FeedCard";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

import { URL } from "../data/constants";
import CommentModal from "../components/CommentModal";
import ScrapButtonModal from "../components/ScrapButtonModal";
import authLoginCheck from "../utils/authLoginCheck";

const CommunityPage = () => {
  const isLogin = authLoginCheck();
  if (!isLogin) {
    return window.location.replace("/login");
  }

  const [ref, inView] = useInView();
  const [page, setPage] = useState({
    page: 1,
    totalPages: 1,
  });
  const [feedList, setFeedList] = useState([]);
  const [feedId, setFeedId] = useState();
  const [commentId, setCommentId] = useState();
  const [commentContent, setCommentContent] = useState("");
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [isOpenCommentModal, setIsOpenCommentModal] = useState(false);
  const [isOpenScrapModal, setIsOpenScrapModal] = useState(false);
  const [userStatus, setUserStatus] = useState(isLogin);

  const { memberId, accessToken } = userStatus;

  useEffect(() => {
    setUserStatus(isLogin);
    getFeedList(1);
  }, []);

  useEffect(() => {
    if (inView) {
      getFeedList(page.page);
    }
  }, [inView]);

  const isDeleteModal = (feedId) => {
    setFeedId(feedId);
    setIsOpenDeleteModal(!isOpenDeleteModal);
  };

  const isCommentModal = (feedId, commentId, content) => {
    if (content === undefined) {
      setFeedId("");
      setCommentId("");
      setCommentContent("");
    } else {
      setFeedId(feedId);
      setCommentId(commentId);
      setCommentContent(content);
    }

    setIsOpenCommentModal(!isOpenCommentModal);
  };

  const changeComment = (event) => {
    setCommentContent(event.target.value);
  };

  const getFeedList = async (page) => {
    try {
      const { data } = await axios.get(`${URL}/feeds`, {
        params: { page: page, size: 5 },
        headers: { Authorization: `${accessToken}` },
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

  const deleteFeed = async () => {
    try {
      await axios.delete(`${URL}/feeds/${feedId}`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      setFeedId();
      getFeedList(1);
      isDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const isLike = async (feedId) => {
    try {
      await axios.post(
        `${URL}/feedLikes`,
        {
          feedId,
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );

      changeFeed({ feedId });
    } catch (error) {
      console.error(error);
    }
  };

  const createComment = async (feedId, content) => {
    try {
      if (content.length === 0) {
        return alert("댓글 내용을 입력 해주세요.");
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
      isCommentModal();
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
      isCommentModal();
    } catch (error) {
      console.error(error);
    }
  };

  const isScrapModal = () => {
    setIsOpenScrapModal(!isOpenScrapModal);
  };

  const getFeedTodoList = async (feedId) => {
    setFeedId(feedId);
    isScrapModal(feedId);
  };

  return (
    <>
      <CommunityWrapper>
        {isOpenScrapModal && (
          <ScrapButtonModal isScrapModal={isScrapModal} feedId={feedId} />
        )}
        {isOpenDeleteModal && (
          <DeleteConfirmModal
            closeDeleteModal={isDeleteModal}
            deleteFeed={deleteFeed}
          />
        )}
        {isOpenCommentModal && (
          <CommentModal
            feedId={feedId}
            commentId={commentId}
            content={commentContent}
            closeCommentModal={isCommentModal}
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
                  loginMemberId={memberId}
                  feedId={feed.feedId}
                  memberId={feed.memberId}
                  nickname={feed.nickname}
                  createdAt={feed.createdAt}
                  todoList={feed.todoResponses}
                  content={feed.content}
                  likeCount={feed.likeCount}
                  feedLikeInfo={feed.feedLikeInfo}
                  comments={feed.parentResponses}
                  openDeleteModal={isDeleteModal}
                  isLike={isLike}
                  commentContent={commentContent}
                  changeComment={changeComment}
                  createComment={createComment}
                  openCommentModal={isCommentModal}
                  getFeedTodoList={getFeedTodoList}
                />
              </>
            ))}
          </CardGroup>
          <InfinityScroll ref={ref} />
        </CommunityContainer>
      </CommunityWrapper>
    </>
  );
};

export default CommunityPage;

const CommunityWrapper = styled.body`
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;

  font-family: "HakgyoansimWoojuR";
`;

const CommunityContainer = styled.div`
  width: 100%;
  max-width: 430px;

  background-color: #ececec;

  padding-top: 80px;
  padding-bottom: 180px;

  display: flex;
  flex-direction: column;

  overflow: scroll;
`;

const CardGroup = styled.ul`
  width: 100%;
  max-width: 430px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;
`;

const InfinityScroll = styled.div`
  width: 100%;

  margin-top: 50px;

  display: flex;
  align-items: center;
  justify-contents: center;
`;
