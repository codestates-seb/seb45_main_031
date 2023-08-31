import GlobalStyles from "./styles/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";

import TodoPage from "./pages/TodoPage";
import TodoEditPage from "./pages/TodoEditPage";
import CommunityPage from "./pages/CommunityPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Body>
        <Routes>
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/todo/edit" element={<TodoEditPage />} />
          <Route path="/community" element={<CommunityPage />} />
        </Routes>
      </Body>
    </>
  );
}

export default App;

const Body = styled.body`
  width: 100vw;
  height: 100vh;

  background-color: #ffd900;

  display: flex;
  flex-direction: column;
  justify-content: center;

  position: fixed;
`;
