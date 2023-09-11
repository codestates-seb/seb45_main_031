import { styled } from "styled-components";
import { useState } from "react";
import { NavLink } from "react-router-dom";
// import axios from "axios";

import googleIcon from "../assets/images/google.png";

const LoginPage = () => {
  //이메일, 비밀번호
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //오류메세지 상태저장
  const [emailMessage, setEmailMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPassword, setIsPassword] = useState(false);

  //이메일
  const onChangeEmail = (e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("적절하지 않은 아이디 형식입니다.");
      setIsEmail(false);
    } else {
      setEmailMessage("");
      setIsEmail(true);
    }
  };
  //비밀번호
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("아이디 혹은 비밀번호를 확인해주세요.");
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };

  const loginHandler = async (e) => {
    e.preventDefault();
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
              // value={email}
              onChange={onChangeEmail}
              placeholder="이메일 형식의 아이디를 입력해주세요."
              required
            />
            <IdErrorMessage>
              {!isEmail && email.length > 0 && <div>{emailMessage}</div>}
            </IdErrorMessage>
          </EmailContainer>
          {/*비밀번호*/}
          <PasswordText>Password</PasswordText>
          <PasswordContainer>
            <InputPassword
              type="password"
              name="password"
              // value={password}
              onChange={onChangePassword}
              placeholder="비밀번호를 입력해주세요."
              required
            />
            <PasswordErrorMassage>
              {!isPassword && password.length > 0 && (
                <div>{passwordMessage}</div>
              )}
            </PasswordErrorMassage>
          </PasswordContainer>
        </InputForm>
        {/*confirm*/}
        <ConfirmContainer>
          <LoginButton onClick={(e) => loginHandler(e)}>로그인</LoginButton>
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
