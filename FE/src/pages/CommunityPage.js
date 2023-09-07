import { useState, useEffect } from "react";
import { styled } from "styled-components";

import FeedCard from "../components/FeedCard";

//더미데이터
import { postList } from "../data/dummy";
const dummyPosts = postList.posts;
const localUser = {
  memberId: 1,
};
localStorage.setItem("memberId", localUser.memberId);

const CommunityPage = () => {
  const [posts, setPosts] = useState([]);

  //화면 첫 랜딩 시 posts를 불러오는 로직
  useEffect(() => {
    setPosts(dummyPosts);
  }, []);

  return (
    <>
      <CommunityBody>
        <CommunityContainer>
          <CardUl>
            {posts.map((post) => (
              <>
                <FeedCard post={post} />
              </>
            ))}
          </CardUl>
        </CommunityContainer>
      </CommunityBody>
    </>
  );
};

export default CommunityPage;

const CommunityBody = styled.body`
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommunityContainer = styled.div`
  width: 430px;
  height: 100%;

  background-color: #ececec;

  padding-top: 120px;
  padding-bottom: 95px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-contents: center;

  overflow: scroll;
`;

const CardUl = styled.ul``;
