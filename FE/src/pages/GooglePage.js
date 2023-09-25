import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const GooglePage = () => {
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();

  // 파라미터로 들어오는 값 선언하기(엑서스 , 리프레쉬, 멤버아이디)
  const localUser = {
    accessToken: searchParams.get("access_token"),
    refresh: searchParams.get("refresh_token"),
    memberId: searchParams.get("memberId"),
  };

  useEffect(() => {
    setSearchParams(searchParams);
    // 선언된 값 로컬스토리지 담아주기
    localStorage.setItem("localUser", JSON.stringify(localUser));

    // TodoPage로 이동하기
    navigate("/todo");
    return;
  }, []);
};

export default GooglePage;
