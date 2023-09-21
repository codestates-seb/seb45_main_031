import { useNavigate, useParams } from "react-router-dom";

const GooglePage = () => {
  const navigate = useNavigate();
  // 파라미터로 들어오는 값 선언하기(엑서스 , 리프레쉬, 멤버아이디)
  const { access_token, refresh_token, memberId } = useParams();
  // 선언된 값 로컬스토리지 담아주기
  const localUser = {
    accessToken: access_token,
    refresh: refresh_token,
    memberId,
  };
  localStorage.setItem("localUser", JSON.stringify(localUser));
  // TodoPage로 이동하기
  navigate("/todo");
  return;
};

export default GooglePage;
