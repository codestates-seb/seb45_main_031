import { styled } from "styled-components";
import { Outlet } from "react-router-dom";

import LoginHeader from "../components/LoginHeader";

const LoginLayout = () => {
  return (
    <>
      <Body>
        <LoginHeader />
        <Outlet />
      </Body>
    </>
  );
};

export default LoginLayout;

const Body = styled.body`
  width: 100vw;
  height: 100vh;

  background-color: #fff7cc;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
`;
