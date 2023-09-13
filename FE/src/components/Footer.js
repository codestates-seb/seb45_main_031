import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import write from "../assets/images/write.png";
import list from "../assets/images/list.png";
import community from "../assets/images/community.png";
import mypage from "../assets/images/mypage.png";
import getDateFormat from "../utils/getDateFormat";

const Footer = () => {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [clickColor, setClickColor] = useState("");
  const LogoClick = (event) => {
    setClickColor(event.target.alt);
    console.log(event.target.alt);
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
              <img src={write} alt="작성하기 버튼" />
              작성하기
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
              color={clickColor === "할일목록 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate(`/todo/${getDateFormat()}`);
              }}
            >
              <img src={list} alt="할일목록 버튼" />
              할일목록
            </LogoItem>
            <LogoItem
              color={clickColor === "커뮤니티 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate("/community");
              }}
            >
              <img src={community} alt="커뮤니티 버튼" />
              커뮤니티
            </LogoItem>
            <LogoItem
              color={clickColor === "마이페이지 버튼"}
              onClick={(event) => {
                LogoClick(event);
                navigate("/mypage");
              }}
            >
              <img src={mypage} alt="마이페이지 버튼" />
              마이페이지
            </LogoItem>
          </Logo>
        </FooterSpacer>
      </FooterFixed>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const FooterFixed = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -2px 2px 0 #d0d0d0;
  width: 430px;
  height: 70px;
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
  display: block;
  /* color: #949597; */
  color: ${(props) => (props.color ? "#000000" : "#949597")};
  text-align: center;
  font-size: 0.7rem;
  margin: 1px;
  > img {
    height: 32px;
    object-fit: contain;
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
  margin-top: 630px;
  margin-right: 130px;
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
  background-color: #ffe866;
  &:visited {
    background-color: #d0d0d0;
  }
`;
