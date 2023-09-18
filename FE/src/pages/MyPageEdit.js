import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { URL } from "../data/constants";

// import { checkLoginStatus } from "../utils/checkLoginStatus";//utility 함수 추가하기

import { ReactComponent as ProfileSvg } from "../assets/images/profile.svg";
import { ReactComponent as InfoIcon } from "../assets/icons/info.svg";
import { ReactComponent as CloseIcon } from "../assets/icons/close.svg";
import level0 from "../assets/images/level0.png";
import level1 from "../assets/images/level1.png";
import level2 from "../assets/images/level2.png";
import level3 from "../assets/images/level3.png";

export default function MyPageEdit() {
  const navigate = useNavigate();

  //마이페이지 진입 시 로그인 상태 확인 (utilitiy 함수 완성되면 추가)
  // useEffect(() => {
  //   checkLoginStatus();
  // }, [navigate]);

  return (
    <MaxContainer>
      <Container>
        <MyProfile>
          <Title>프로필</Title>
          <Label>프로필 사진</Label>
          <ariticle>
            <Profile>
              <ProfileSvg className="photo" alt="avatar" />
              <EditProfile />
            </Profile>
          </ariticle>
          <EditNickname />
        </MyProfile>
        <MyLevel>
          <div>
            <Title>
              등급 조회
              <InfoIcon />
            </Title>
          </div>
          <Badges>
            <Badge>
              <img src={level0} alt="레벨0" />
            </Badge>
            <Badge>
              <img src={level1} alt="레벨1" />
            </Badge>
            <Badge>
              <img src={level2} alt="레벨2" />
            </Badge>
            <Badge>
              <img src={level3} alt="레벨3" />
            </Badge>
          </Badges>
          <CancelMembershipButton navigate={navigate} />
        </MyLevel>
      </Container>
    </MaxContainer>
  );
}

//프로필 사진 편집 모달창
const EditProfile = () => {
  const [isModalOpen, setIsMOdalOpen] = useState(false);

  const openModal = () => {
    setIsMOdalOpen(true);
  };
  const closeModal = () => {
    setIsMOdalOpen(false);
  };

  const handleUploadPhoto = () => {
    //사진 업로드 기능 추가 (advanced)
    //- 파일 선택 창을 열고 선택한 파일을 서버로 업로드
    //- 업로드 완료 후 모달 닫기
    alert("개발 중인 기능입니다");
    closeModal();
  };

  const handleDeletePhoto = () => {
    //사진 삭제 기능 추가 (advanced)
    //- 서버에서 현재 프로필 사진 삭제
    //- 삭제 완료 후 모달 닫기
    alert("개발 중인 기능입니다");
    closeModal();
  };

  return (
    <div>
      <EditButton onClick={openModal}>편집</EditButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <div>
              <CloseButton onClick={closeModal} alt="모달창 닫기">
                <CloseIcon />
              </CloseButton>
            </div>
            <div>프로필 사진 설정</div>
            <div className="editProfile">
              <ModalButton className="update" onClick={handleUploadPhoto}>
                사진 업로드
              </ModalButton>
              <ModalButton className="delete" onClick={handleDeletePhoto}>
                사진 삭제
              </ModalButton>
            </div>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

// 닉네임 변경
const EditNickname = () => {
  const [newNickname, setNewNickname] = useState("");
  const localUser = JSON.parse(localStorage.getItem("localUser"));
  console.log(localUser);

  const editProfile = () => {
    axios
      .patch(
        `${URL}/members/${localUser.memberId}`,
        {
          nickname: `${newNickname}`,
        },
        {
          headers: {
            Authorization: `Bearer ${localUser.accessToken}`,
          },
        },
      )
      .then(() => {
        setNewNickname(newNickname); //닉네임 변경 후 상태 업데이트
        localUser.nickname = newNickname;
        localStorage.setItem("localUser", JSON.stringify(localUser));
        alert("닉네임 변경이 완료됐습니다");
      })
      .catch((error) => {
        console.error(error);
        if (error.response.status === 409) {
          alert("중복된 닉네임입니다");
        }
      });
  };

  const handleNicknameChange = (event) => {
    setNewNickname(event.target.value);
  };

  const handleSaveClick = () => {
    if (newNickname.trim() !== "") {
      editProfile();
    } else {
      alert("닉네임은 필수값입니다");
    }
  };

  useEffect(() => {
    setNewNickname(localUser.nickname); //컴포넌트가 마운트될 때 현재 닉네임 설정
  }, [localUser.nickname]);

  return (
    <>
      <Label>닉네임</Label>
      <InputBoxWrapper>
        <InputBox
          type="text"
          placeholder={localUser.nickname}
          value={newNickname}
          onChange={(event) => handleNicknameChange(event)}
        />
        <SaveButton onClick={() => handleSaveClick()}>저장</SaveButton>
      </InputBoxWrapper>
    </>
  );
};

//회원 탈퇴 영역 - 회원 탈퇴 버튼
const CancelMembershipButton = ({ navigate }) => {
  const [isModalOpen, setIsMOdalOpen] = useState(false);
  const [password, setPassword] = useState("");

  const handleModalOpen = () => {
    setIsMOdalOpen(true);
  };
  const handleModalClose = () => {
    setIsMOdalOpen(false);
  };

  const handleConfirmCancel = () => {
    const { memberId, accessToken } = JSON.parse(
      localStorage.getItem("localUser"),
    );

    if (!password) {
      //비밀번호 입력하지 않은 경우
      alert("비밀번호를 입력하세요");
    } else {
      //비밀번호 입력이 완료된 경우
      axios
        .delete(`${URL}/members/${memberId}`, {
          data: { password },
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          console.log(response);
          //회원 탈퇴가 성공했을 경우
          alert("회원탈퇴가 완료되었습니다.");
          localStorage.clear();
          setIsMOdalOpen(false);
          navigate("/login");
        })
        .catch((error) => {
          if (error.response.status === 403) {
            alert("비밀번호가 올바르지 않습니다");
          } else if (error.response.status === 404) {
            console.log("존재하지 않는 사용자입니다.");
            navigate("/login");
          } else {
            console.log("회원탈퇴 중 오류가 발생했습니다.");
            navigate("/login");
          }
        });
    }
  };

  return (
    <div>
      <CancelButton onClick={handleModalOpen}>회원탈퇴</CancelButton>
      {isModalOpen && (
        <ModalOverlay>
          <ModalContent>
            <div>회원탈퇴 하시겠습니까?</div>
            <InputPassword>
              <input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </InputPassword>
            <ButtonWrapper>
              <YesNoButton yes onClick={handleConfirmCancel}>
                예
              </YesNoButton>
              <YesNoButton no onClick={handleModalClose}>
                아니오
              </YesNoButton>
            </ButtonWrapper>
          </ModalContent>
        </ModalOverlay>
      )}
    </div>
  );
};

//공통 스타일
// common
const MaxContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Container = styled.div`
  margin: auto;
  height: 100vh;
  width: 430px;
  background-color: #ececee;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

const Title = styled.div`
  width: 100%;
  font-size: 1.2rem;
  color: #232629;
  font-weight: bold;
  margin: 10px;
`;

const BaseSection = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: left;
  background-color: #fff;
  border-radius: 15px;
  padding: 10px;
  margin: 0 20px 15px 20px;
  box-shadow: 0 3px 10px rgb(0, 0, 0, 0.2);
`;

const MyProfile = styled(BaseSection)`
  margin-top: 90px;
`;

const MyLevel = styled(BaseSection)`
  display: flex;
  flex-direction: column;
  margin-bottom: 100px;
`;

const Label = styled.label`
  font-size: 0.9rem;
  padding: 10px 10px 5px 10px;
  margin-bottom: 0.1rem;
`;

const ModalOverlay = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgb(0, 0, 0, 0.5);
  z-index: 10;
  flex-direction: column;
`;

const ModalContent = styled.div`
  position: relative;
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

const CloseButton = styled.button`
  width: 34px;
  height: 34px;
  position: absolute;
  top: 20%;
  right: 10%;
  &:hover {
    fill: #ffd900;
  }
`;

const ModalButton = styled.button`
  width: 290px;
  height: 35px;
  border-radius: 15px;
  font-size: 0.85rem;
  margin-right: 1.5rem;
  background-color: #ffe866;
  margin: 0.5rem 0 0.5rem 0;
  &:hover {
    background-color: #ffd900;
  }
`;

const YesNoButton = styled.button`
  width: 100px;
  height: 35px;
  border-radius: 15px;
  font-size: 0.85rem;
  margin-right: 1.5rem;
  background-color: ${(props) => (props.yes ? "#ececec" : "#ffe866")};
  &:hover {
    background-color: ${(props) => (props.yes ? "#d0d0d0" : "#ffd900")};
  }
`;

//닉네임 변경
const Profile = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .photo {
    width: 100px;
  }
`;

const EditButton = styled.button`
  width: 60px;
  height: 35px;
  padding: 5px;
  position: absolute;
  background-color: #ffe866;
  font-size: 0.85rem;
  border-radius: 15px;
  left: 55%;
  top: 60%;

  &:hover {
    background-color: #ffd900;
    cursor: pointer;
    color: #232629;
  }
`;

const InputBoxWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const InputBox = styled.input`
  height: 35px;
  width: 100%;
  padding: 10px;
  margin: 5px;
  font-size: 0.9rem;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:focus {
    border: 1px solid #949597;
  }
`;

const SaveButton = styled.button`
  width: 60px;
  height: 35px;
  border-radius: 15px;
  font-size: 0.85rem;
  font-weight: bold;
  color: #949597;
  background-color: #fff;
  border: 1px solid #ececec;
  &:hover {
    background-color: #ececec;
    cursor: pointer;
    color: #232629;
  }
`;

// 회원 등급 영역
const Badges = styled.article`
  height: 370px;
  padding: 10px;
  margin: 5px;
  font-size: 0.9rem;
  border: 1px solid #d0d0d0;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
`;

const Badge = styled.div`
  width: 100px;
  height: 100px;
  margin: auto;
`;

//회원탈퇴 영역
const CancelButton = styled.button`
  font-size: 0.9rem;
  padding: 10px;
  margin-bottom: 0.3rem;
  cursor: pointer;
  color: #949597;

  &:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputPassword = styled.div`
  border-radius: 15px;
  cursor: pointer;
  border: 1px solid #ececec;
  height: 1rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
