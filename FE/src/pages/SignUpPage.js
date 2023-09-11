import { styled } from "styled-components";
import { NavLink } from "react-router-dom";
import { useState } from "react";

import googleIcon from "../assets/images/google.png";

const SignUpPage = () => {
  //이메일, 닉네임, 비밀번호, 비밀번호확인
  const [email, setEmail] = useState("");
  const [nickName, setNickName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //오류메세지 상태저장
  const [emailMessege, setEmailMessage] = useState("");
  const [nickNameMessage, setNickNameMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");
  //유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isNickName, setIsNickName] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);

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
  //닉네임
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 8) {
      setNickNameMessage("2글자 이상 8글자 미만으로 입력해주세요.");
      setIsNickName(false);
    } else {
      setNickNameMessage("");
      setIsNickName(true);
    }
  };
  //비밀번호
  const onChangePassword = (e) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage(
        "8글자 이상, 1자 이상의 영문, 1개 이상의 숫자를 포함시켜주세요.",
      );
      setIsPassword(false);
    } else {
      setPasswordMessage("");
      setIsPassword(true);
    }
  };
  //비밀번호 confirm
  const onChangePasswordConfirm = (e) => {
    const passwordConfirmCurrent = e.target.value;
    setPasswordConfirm(passwordConfirmCurrent);

    if (password === passwordConfirmCurrent) {
      setPasswordConfirmMessage("");
      setIsPasswordConfirm(true);
    } else {
      setPasswordConfirmMessage("비밀번호가 일치하지 않습니다.");
      setIsPasswordConfirm(false);
    }
  };

  return (
    <Container>
      <SignUpContainer>
        <SignUpText>Sign Up</SignUpText>
        <GoogleButton>
          <GoogleIcon src={googleIcon} alt="구글 아이콘" />
          <GoogleText>Sign in with Google</GoogleText>
        </GoogleButton>
        {/*ID*/}
        <InputForm>
          <IdText>ID</IdText>
          <EmailContainer>
            <InputId
              type="email"
              name="id"
              onChange={onChangeEmail}
              placeholder="이메일 형식의 아이디를 입력해주세요."
            />
            <IdErrorMessage>
              {!isEmail && email.length > 0 && <div>{emailMessege}</div>}
            </IdErrorMessage>
          </EmailContainer>
          {/*Nickname*/}
          <NickNameText>Nickname</NickNameText>
          <NickNameContainer>
            <InputNickName
              type="text"
              name="nickname"
              onChange={onChangeNickName}
              placeholder="사용하실 닉네임을 입력해주세요."
            />
            <NickNameErrorMassage>
              {!isNickName && nickName.length > 0 && (
                <div>{nickNameMessage}</div>
              )}
            </NickNameErrorMassage>
          </NickNameContainer>
          {/*Password*/}
          <PasswordText>Password</PasswordText>
          <PasswordContainer>
            <InputPassword
              type="password"
              name="password"
              onChange={onChangePassword}
              placeholder="비밀번호를 입력해주세요."
              autocomplete="current-password"
            />
            <PasswordErrorMassage>
              {!isPassword && password.length > 0 && (
                <div>{passwordMessage}</div>
              )}
            </PasswordErrorMassage>
          </PasswordContainer>
          {/*Confirmation*/}
          <ConfirmationText>Confirmation</ConfirmationText>
          <ConfirmationContainer>
            <InputConfirmation
              type="password"
              name="Confirmation"
              onChange={onChangePasswordConfirm}
              placeholder="비밀번호를 한번 더 입력해주세요."
              autocomplete="current-password"
            />
            <ConfirmationErrorMassage>
              {!isPasswordConfirm && passwordConfirm.length > 0 && (
                <div>{passwordConfirmMessage}</div>
              )}
            </ConfirmationErrorMassage>
          </ConfirmationContainer>
        </InputForm>
        {/*Confirm*/}
        <ConfirmContainer>
          <ConfirmBtn
          // disabled={
          //   !(isEmail && isNickName && isPassword && isPasswordConfirm)
          // }
          >
            <NavLink to="/todo">확인</NavLink>
          </ConfirmBtn>
          <CancelBtn>
            <NavLink to="/login">취소</NavLink>
          </CancelBtn>
        </ConfirmContainer>
      </SignUpContainer>
    </Container>
  );
};

export default SignUpPage;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignUpContainer = styled.div`
  display: block;
  text-align: center;
  justify-content: center;
  background-color: #fff;

  width: 430px;
  height: 100vh;
  padding-top: 150px;
`;
const SignUpText = styled.div`
  display: flex;
  justify-content: center;
  font-size: 40px;
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

const NickNameText = styled.span`
  display: block;
  font-size: 1.1rem;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-left: 70px;
`;
const NickNameContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputNickName = styled.input`
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
const NickNameErrorMassage = styled.div`
  font-size: 0.7rem;
  color: firebrick;
  margin-right: 80px;
  padding: 5px 10px;
`;

const PasswordText = styled.span`
  display: block;
  font-size: 1.1rem;
  margin-top: 5px;
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
  padding: 5px 10px;
`;
const ConfirmationText = styled.span`
  display: block;
  font-size: 1.1rem;
  margin-top: 15px;
  margin-bottom: 5px;
  margin-left: 70px;
`;
const ConfirmationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
const InputConfirmation = styled.input`
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
const ConfirmationErrorMassage = styled.div`
  font-size: 0.7rem;
  color: firebrick;
  margin-right: 140px;
  padding: 5px 10px;
`;

const ConfirmContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 60px;
  /* margin-bottom: 200px; */
`;
const ConfirmBtn = styled.button`
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
const CancelBtn = styled.button`
  height: 50px;
  font-size: 0.85rem;
  border: 1px solid 949597;
  border-radius: 15px;
  background-color: #ffe866;
  width: 115px;
  height: 35px;

  &:hover {
    background-color: #676767;
  }
  &.action {
  }
`;
