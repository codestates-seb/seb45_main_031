import { styled } from "styled-components";

const ModalBackground = () => {
  return <Body />;
};

export default ModalBackground;

const Body = styled.div`
  width: 100vw;
  height: 100vh;

  position: absolute;
  top: 0;
  left: 0;

  background: rgb(0, 0, 0, 0.5);

  z-index: 10;
`;
