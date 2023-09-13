import GlobalStyles from "./styles/GlobalStyles";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./pages/RootLayout";
import ProfileLayout from "./pages/ProfileLayout";

import Home from "./pages/HomeTest";
import TodoPage from "./pages/TodoPage";
import TodoEditPage from "./pages/TodoEditPage";
import TodoModifyPage from "./pages/TodoModifyPage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import CommunityPage from "./pages/CommunityPage";
import MyPage from "./pages/MyPage";
import MyPageEdit from "./pages/MyPageEdit";
import CommunityEditPage from "./pages/CommunityEditPage";
import CommunityModifyPage from "./pages/CommunityModifyPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    // errorElement: 에러페이지 만들면 추가
    children: [
      { index: true, element: <Home /> },
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },

      { path: "/todo", element: <TodoPage /> },
      { path: "/todo/edit", element: <TodoEditPage /> },
      { path: "/todo/modify/:todoId", element: <TodoModifyPage /> },
      { path: "/todo/:today", element: <TodoPage /> },

      { path: "/community", element: <CommunityPage /> },
      { path: "/community/edit", element: <CommunityEditPage /> },
      { path: "/community/modify/:feedId", element: <CommunityModifyPage /> },

      { path: "/mypage", element: <MyPage /> },
    ],
  },
  {
    path: "/mypage/edit",
    element: <ProfileLayout />,
    children: [{ index: true, element: <MyPageEdit /> }],
  },
]);

function App() {
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
