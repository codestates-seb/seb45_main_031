import GlobalStyles from "./styles/GlobalStyles";
import GlobalFonts from "./styles/GlobalFonts";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

import RootLayout from "./Layouts/RootLayout";
import ProfileLayout from "./Layouts/ProfileLayout";
import LoginLayout from "./Layouts/LoginLayout";

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
import DirectoryPage from "./pages/DirectoryPage";
import DirectoryDetailPage from "./pages/DirectoryDetailPage";
import Page from "./pages/Page";
import ScrapTodoEditPage from "./pages/ScrapTodoEditPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginLayout />,
    children: [
      { path: "/signup", element: <SignUpPage /> },
      { path: "/login", element: <LoginPage /> },
      { path: "/receive-token.html", element: <Page /> },
    ],
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <Home /> },

      { path: "/todo", element: <TodoPage /> },
      { path: "/todo/edit", element: <TodoEditPage /> },
      { path: "/todo/modify/:todoId", element: <TodoModifyPage /> },
      { path: "/todo/:today", element: <TodoPage /> },

      { path: "/community", element: <CommunityPage /> },
      { path: "/community/edit", element: <CommunityEditPage /> },
      { path: "/community/modify/:feedId", element: <CommunityModifyPage /> },

      { path: "/directory", element: <DirectoryPage /> },
      { path: "/directory/:categoryId", element: <DirectoryDetailPage /> },

      {
        path: "/scrap/todo/:feedId",
        element: <ScrapTodoEditPage />,
      },

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
      <GlobalFonts />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
