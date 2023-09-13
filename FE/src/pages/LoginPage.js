import { styled } from "styled-components";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

import { URL } from "../data/constants";
import googleIcon from "../assets/images/google.png";

const emailRegex =
  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

// const accessToken =
//   "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6WyJVU0VSIl0sIm1lbWJlcklkIjoxLCJ1c2VybmFtZSI6ImFiY2RAZ21haWwuY29tIiwic3ViIjoiYWJjZEBnbWFpbC5jb20iLCJpYXQiOjE2OTM0NDg3NjksImV4cCI6MTY5MzQ0OTA2OX0.gAqT-8waOAQ_PWyHIGPSmg6EcMDF0du1nklkIDYtpgA";

const LoginPage = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const onChange = (event) => {
    const userType = event.target.name;
    setUser({
      ...user,
      [userType]: event.target.value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${URL}/auth/login`, user);

      const { email, memberId, nickname, exp, level, image } = response.data;
      const accessToken = response.headers.authorization;
      const refresh = response.headers.refresh;

      const localUser = {
        email,
        memberId,
        nickname,
        exp,
        level,
        image,
        accessToken,
        refresh,
      };

      localStorage.setItem("localUser", JSON.stringify(localUser));

      navigate("/todo");
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container>
      <LoginStyled>
        <LoginText>Login</LoginText>
        <GoogleButton>
          <GoogleIcon src={googleIcon} alt="구글 이미지" />
          <GoogleText>Sign in with Google</GoogleText>
        </GoogleButton>
        {/* 아이디 */}
        <InputForm>
          <IdText>ID</IdText>
          <EmailContainer>
            <InputId
              type="email"
              name="email"
              onChange={onChange}
              placeholder="이메일 형식의 아이디를 입력해주세요."
              required
            />
            <IdErrorMessage>
              <div
                style={{
                  display: !emailRegex.test(user.email) ? "block" : "none",
                }}
              >
                {"적절하지 않은 아이디 형식입니다."}
              </div>
            </IdErrorMessage>
          </EmailContainer>
          {/*비밀번호*/}
          <PasswordText>Password</PasswordText>
          <PasswordContainer>
            <InputPassword
              type="password"
              name="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요."
              required
            />
            <PasswordErrorMassage>
              <div
                style={{
                  display: !passwordRegex.test(user.password)
                    ? "block"
                    : "none",
                }}
              >
                {"아이디 혹은 비밀번호를 확인 해주세요."}
              </div>
            </PasswordErrorMassage>
          </PasswordContainer>
        </InputForm>
        {/*confirm*/}
        <ConfirmContainer>
          <LoginButton onClick={(event) => onSubmit(event)}>로그인</LoginButton>
          <SignUpButton>
            <NavLink to="/signup">회원가입</NavLink>
          </SignUpButton>
        </ConfirmContainer>
      </LoginStyled>
    </Container>
  );
};

export default LoginPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginStyled = styled.div`
  display: block;
  text-align: center;
  justify-content: center;
  background-color: #fff;

  width: 430px;
  height: 100vh;
  padding-top: 200px;
`;
const LoginText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 50px;
`;
const GoogleButton = styled.button`
  display: flex;
  align-items: center;
  margin: auto;
  margin-top: 30px;
  margin-bottom: 30px;
`;
const GoogleIcon = styled.img`
  display: flex;
  padding-right: 10px;
  height: 40px;
  width: 50px;
  margin-right: 20px;
`;
const GoogleText = styled.span`
  font-size: 1.2rem;
  color: #949597;
`;

const InputForm = styled.form`
  text-align: left;
  margin-bottom: 30px;
`;

const IdText = styled.label`
  display: block;
  font-size: 1.1rem;
  margin-bottom: 5px;
  margin-left: 70px;
`;
const EmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputId = styled.input`
  height: 50px;
  width: 300px;
  padding-left: 15px;

  border: 1px solid #949597;
  border-radius: 15px;

  &::placeholder {
    text-align: center;
    padding-right: 15px;
  }
`;
const IdErrorMessage = styled.div`
  font-size: 0.7rem;
  color: firebrick;
  margin: 0;
  padding: 5px 10px;
  margin-right: 120px;
`;

const PasswordText = styled.span`
  display: block;
  font-size: 1.1rem;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 70px;
`;
const PasswordContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputPassword = styled.input`
  height: 50px;
  width: 300px;
  padding-left: 15px;

  border: 1px solid #949597;
  border-radius: 15px;

  &::placeholder {
    text-align: center;
    padding-right: 15px;
  }
`;
const PasswordErrorMassage = styled.div`
  font-size: 0.7rem;
  color: firebrick;
  margin-right: 100px;
  padding: 5px 10px;
`;

const ConfirmContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 90px;
`;
const LoginButton = styled.button`
  height: 50px;
  font-size: 0.85rem;
  border: 1px solid 949597;
  border-radius: 15px;
  background-color: #ffe866;
  width: 115px;
  height: 35px;
  margin-right: 30px;
  &:hover {
    background-color: #676767;
  }
`;
const SignUpButton = styled.button`
  height: 50px;
  font-size: 0.85rem;
  border: 1px solid 949597;
  border-radius: 15px;
  background-color: #ffe866;
  width: 115px;
  height: 35px;
  &:hover {
    background-color: #676767;
    &.active {
    }
  }
`;
