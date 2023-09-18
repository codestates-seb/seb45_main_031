import { styled } from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { URL } from "../data/constants";
import googleIcon from "../assets/images/google.png";
import axios from "axios";

const emailRegex =
  /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d).{10,}$/;

const SignUpPage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
  });

  const onChange = (event) => {
    const userType = event.target.name;
    setUser({
      ...user,
      [userType]: event.target.value,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (user.password !== user.passwordConfirm) {
      alert("비밀번호와 비밀번호 확인이 일치하지 않습니다.");
      return; // 회원가입 중단.
    }

    axios
      .post(`${URL}/members/signup`, user, {})
      .then((response) => {
        navigate("/login");
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          if (error.response.status === 409) {
            alert("ID 나 Nickname이 중복됩니다.");
          } else if (error.response.status === 400) {
            alert("모든 칸에 입력 해주세요.");
          } else {
            alert("로그인에 실패했습니다. 다시 시도해주세요.");
          }
        } else if (error.request) {
          // 요청이 전송되지 않은 경우 (네트워크 오류 등)
          alert("요청을 보낼 수 없습니다. 네트워크 연결을 확인하세요.");
        } else {
          alert("오류가 발생했습니다. 다시 시도해주세요.");
        }
        console.log(error);
      });
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
              name="email"
              onChange={onChange}
              placeholder="이메일 형식의 아이디를 입력해주세요."
            />
            <IdErrorMessage>
              {/* {!isEmail && email.length > 0 && <div>{emailMessege}</div>} */}
              <div
                style={{
                  display: !emailRegex.test(user.email) ? "block" : "none",
                }}
              >
                {"적절하지 않은 아이디 형식입니다."}
              </div>
            </IdErrorMessage>
          </EmailContainer>
          {/*Nickname*/}
          <NickNameText>Nickname</NickNameText>
          <NickNameContainer>
            <InputNickName
              type="text"
              name="nickname"
              onChange={onChange}
              placeholder="사용하실 닉네임을 입력해주세요."
            />
            <NickNameErrorMassage>
              {/* {!isNickName && nickName.length > 0 && ()} */}
              <div
                style={{
                  display:
                    user.nickname.length < 2 || user.nickname.length > 10
                      ? "block"
                      : "none",
                }}
              >
                {"2글자 이상 10글자 미만으로 입력해주세요."}
              </div>
            </NickNameErrorMassage>
          </NickNameContainer>
          {/*Password*/}
          <PasswordText>Password</PasswordText>
          <PasswordContainer>
            <InputPassword
              type="password"
              name="password"
              onChange={onChange}
              placeholder="비밀번호를 입력해주세요."
              autocomplete="current-password"
            />
            <PasswordErrorMassage>
              {/* {!isPassword && password.length > 0 && ( )} */}
              <div
                style={{
                  display: !passwordRegex.test(user.password)
                    ? "block"
                    : "none",
                }}
              >
                {
                  "8글자 이상, 1자 이상의 영문, 1개 이상의 숫자를 포함시켜주세요."
                }
              </div>
            </PasswordErrorMassage>
          </PasswordContainer>
          {/*Confirmation*/}
          <ConfirmationText>Confirmation</ConfirmationText>
          <ConfirmationContainer>
            <InputConfirmation
              type="password"
              name="passwordConfirm"
              onChange={onChange}
              placeholder="비밀번호를 한번 더 입력해주세요."
              autocomplete="current-password"
            />
            <ConfirmationErrorMassage>
              <div
                style={{
                  display: !(user.password === user.passwordConfirm)
                    ? "block"
                    : "none",
                }}
              >
                {"비밀번호가 일치하지 않습니다."}
              </div>
            </ConfirmationErrorMassage>
          </ConfirmationContainer>
        </InputForm>
        {/*Confirm*/}
        <ConfirmContainer>
          <ConfirmBtn
            onClick={(event) => onSubmit(event)}
            // disabled={handerSignUp}
          >
            확인
          </ConfirmBtn>
          <CancelBtn
            onClick={() => {
              navigate("/login");
            }}
          >
            취소
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
`;
