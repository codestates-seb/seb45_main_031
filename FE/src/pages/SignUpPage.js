import { styled } from "styled-components";
import googleIcon from "../assets/images/google.png";

const SignUpPage = () => {
  return (
    <SignUpContainer>
      <SignupStyled>
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
              placeholder="이메일 형식의 아이디를 입력해주세요."
            />
            <IdErrorMessage>이미 사용중인 아이디입니다.</IdErrorMessage>
          </EmailContainer>
          {/*Nickname*/}
          <NickNameText>Nickname</NickNameText>
          <NickNameContainer>
            <InputNickName
              type="text"
              name="nickname"
              placeholder="사용하실 닉네임을 입력해주세요."
            />
            <NickNameErrorMassage>
              이미 사용중인 닉네임입니다.
            </NickNameErrorMassage>
          </NickNameContainer>
          {/*Password*/}
          <PasswordText>Password</PasswordText>
          <PasswordContainer>
            <InputPassword
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              autocomplete="current-password"
            />
          </PasswordContainer>
          {/*Confirmation*/}
          <ConfirmationText>Confirmation</ConfirmationText>
          <ConfirmationContainer>
            <InputConfirmation
              type="password"
              name="Confirmation"
              placeholder="비밀번호를 한번 더 입력해주세요."
              autocomplete="current-password"
            />
            <ConfirmationErrorMassage>
              비밀번호가 일치하지 않습니다.
            </ConfirmationErrorMassage>
          </ConfirmationContainer>
        </InputForm>
        {/*Confirm*/}
        <ConfirmContainer>
          <Confirm>확인</Confirm>
          <CancelBtn>취소</CancelBtn>
        </ConfirmContainer>
      </SignupStyled>
    </SignUpContainer>
  );
};

export default SignUpPage;

const SignUpContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SignupStyled = styled.div`
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
  margin-right: 150px;
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
  margin-right: 150px;
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
const Confirm = styled.button`
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
