import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// import FeedCard from "../components/FeedCard";
// import DeleteConfirmModal from "../components/DeleteConfirmModal";

import { URL } from "../data/constants";

// import { checkLoginStatus } from "../utils/checkLoginStatus";//utility 함수 추가하기

import { ReactComponent as ProfileSvg } from "../assets/images/profile.svg";

export default function MyPage() {
  const navigate = useNavigate();

  //마이페이지 진입 시 로그인 상태 확인 (utilitiy 함수 완성되면 추가)
  // useEffect(() => {
  //   checkLoginStatus();
  // }, [navigate]);

  const handleLogout = () => {
    //로그아웃 시 로그인 상태 삭제
    localStorage.clear();
    navigate("/login");
  };

  return (
    <MaxContainer>
      <Container>
        <ProfileSection>
          <Title>내 정보</Title>
          <ProfileInfo />
        </ProfileSection>
        {/* <MyPostSection /> */}
        <LogoutSection onLogout={handleLogout} />
      </Container>
    </MaxContainer>
  );
}

// Section 내 정보
const ProfileInfo = () => {
  const navigate = useNavigate();
  // 사용자 정보 관리
  const [localUser, setLocalUser] = useState(null);
  const { accessToken, memberId } = JSON.parse(
    localStorage.getItem("localUser"),
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${URL}/members/myPage/${memberId}`, {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userData = response.data.data;

        //사용자 정보를 상태로 설정
        setLocalUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <ProfileWrapper>
        <ProfilePhoto>
          <ProfileSvg />
        </ProfilePhoto>
        {localUser ? (
          <ProfileText>
            <SubTitle>🐣 {localUser.nickname}</SubTitle>
            <p>{localUser.email}</p>
            <EditButton onClick={() => navigate("/mypage/edit")}>
              프로필 편집
            </EditButton>
          </ProfileText>
        ) : (
          <p>Loading...</p>
        )}
      </ProfileWrapper>
    </>
  );
};

// Section 내 게시물 보기
// const MyPostSection = () => {
//   const localUser = JSON.parse(localStorage.getItem("localUser"));
//   const memberId = localUser.memberId;
//   const accessToken = localUser.accessToken;

//   return (
//     <>
//       <Title className="myPost">내 게시물 보기</Title>
//       <MyPostContainer>
//         <ShowMyPost />
//       </MyPostContainer>
//     </>
//   );
// };

// const UserPosts = ({ userId }) => {
//   // 특정 사용자의 게시물 필터링
//   const getUserPosts = (userId) => {
//     return postList.posts.filter((posts) => posts.memberId === userId);
//   };
//   const userPosts = getUserPosts(userId);

//   return (
//     <MyPostList>
//       {userPosts.map((post) => (
//         <li key={post.id}>
//           <FeedCard post={post} />
//         </li>
//       ))}
//     </MyPostList>
//   );
// };
// // 사용자의 게시물 조회
// const ShowMyPost = () => {
//   return (
//     <div>
//       <UserPosts userId={6} />
//     </div>
//   );
// };

//Section 로그아웃
const LogoutSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { logout } = useLogout(); //useLogout 훅에서 logout 함수 가져오기

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <LogoutContainer>
      <LogoutButton onClick={handleModalOpen}>로그아웃</LogoutButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <p>로그아웃 하시겠습니까?</p>
            <ButtonWrapper>
              <ModalButton yes onClick={logout}>
                예
              </ModalButton>
              <ModalButton no onClick={handleModalClose}>
                아니오
              </ModalButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </LogoutContainer>
  );
};

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };
  return { logout };
};

// 공통 스타일
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

const BaseTitle = styled.div`
  font-size: 1.2rem;
  color: #232629;
  font-weight: bold;
  background-color: #fff;
`;

const Title = styled(BaseTitle)`
  width: 100%;
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

  > p {
    margin: 1rem;
    padding: 1.2rem;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
`;

const ModalButton = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 15px;
  font-size: 0.85rem;
  background-color: ${(props) => (props.yes ? "#ececec" : "#ffe866")};
  &:hover {
    background-color: ${(props) => (props.yes ? "#d0d0d0" : "#ffd900")};
  }
`;

// 내 정보 스타일
const ProfileSection = styled.section`
  background-color: #fff;
  margin-top: 68px;
  height: 180px;
  width: 430px;
  padding: 15px 20px 15px 20px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
`;

const ProfileWrapper = styled.div`
  display: grid;
  grid-template-columns: 4fr 6fr;
  grid-template-rows: repeat(1, 1fr);
  margin: 0.5rem;
  height: 100px;
`;

const ProfilePhoto = styled.div`
  width: 100px;
  margin: auto;
`;

const ProfileText = styled.text`
  color: #949597;
  line-height: 2rem;
  font-size: 0.8rem;
`;

const EditButton = styled(GreyButton)`
  width: 190px;
  height: 35px;
  padding: 5px;
  margin-top: 0.8rem;
`;

//로그아웃 스타일
const LogoutContainer = styled.div`
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

// 내 게시물 보기 스타일
// const MyPostContainer = styled.div`
//   background-color: #fff;
//   max-height: 380px;
//   overflow-y: scroll;
//   padding: 20px;
// `;

// const MyPostTitle = styled.div`
//   ${BaseTitle}
//   padding: 5px 20px 5px 20px;
// `;

// const MyPostList = styled.ul`
//   border-radius: 15px;
//   box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
// `;
