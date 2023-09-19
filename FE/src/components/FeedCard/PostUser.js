import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";

import getDateFormat from "../../utils/getDateFormat";
import { FEED_DELETE_TEXT, FEED_MODIFY_TEXT } from "../../data/constants";

//더미데이터
import imgUrl from "../../assets/images/memberImg.jpeg";

const PostUser = ({
  loginMemberId,
  feedId,
  memberId,
  nickname,
  createdAt,
  openDeleteModal,
}) => {
  const navigate = useNavigate();

  return (
    <>
      <UserSection>
        <UserImgDiv>
          <img src={imgUrl} alt={nickname} />
        </UserImgDiv>
        <PostElement>
          <UserName>{nickname}</UserName>
          <PostCreatedAt>{getDateFormat(createdAt)}</PostCreatedAt>
        </PostElement>
        {Number(memberId) === Number(loginMemberId) && (
          <PostButtons>
            <PostButton onClick={() => navigate(`/community/modify/${feedId}`)}>
              {FEED_MODIFY_TEXT}
            </PostButton>
            <PostButton onClick={() => openDeleteModal(feedId)}>
              {FEED_DELETE_TEXT}
            </PostButton>
          </PostButtons>
        )}
      </UserSection>
    </>
  );
};

export default PostUser;

const UserSection = styled.section`
  display: flex;
  flex-direction: row;
  align-items: start;
  justify-content: space-between;
`;

const UserImgDiv = styled.div`
  width: 50px;
  height: 50px;

  margin: 5px;
  border: 1px solid #000000;
  border-radius: 50%;

  overflow: hidden;
`;

const PostElement = styled.div`
  width: 250px;
  height: 50px;

  padding-top: 5px;
  padding-left: 5px;

  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const UserName = styled.div`
  font-size: 1.2rem;
  font-weight: bold;
`;

const PostCreatedAt = styled.div`
  font-size: 0.8rem;
`;

const PostButtons = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: center;
`;

const PostButton = styled.button`
  width: 50px;
  height: 25px;

  color: #949597;

  border-radius: 15px;

  &:hover {
    background-color: #ececec;
  }
`;
