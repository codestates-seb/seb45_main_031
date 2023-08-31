import { styled } from "styled-components";
import { Link } from "react-router-dom";
import bell from "../assets/images/bell.png";
import mainIcon from "../assets/images/mainIcon.png";

const Header = () => {
  return (
    <Container>
      <HeaderStyle>
        <HeaderCon>
          <h1>
            <LogoLink to="/">
              <img src={mainIcon} alt="mainIcon" />
            </LogoLink>
          </h1>
        </HeaderCon>
        <Infrom>
          <img src={bell} alt="bell" />
        </Infrom>
        <InfromSign>
          <div></div>
        </InfromSign>
      </HeaderStyle>
    </Container>
  );
};
export default Header;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HeaderStyle = styled.header`
  position: fixed;
  top: 0;
  background-color: #fff;
  border: 1px solid #d0d0d0;
  border-radius: 0 0 15px 15px;
  box-shadow: 0 4px 4px -4px #d0d0d0;
  width: 390px;

  display: flex;
  align-items: center;
`;

const HeaderCon = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  height: 95px;
  > h1 {
    margin: auto;
    padding-left: 70px;
    :img {
    }
  }
`;

const LogoLink = styled(Link)`
  display: flex;
  justify-content: flex-end;
  height: 80px;
  width: 80px;
  > img {
    border-radius: 50px;
    cursor: pointer;
  }
`;

const Infrom = styled.button`
  > img {
    width: 30px;
    margin-top: 25px;
    cursor: pointer;
  }
`;

const InfromSign = styled.div`
  background-color: #ff3838;
  border: 1px solid #ff3838;
  height: 12px;
  width: 12px;
  border-radius: 15px;
  margin-top: 35px;
  margin-right: 10px;
`;
