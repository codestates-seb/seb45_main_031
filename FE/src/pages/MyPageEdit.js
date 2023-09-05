import { styled } from "styled-components";
import { ReactComponent as ProfileSvg } from "../assets/images/profile.svg";
import { ReactComponent as InfoIcon } from "../assets/icons/info.svg";

import level0 from "../assets/images/level0.png";
import level1 from "../assets/images/level1.png";
import level2 from "../assets/images/level2.png";
import level3 from "../assets/images/level3.png";

export default function MyPageEdit() {
  return (
    <MaxContainer>
      <Container>
        <Section>
          <Label>프로필 사진</Label>
          <Profile>
            <ProfileSvg className="photo" alt="avatar" />
            <EditButton>편집</EditButton>
          </Profile>
        </Section>
        <Section>
          <Label>닉네임</Label>
          <InputBox />
        </Section>
        <Section>
          <span>
            <Label>등급 조회</Label>
            <InfoIcon />
          </span>
          <Badges>
            <div className="badge">
              <img src={level0} alt="레벨0" />
            </div>
            <div className="badge">
              <img src={level1} alt="레벨1" />
            </div>
            <div className="badge">
              <img src={level2} alt="레벨2" />
            </div>
            <div className="badge">
              <img src={level3} alt="레벨3" />
            </div>
          </Badges>
        </Section>
        <Section>
          <span>
            <CancelButton>회원 탈퇴</CancelButton>
          </span>
        </Section>
      </Container>
    </MaxContainer>
  );
}

// common
const MaxContainer = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const Container = styled.div`
  margin: auto;
  padding-top: 95px;
  height: 100vh;
  width: 430px;
  background-color: #fefefe;
  display: flex;
  flex-direction: column;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: left;
  padding: 10px;

  .cancelMembership {
    color: #949597;
  }

  span {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
`;

const Label = styled.label`
  font-size: 0.9rem;
  padding: 10px;
  margin-bottom: 0.3rem;
`;

const CancelButton = styled.button`
  font-size: 0.9rem;
  padding: 10px;
  margin-bottom: 0.3rem;
  cursor: pointer;
  color: #949597;

  &:hover {
    color: #000000;
    text-decoration: underline;
  }
`;

const InputBox = styled.input`
  height: 35px;
  padding: 10px;
  margin: 5px;
  font-size: 0.9rem;
  border: 1px solid #d0d0d0;
  border-radius: 15px;

  &:focus {
    border: 1px solid #949597;
  }
`;

//프로필 사진 편집 영역
const Profile = styled.div`
  position: relative;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;

  .photo {
    width: 90px;
  }
`;

const EditButton = styled.button`
  width: 60px;
  height: 35px;
  padding: 5px;
  position: absolute;
  background-color: #ffe866;
  font-size: 0.85rem;
  border-radius: 15px;
  left: 55%;
  top: 60%;

  &:hover {
    background-color: #ffd900;
    cursor: pointer;
    color: #232629;
  }
`;

// 회원 등급 영역
const Badges = styled.div`
  height: 370px;
  padding: 10px;
  margin: 5px;
  font-size: 0.9rem;
  border: 1px solid #d0d0d0;
  border-radius: 15px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  justify-content: center;
  align-items: center;

  .badge {
    width: 100px;
    height: 100px;
    margin: auto;
  }
`;
