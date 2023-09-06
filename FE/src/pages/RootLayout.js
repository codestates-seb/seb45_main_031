// import React from "react";
import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";

const RootLayout = () => {
  return (
    <>
      <Body>
        <Header />
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

  background-color: #ffd900;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
`;

export default RootLayout;
