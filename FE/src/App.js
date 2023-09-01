import GlobalStyles from "./styles/GlobalStyles";
import { Routes, Route } from "react-router-dom";
import { styled } from "styled-components";

import Header from "./components/Header";
import Footer from "./components/Footer";
import TodoPage from "./pages/TodoPage";
import TodoEditPage from "./pages/TodoEditPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <>
      <GlobalStyles />
      <Body>
        <Header />
        <Routes>
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/todo/edit" element={<TodoEditPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
        <Footer />
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
