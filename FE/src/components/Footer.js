import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import write from "../assets/images/write.png";
import writeB from "../assets/images/writeB.png";
import list from "../assets/images/list.png";
import listB from "../assets/images/listB.png";
import community from "../assets/images/community.png";
import communityB from "../assets/images/communityB.png";
import mypage from "../assets/images/mypage.png";
import mypageB from "../assets/images/mypageB.png";
import directoryIcon from "../assets/images/directoryIcon.png";
import directoryOnclickIcon from "../assets/images/directoryOnclickIcon.png";

import getDateFormat from "../utils/getDateFormat";

const Footer = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickColor, setClickColor] = useState("");

  const LogoClick = (event) => {
    setClickColor(event.target.alt);
  };

  return (
    <Container>
      <FooterFixed>
        <FooterSpacer>
          <Logo>
            {/* <PageNavigation> */}
            <LogoItem
              color={clickColor === "작성하기 버튼"}
              onClick={(event) => {
                LogoClick(event);
                setIsModalOpen(true);
              }}
            >
              <img
                src={clickColor === "작성하기 버튼" ? writeB : write}
                alt="작성하기 버튼"
              />
              <p>작성하기</p>
            </LogoItem>
            {isModalOpen && (
              <ModalWrapper onClick={() => setIsModalOpen(false)}>
                <ModalContent isOpen={isModalOpen}>
                  <PageButton onClick={() => navigate("/todo/edit")}>
                    할 일 작성하기
                  </PageButton>
                  <PageButton onClick={() => navigate("/community/edit")}>
                    게시글 작성하기
                  </PageButton>
                </ModalContent>
              </ModalWrapper>
            )}
            {/* </PageNavigation> */}
            <LogoItem
              color={clickColor === "디렉토리 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate(`/directory`);
              }}
            >
              <img
                src={
                  clickColor === "디렉토리 버튼"
                    ? directoryOnclickIcon
                    : directoryIcon
                }
                alt="디렉토리 버튼"
              />
              <p>디렉토리</p>
            </LogoItem>
            <LogoItem
              color={clickColor === "할일목록 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate(`/todo/${getDateFormat()}`);
              }}
            >
              <img
                src={clickColor === "할일목록 버튼" ? listB : list}
                alt="할일목록 버튼"
              />
              <p> 할일목록</p>
            </LogoItem>
            <LogoItem
              color={clickColor === "커뮤니티 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate("/community");
              }}
            >
              <img
                src={clickColor === "커뮤니티 버튼" ? communityB : community}
                alt="커뮤니티 버튼"
              />
              <p>커뮤니티</p>
            </LogoItem>
            <LogoItem
              color={clickColor === "마이페이지 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate("/mypage");
              }}
            >
              <img
                src={clickColor === "마이페이지 버튼" ? mypageB : mypage}
                alt="마이페이지 버튼"
              />
              <p>마이페이지</p>
            </LogoItem>
          </Logo>
        </FooterSpacer>
      </FooterFixed>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const FooterFixed = styled.div`
  position: fixed;
  bottom: 0;

  height: 70px;
  width: 100%;
  max-width: 430px;

  background-color: #fff;
  border-top: 1px solid #ececec;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 4px 4px -4px #ececec;
`;

const FooterSpacer = styled.div`
  margin: 15px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoItem = styled.button`
  width: 20%;
  display: block;
  color: ${(props) => (props.color ? "#000000" : "#949597")};
  text-align: center;
  font-size: 0.7rem;
  margin: 1px;
  > img {
    height: 27px;
    object-fit: contain;
  }
  > p {
    margin-top: 2px;
    font-family: "TheJamsil5Bold";
  }
`;

// Modal Style

const ModalWrapper = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  /*flex-direction: column; */
`;

const ModalContent = styled.div`
  position: absolute;
  width: 250px;
  height: 150px;
  border-radius: 15px;
  background-color: #ffffff;
  margin-right: 120px;
  bottom: 80px;
  opacity: 1;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: white;
`;

const PageButton = styled.button`
  width: 200px;
  height: 35px;
  padding: 7px;
  margin: 8px;
  border-radius: 15px;
  font-size: 1.1rem;
  text-align: center;
  font-family: "HakgyoansimWoojuR";
  background-color: #ffe866;
  &:visited {
    background-color: #d0d0d0;
  }
`;
