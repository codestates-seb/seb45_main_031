import { useState } from "react";
import { styled } from "styled-components";
import { Link } from "react-router-dom";

import { postList } from "../data/dummy";
import FeedCard from "../components/FeedCard";

import { ReactComponent as ProfileSvg } from "../assets/images/profile.svg";

export default function MyPage() {
  return (
    <MaxContainer>
      <Container>
        <MyInfo>
          <Title>내 정보</Title>
          <ProfileContent>
            <ProfileSvg className="photo" />
            <div>
              <SubTitle>🐣 삐약이</SubTitle>
              <p>lalala@gmail.com</p>
              <Link to="/mypage/edit">
                <EditButton>프로필 편집</EditButton>
              </Link>
            </div>
          </ProfileContent>
        </MyInfo>
        <MyPost />
        <Logout />
      </Container>
    </MaxContainer>
  );
}

// common
const MaxContainer = styled.div`
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Container = styled.div`
  height: 100vh;
  width: 430px;
  background-color: #ececec;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: #232629;
  font-weight: bold;
  background-color: #fff;

  &.myPost {
    padding: 5px 20px 5px 20px;
  }
`;

const SubTitle = styled.div`
  font-size: 1.2rem;
  color: #232629;
`;

const GreyButton = styled.button`
  background-color: #fff;
  color: #949597;
  border: 1px solid #ececec;
  border-radius: 15px;
  font-size: 0.85rem;

  &:hover {
    background-color: #ececec;
    cursor: pointer;
    color: #232629;
  }
`;

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  flex-direction: column;
`;

const ModalContent = styled.div`
  position: absolute;
  width: 340px;
  border: 1px solid #fff7cc;
  border-radius: 15px;
  background-color: #ffffff;
  opacity: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: white;
  font-size: 0.9rem;

  > div {
    margin: auto;
    padding: 1rem;
  }
`;

const ModalButton = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 15px;
  font-size: 0.85rem;
  margin-right: 1.5rem;

  &.yes {
    background-color: #ececec;
    &:hover {
      background-color: #d0d0d0;
    }
  }

  &.no {
    background-color: #ffe866;
    &:hover {
      background-color: #ffd900;
    }
  }
`;

// Section 내 정보
const MyInfo = styled.div`
  background-color: #fff;
  margin-top: 95px;
  height: 180px;
  width: 430px;
  padding: 15px 20px 15px 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const EditButton = styled(GreyButton)`
  width: 190px;
  height: 35px;
  padding: 5px;
  margin-top: 0.8rem;
`;

const ProfileContent = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: repeat(1, 1fr);
  margin: 0.5rem;
  height: 100px;

  .photo {
    width: 100px;
    margin: auto;
  }

  p {
    color: #949597;
    line-height: 2rem;
    font-size: 0.8rem;
  }
`;

// Section 내 게시물 보기
const MyPost = () => {
  // 특정 사용자의 게시물 필터링
  const getUserPosts = (userId) => {
    return postList.posts.filter((posts) => posts.memberId === userId);
  };
  // 게시물 렌더링
  const UserPosts = ({ userId }) => {
    const userPosts = getUserPosts(userId);
    return (
      <MyPostList>
        {userPosts.map((post) => (
          <li key={post.id}>
            <FeedCard post={post} />
          </li>
        ))}
      </MyPostList>
    );
  };
  // 사용자의 게시물 조회
  const ShowMyPost = () => {
    return (
      <div>
        <UserPosts userId={6} />
      </div>
    );
  };

  return (
    <>
      <Title className="myPost">내 게시물 보기</Title>
      <MyPostContainer>
        <ShowMyPost />
      </MyPostContainer>
    </>
  );
};

const MyPostContainer = styled.div`
  background-color: #fff;
  max-height: 380px;
  overflow-y: scroll;
  padding: 20px;
`;

const MyPostList = styled.ul`
  border-radius: 15px;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
`;

//Section 로그아웃
const Logout = () => {
  const [isModalOpen, setIsMOdalOpen] = useState(false);
  const handleLogout = () => {
    //로그아웃 로직 추가하기
    setIsMOdalOpen(false);
  };
  const handleModalOpen = () => {
    setIsMOdalOpen(true);
  };
  const handleModalClose = () => {
    setIsMOdalOpen(false);
  };

  return (
    <LogoutSection>
      <LogoutButton onClick={handleModalOpen}>로그아웃</LogoutButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <div>로그아웃 하시겠습니까?</div>
            <div className="yesNo">
              <ModalButton className="yes" onClick={handleLogout}>
                예
              </ModalButton>
              <ModalButton className="no" onClick={handleModalClose}>
                아니오
              </ModalButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </LogoutSection>
  );
};

const LogoutSection = styled.div`
  height: 100%;
  width: 430px;
  padding: 5px 20px 5px 20px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  background-color: #ffffff;
`;

const LogoutButton = styled(GreyButton)`
  width: 100%;
  height: 35px;
  padding: 10px;
  margin-top: 1rem;
`;
