import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import MyPageHeader from "../components/MyPageHeader";
import Footer from "../components/Footer";

const ProfileLayout = () => {
  return (
    <>
      <Body>
        <MyPageHeader />
        <Outlet />
        <Footer />
      </Body>
    </>
  );
};

// Layout CSS
// 화면 전체 노란색 컨테이너
const Body = styled.body`
  width: 100vw;
  height: 100vh;

  background-color: #fff7cc;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
`;

export default ProfileLayout;
