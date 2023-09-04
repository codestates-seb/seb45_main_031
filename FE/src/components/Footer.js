import { styled } from "styled-components";
import write from "../assets/images/write.png";
import list from "../assets/images/list.png";
import community from "../assets/images/community.png";
import mypage from "../assets/images/mypage.png";

import { Link } from "react-router-dom";
import moment from "moment";

const Footer = () => {
  let today = moment(new Date()).format("YYYY-MM-DD");
  return (
    <Container>
      <FooterStyle>
        <Footercon>
          <Logo>
            <Link to="/todo/edit">
              <LogoItem>
                <img src={write} alt="작성하기 버튼" />
                작성하기
              </LogoItem>
            </Link>
            <Link to={`/todo/${today}`}>
              <LogoItem>
                <img src={list} alt="할일목록 버튼" />
                할일목록
              </LogoItem>
            </Link>
            <Link to="/community">
              <LogoItem>
                <img src={community} alt="커뮤니티 버튼" />
                커뮤니티
              </LogoItem>
            </Link>
            <Link to="/mypage">
              <LogoItem>
                <img src={mypage} alt="마이페이지 버튼" />
                마이페이지
              </LogoItem>
            </Link>
          </Logo>
        </Footercon>
      </FooterStyle>
    </Container>
  );
};

export default Footer;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FooterStyle = styled.div`
  position: fixed;
  bottom: 0;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 15px 15px 0 0;
  box-shadow: 0 -2px 2px 0 #d0d0d0;
  width: 430px;
  height: 80px;
`;

const Footercon = styled.div`
  margin: 15px;
`;

const Logo = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const LogoItem = styled.button`
  color: #949597;
  text-align: center;
  margin: 1px;
  > img {
    height: 32px;
    object-fit: contain;
  }
`;
