import { styled } from "styled-components";
import googleIcon from "../assets/images/google.png";

const SignUp = () => {
  return (
    <Container>
      <LoginStyled>
        <LoginText>Login</LoginText>
        <GoogleButton>
          <GoogleIcon src={googleIcon} alt="구글 아이콘" />
          <GoogleText>Sign in with Google</GoogleText>
        </GoogleButton>
        {/*        */}
        <InputForm>
          <IdText>ID</IdText>
          <EmailContainer>
            <InputId
              type="email"
              name="id"
              placeholder="이메일 형식의 아이디를 입력해주세요."
            />
            <IdErrorMessage>적절하지 않은 아이디 형식입니다.</IdErrorMessage>
          </EmailContainer>
          {/*          */}
          <PasswordText>Password</PasswordText>
          <PasswordContainer>
            <InputPassword
              type="password"
              name="password"
              placeholder="비밀번호를 입력해주세요."
              autocomplete="current-password"
            />
            <PasswordErrorMassage>
              아이디 혹은 비밀번호를 확인해주세요.
            </PasswordErrorMassage>
          </PasswordContainer>
        </InputForm>
        {/*        */}
        <ConfirmContainer>
          <LoginConfirm>로그인</LoginConfirm>
          <SignUpButton>회원가입</SignUpButton>
        </ConfirmContainer>
      </LoginStyled>
    </Container>
  );
};

export default SignUp;

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
const LoginConfirm = styled.button`
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
  }
`;
