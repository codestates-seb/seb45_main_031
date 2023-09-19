import { styled } from "styled-components";
import { Link } from "react-router-dom";

import { ReactComponent as BackSVG } from "../assets/icons/back.svg";

const MyPageHeader = () => {
  return (
    <MaxContainer>
      <HeaderContainer>
        <ButtonContainer>
          <Link to="/mypage">
            <BackSVG />
          </Link>
        </ButtonContainer>
        <Title>프로필 변경</Title>
      </HeaderContainer>
    </MaxContainer>
  );
};
export default MyPageHeader;

const MaxContainer = styled.div`
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;
`;

const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  height: 70px;
  width: 100%;
  max-width: 430px;

  background-color: #fff;
  border-bottom: 1px solid #d0d0d0;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 4px -4px #ececec;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ButtonContainer = styled.button`
  width: 100%;

  padding: 0.5rem;
  margin-left: 1rem;

  display: flex;
  align-items: start;
  justify-content: start;
`;

const Title = styled.h1`
  position: fixed;
  top: 20px;

  align-items: center;
  justify-content: center;

  font-weight: bold;
  font-size: 2rem;
  font-family: "iceJaram-Rg";
`;
